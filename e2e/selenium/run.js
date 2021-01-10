var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
  'os': 'windows',
  'os_version': '7',
  'browserName': 'IE',
  'browser_version' : '11.0',
  'browserstack.local': 'true',
  // Allow using self-signed SSL cert.
  'acceptSslCerts': 'true',
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'project': process.env.BROWSERSTACK_PROJECT_NAME,
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}

var driver = new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build();

// HTTP Server should be running on 8099 port of GitHub runner
driver.get('https://localhost/home').then(function () {
  driver.getTitle().then(function (title) {
    console.log(title);
    if (title.includes('Polis')) {
      driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title contains Polis!"}}');
    } else {
      driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Title missing Polis!"}}');
    }
    driver.quit();
  });
});
