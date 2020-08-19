const fs = require('fs')
const glob = require('glob')
const mri = require('mri')
const path = require('path')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const EventHooksPlugin = require('event-hooks-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')

// CLI commands for deploying built artefact.
// mri is also used by razzle and
const argv = process.argv.slice(2)
const cliArgs = mri(argv)

let config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test:/\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [],
}

let htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
})

let lodashReplacementPlugin = new LodashModuleReplacementPlugin({
  currying: true,
  flattening: true,
  paths: true,
  placeholders: true,
  shorthands: true
})

let bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  defaultSizes: 'gzip'
})

let copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: 'public', to: '.' },
  ]
})

module.exports = (env, argv) => {
  if (cliArgs.analyze) {
    if (argv.mode === 'development') {
      // Note: Analysis doesn't work well for in-memory development builds.
      // See: https://github.com/webpack-contrib/webpack-bundle-analyzer#i-dont-see-gzip-or-parsed-sizes-it-only-shows-stat-size
      console.log(
        'Bundle analysis only possible during production build. Skipped.'
      )
    } else {
      config.plugins.push(bundleAnalyzerPlugin)
    }
  }

  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin())
    htmlPlugin.options.filename = 'index_admin.html'

    // Prefix files with `admin_` to easier to tell apart in combined file server.
    // Skip hashes when doing bundlewatch CI runs, to allow bundle size comparison.
    // See: https://github.com/bundlewatch/bundlewatch/issues/30#issuecomment-511563935
    const chunkHashFragment = process.env.SKIP_CHUNK_HASHING
      ? ''
      : '.[chunkhash:8]'
    config.output.filename = `static/js/admin_bundle${chunkHashFragment}.js`
    config.output.chunkFilename = `static/js/admin_[name]${chunkHashFragment}.chunk.js`

    // Gzipping files prevents bundle analyzer from working, so skip when analyzing.
    if (!cliArgs.analyze) {
      // Compress JS files with Gzip.
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$/,
          // Leave unmodified without gz ext.
          // See: https://webpack.js.org/plugins/compression-webpack-plugin/#options
          filename: '[path][query]'
        })
      )
    }

    config.plugins.push(
      new EventHooksPlugin({
        afterEmit: () => {
          console.log('Writing *.headersJson files...')

          function writeHeadersJson(matchGlob, headersData = {}) {
            const files = glob.sync(config.output.path + '/' + matchGlob)
            files.forEach((f, i) => {
              const headersFilePath = f + '.headersJson'
              fs.writeFileSync(headersFilePath, JSON.stringify(headersData))
            })
          }

          function writeHeadersJsonHtml() {
            const headersData = {
              'x-amz-acl': 'public-read',
              'Content-Type': 'text/html; charset=UTF-8',
              'Cache-Control': 'no-cache'
            }
            writeHeadersJson('*.html', headersData)
          }

          function writeHeadersJsonJs() {
            const headersData = {
              'x-amz-acl': 'public-read',
              'Content-Encoding': 'gzip',
              'Content-Type': 'application/javascript',
              'Cache-Control':
                'no-transform,public,max-age=31536000,s-maxage=31536000'
            }
            writeHeadersJson('static/js/*.js?(.map)', headersData)
          }

          function writeHeadersJsonMisc() {
            writeHeadersJson('favicon.ico')
          }

          writeHeadersJsonHtml()
          writeHeadersJsonJs()
          writeHeadersJsonMisc()
        }
      })
    )


  }

  // Deployment via --deploy flag.
  if (cliArgs.deploy || cliArgs.deploy === 's3') {
    if (!cliArgs.analyze) {
      console.log('Deploy not possible during analysis. Skipped.')
    } else if (argv.mode === 'development') {
      console.log('Deploy only possible during build. Skipped.')
    } else {
      console.log('Configuring for S3 deploy...')

      // Format: {"key": "xxx", "secret": "xxx"}
      const creds = JSON.parse(
        fs.readFileSync('.polis_s3_creds_client.json')
      )

      let s3Plugin = new S3Plugin({
        // Despite warnings in README, deploy fails without `directory` set.
        directory: 'build',
        // Output is broken for some reason.
        // See: https://github.com/MikaAK/s3-plugin-webpack/issues/137
        progress: false,
        s3Options: {
          accessKeyId: creds.key,
          secretAccessKey: creds.secret
        },
        s3UploadOptions: {
          // Choose bucket based on `--prod` flag when running `razzle build`.
          Bucket: cliArgs.prod
            ? process.env.S3_BUCKET_PROD
            : process.env.S3_BUCKET_PREPROD
        }
      })

      // See: https://github.com/MikaAK/s3-plugin-webpack
      config.plugins.push(s3Plugin)
    }
  }

  config.plugins = [
    copyPlugin,
    ...config.plugins,
    htmlPlugin,
    lodashReplacementPlugin,
    new Dotenv(),
  ]

  return config
}
