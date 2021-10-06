/* eslint-disable no-undef */
require('dotenv').config();
const {config} = require('./wdio.conf.js');
config.port = 4444;
config.services = [[
        'selenium-standalone', {
            logPath: 'logs'
        },
    ],];

config.logLevel = 'trace';
config.maxInstances = 10;
config.capabilities = [
    // {
        // maxInstances: 2,
        // browserName: 'firefox',
        // 'moz:firefoxOptions': {
        //     args: []
        // }
    // }, {s
    //     maxInstances: 2,
    //     browserName: 'MicrosoftEdge',
    //     'ms:edgeOptions': {
    //         args: ['--start-maximized']
    //     }
    // }, 
    {
        maxInstances: 2,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['window-size=1920,1080']
        }
    }
];

exports.config = config;
