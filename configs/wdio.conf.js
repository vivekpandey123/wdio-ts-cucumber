/* eslint-disable no-undef */
const RerunService = require('wdio-rerun-service');

//refer to https://webdriver.io/docs/configurationfile/

require('dotenv').config();
exports.config = {
    // debug: true,
    runner: 'local',
    // hostname: 'localhost',
    // port: 4444,
    // port: 9515,
    // path: '/wd/hub',
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    sync: false,
    specs: ['./src/test/e2e/**/*.feature'],
    maxInstances: 5,
    capabilities: [
        {
            maxInstances: 5,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['window-size=1920,1080','--disable-web-security']
            },

            //#region for Mobile Emulation
            // mobileEmulation: {'deviceName': 'iPhone X'},
            // args: [ '--no-sandbox',
            //         '--disable-gpu',
            //         '--disable-notifications',]
            //  },
            //#endregion
        },
    ],
    logLevel: 'info',
    outputDir: './test-report/output',
    bail: 0,
    baseUrl: process.env.URL_SET,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './test-report/allure-result/',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
                // scenarioLevelReporter:true,
            },
        ],
    ],
    cucumberOpts: {
        requireModule: [
            function () {
                require('ts-node').register({ transpileOnly: true });
            },
        ],
        require: ['./src/test/e2e/**/*.steps.ts', './src/test/e2e/support/hooks.ts'],
        backtrace: true, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: process.env.FAIL_FAST === 'true', // <boolean> invoke formatters without executing steps
        format: ['pretty'],
        colors: true,
        snippets: true, //<boolean> hide step definition snippets for pending steps
        source: true,
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tags: [],
        timeout: 60 * 1000, //timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        tagExpression: process.env.TAGS || '@regression', // <string> (expression) only execute the features or scenarios with tags matching the expression
    },
    services: [
        'chromedriver',
        // [RerunService, {
        //  rerunDataDir: './Re-run'
        // }]
    ],
};
