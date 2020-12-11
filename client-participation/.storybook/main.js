module.exports = {
  // See: https://github.com/storybookjs/storybook/issues/11255#issuecomment-737483095
  webpackFinal: (config) => {
      config.resolve.alias["core-js/modules"] =
        "@storybook/core/node_modules/core-js/modules";
      config.resolve.alias["core-js/features"] =
        "@storybook/core/node_modules/core-js/features";
      return config;
  },
  "stories": [
    "../vis2/**/*.stories.mdx",
    "../vis2/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
