import { After, BeforeAll, Before, AfterStep, BeforeStep } from '@cucumber/cucumber';
import { inputContent } from '../constants/poco.constant';

BeforeAll(async function () {
    //before start of all tests
    inputContent.baseUrl = process.env.URL_SET;
    console.log('Base url:' + inputContent.baseUrl);
});

Before(async function () {
    //before each test
    if (browser.isMobile == false) {
        await browser.maximizeWindow();
    }
    await browser.deleteAllCookies();
    inputContent.ResetInputData();
});

AfterStep(async function (scenario: any) {
    // if (scenario.error) {
        await browser.takeScreenshot();
    // }
});

After(async function (scenario: any) {
    console.log(scenario.result.status);
    // await browser.takeScreenshot();
    // console.log('Clear Local Storage');
    // await browser.execute('window.localStorage.clear()');
    // console.log('reload new session');
    // await browser.reloadSession();
    // await browser.pause(2000);
});
