import { Given, Then, When,setDefaultTimeout } from '@cucumber/cucumber';
import { landingPagePO } from '../pages/Landing.page';
const DEFAULT_TIMEOUT = 90000;
setDefaultTimeout(DEFAULT_TIMEOUT);

Given("I open the website",{timeout: 900000}, async function () {
    await landingPagePO.openUrl();
});

When("I login to application using User {string} and password {string}", async function (username: string, password: string) {
    await landingPagePO.login(username, password);
});

Then("I verify that I am not allowed to login", async function () {
    await landingPagePO.checkLoginError();
});
