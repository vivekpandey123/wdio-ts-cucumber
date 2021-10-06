/* eslint-disable no-undef */
// const {config} = require('./wdioApp.conf_TS');
const {config} = require('./wdioApp.conf.js');
const AndroidInfo = require('./android.info');

// Appium capabilities
config.services=  ['appium', {
    // Appium service options here
    // ...
}];

config.capabilities = [
    {
        platformName: 'Android',
        browserName: 'chrome',
        "chromeOptions": {
            "w3c": false,
        },
        maxInstances: 1,
        automationName: 'UiAutomator2',
        deviceName: AndroidInfo.deviceName(),
        platformVersion: AndroidInfo.platFormVersion()
    }
];

config.port= 4723;
config.cucumberOpts.tagExpression = '@regression'; // pass tag to run tests specific to android

exports.config = config;
