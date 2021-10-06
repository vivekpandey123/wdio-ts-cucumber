import {inputContent} from '../constants/poco.constant';
import {utils} from '../common/browserActions';
import {verificationMethods} from '../common/assertions';
const browserActions = new utils();
const expectConditions = new verificationMethods();

class LandingPage {
    get input_username() {
        return $("//input[@id='user-name']");
    }
    get input_password() {
        return $("//input[@id='password']");
    }
    get btn_login() {
        return $("//input[@id='login-button']");
    }
    get txt_header() {
        return $("//span[@class='title']");
    }
    get loginError() {
        return $("//h3[@data-test='error']");
    }

    async openUrl() {
        try {
            const myUrl = inputContent.baseUrl;
            console.log('url:' + myUrl);
            // await browser.url("https://www.saucedemo.com/");
            await browser.url(myUrl);
            const domainName = await browserActions.getCurrentDomain(myUrl);
            await browserActions.setCookies('fake', 'true', domainName);
            await browserActions.refresh();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login(user : string, psw : string) {
        try {
            await browserActions.typeInto(await this.input_username, user);
            await browserActions.typeInto(await this.input_password, psw);
            await browserActions.click(await this.btn_login);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async checkLoginError() {
        try {
            await browserActions.waitForVisibilityOf(await this.loginError);
            await expectConditions.checkIfTrue(await browserActions.isDisplayed(await this.btn_login), 'Login button is not displayed');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const landingPagePO = new LandingPage();
