import path from 'path';
import {verificationMethods} from './assertions';
import {Timeouts} from '../constants/staticData';
const expectConditions = new verificationMethods();

export class utils {
    async refresh(): Promise < void > {
        await browser.refresh();
    }
    async waitForWhile(value = Timeouts._5Seconds): Promise < void > {
        await browser.pause(value);
    }

    async waitTillExist(webElement : WebdriverIO.Element, waitTime = Timeouts._10Seconds, timeoutMsg = 'element does not exist',): Promise < void > {
        try {
            await webElement.waitForExist({timeout: waitTime, timeoutMsg: timeoutMsg});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async goTo(url : string): Promise < void > {
        await browser.url(url);
    }
    async getCurrentDomain(url? : string): Promise < string > {
        let domain;
        if (!url) {
            url = await browser.getUrl();
        }
        domain = url.split('.com')[0] + '.com';
        domain = domain.split('//')[1];
        console.log('domain: ' + domain);
        return domain;
    }

    async isPresent(webElement : WebdriverIO.Element): Promise < boolean > {
        try {
            const Breturn = await webElement.isExisting();
            return Breturn;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async isDisplayed(webElement : WebdriverIO.Element): Promise < boolean > {
        try {
            return await webElement.isDisplayed();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async isEnabled(webElement : WebdriverIO.Element): Promise < boolean > {
        try {
            return await webElement.isEnabled();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isDisplayedInViewport(webElement : WebdriverIO.Element): Promise < boolean > {
        try {
            return await webElement.isDisplayedInViewport();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async isSelected(webElement : WebdriverIO.Element): Promise < boolean > {
        try {
            return await webElement.isSelected();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectByIndex(webElement : WebdriverIO.Element, index : number): Promise < void > {
        try {
            await webElement.selectByIndex(index);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectByVisibleText(webElement : WebdriverIO.Element, textValue : string): Promise < void > {
        try {
            await webElement.selectByVisibleText(textValue);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectByAttribute(webElement : WebdriverIO.Element, attribute : string, value : string): Promise < void > {
        try {
            await webElement.selectByAttribute(attribute, value);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async validateAlertMessage(expectedText : string): Promise < void > {
        const alertDailogText = await browser.getAlertText();
        await expectConditions.checkIfEqual(alertDailogText, expectedText);
    }

    // Close Browser
    async closeBrowser(): Promise < void > { // browser.close();
        await browser.closeWindow();
    }

    async waitForClickable(webElement : WebdriverIO.Element, timeOuts = Timeouts._30Seconds): Promise < void > {
        try {
            await webElement.waitForClickable({
                timeout: timeOuts,
                timeoutMsg: 'element is not clickable after' + timeOuts
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async clickButton(webElement : WebdriverIO.Element, isMobileView : boolean): Promise < boolean > {
        try {
            if ((await webElement.isDisplayedInViewport()) === false) {
                if (isMobileView === true) {
                    await this.touchScrollToView(webElement);
                } else {
                    await webElement.scrollIntoView();
                }
            }
            if (await webElement.isDisplayed()) {
                await webElement.click();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async click(webElement : WebdriverIO.Element): Promise < void > {
        try {
            if (await this.isPresent(webElement)) {
                if ((await webElement.isDisplayedInViewport()) === false) {
                    await webElement.scrollIntoView();
                }
                await webElement.click();
            } else {
                throw `Element $webElement does not exist`;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async clickandhighlight(webElement : WebdriverIO.Element): Promise < unknown > {
        try {
            await this.highlightElement(webElement);
            return await webElement.click();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async doubleClick(webElement : WebdriverIO.Element): Promise < void > {
        await(await webElement).doubleClick();
    }
    async clickusingJSE(webElement : WebdriverIO.Element): Promise < void > {
        try {
            await browser.execute('arguments[0].click()', webElement);
            console.log('Clicked on Element using javascript');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async checkIfNotDisplayed(webElement : WebdriverIO.Element): Promise < unknown > {
        try {
            return !(await webElement).isDisplayed();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async typeInto(webElement : WebdriverIO.Element, value : string, isClearInput? : boolean): Promise < void > {
        if (await webElement.isDisplayed()) {
            if (isClearInput) {
                await webElement.clearValue();
                await webElement.setValue(value);
            } else {
                await webElement.setValue(value);
            }
        } else {
            throw new Error('Input box is not enabled or displayed while while trying to enter');
        }
    }
    async typeIntoSlowly(webElement : WebdriverIO.Element, value : string): Promise < void > {
        try {
            for (const eachChar of value) {
                await webElement.addValue(eachChar);
                await browser.pause(20);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async clear(webElement : WebdriverIO.Element) {
        try {
            await webElement.clearValue();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async waitForInvisibilityOf(webElement : WebdriverIO.Element, timeOuts = Timeouts._10Seconds): Promise < void > {
        try {
            await webElement.waitForDisplayed({timeout: timeOuts, reverse: true, timeoutMsg: `element is visible even after ${timeOuts} seconds`});
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    }

    async waitForVisibilityOf(webElement : WebdriverIO.Element, timeOuts = Timeouts._10Seconds): Promise < void > {
        try {
            await webElement.waitForDisplayed({timeout: timeOuts, timeoutMsg: `element is not visible after ${timeOuts} seconds`});
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error;
        }
    }
    async scrollIntoView(webElement : WebdriverIO.Element): Promise < void > {
        try {
            await webElement.scrollIntoView();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async touchScrollToView(webElement : WebdriverIO.Element): Promise < void > {
        try {
            const cordinates: any = await webElement.getLocation();
            console.log('CORDINATES:', cordinates);
            const x = parseInt(cordinates.x);
            const y = parseInt(cordinates.y);
            await browser.touchScroll(x, y);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getTextFrom(webElement : WebdriverIO.Element): Promise < string > {
        try {
            const textValue = await webElement.getText();
            return textValue;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getTextFromAll(webElements : WebdriverIO.ElementArray): Promise < any > {
        try {
            const textArray: string[] = [];
            let eleTxt;
            for (let i = 0; i < webElements.length; i++) {
                eleTxt = await this.getTextFrom(webElements[i]);
                textArray.push(eleTxt);
            }
            return textArray;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async switchtoFrame(webElement : WebdriverIO.Element): Promise < unknown > {
        return await browser.switchToFrame(webElement);
    }

    async uploadImage(): Promise < void > {
        try {
            const imagePath = path.resolve('src/test/e2e/testData/Image2.jpg');
            const remoteFilePath = await browser.uploadFile(imagePath);
            const inputFileElement = await $('input[type ="file"]');
            // const fileElementParent = await $("//input[@type ='file']/..");
            console.log('sending File path to upload');
            if (browser.isMobile) {
                await browser.execute("arguments[0].setAttribute('style', 'position:relative;');", inputFileElement);
            }
            // await (await $('input[type ="file"]')).setValue(remoteFilePath);
            await inputFileElement.setValue(remoteFilePath);
            console.log('uploaded image successfully');
        } catch (error) {
            console.log(error);
            throw new Error('Cannot upload image remotely');
        }
    }
    async uploadImageInPhone(): Promise < void > {
        try {
            console.log('upload file in mobile device');
            const imagePath = path.resolve('src/test/e2e/testData/Image2.jpg');
            const inputFileElement = await $('input[type ="file"]');
            await browser.execute("arguments[0].setAttribute('style', 'position:relative;');", inputFileElement);
            const fs = require('fs');
            const base64 = fs.readFileSync(imagePath, 'base64');
            await browser.pushFile('/data/local/tmp/image.jpg', base64);
            await inputFileElement.setValue('/data/local/tmp/image.jpg');
        } catch (error) {
            console.log(error);
            throw new Error('Cannot upload image remotely');
        }
    }

    async setCookies(key : string, value : string, domain : string): Promise < void > {
        try {
            const date = new Date();
            date.setFullYear(date.getFullYear(), date.getMonth() + 1);
            const expirytime = date.getTime();
            browser.setCookies({
                name: key,
                value: value,
                path: '/',
                expiry: expirytime,
                domain: domain
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async touchScrollIntoView(webElement : WebdriverIO.Element): Promise < void > {
        try {
            console.log('Getting Location coordinates of Element');
            const cordinates: any = await webElement.getLocation();
            console.log('CORDINATES:', cordinates);
            const x = parseInt(cordinates.x);
            const y = parseInt(cordinates.y);
            browser.touchScroll(x, y);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCookieValue(strCookieName : string): Promise < any > {
        try {
            const strCookie: any = await browser.getCookies(strCookieName);
            console.log(strCookie[0].value);
            return strCookie[0].value;
        } catch (error) {
            return null;
        }
    }

    async highlightElement(webElement : WebdriverIO.Element): Promise < boolean > {
        console.log('highlight--');
        // consoles.log("locator---:" + webElement);
        // return await browser.execute("arguments[0].setAttribute('style', 'background: yellow; border: 2px solid red;');", webElement);
        return await browser.execute("arguments[0].setAttribute('style', 'border: 2px solid green;');", webElement);
    }

    async verifyExistingValueOfInput(iwebElement : WebdriverIO.Element, expectedValue : string, strFieldName : string): Promise < void > {
        const txtValue = await iwebElement.getAttribute('value');
        await expectConditions.checkIfEqual(txtValue, expectedValue, 'The expected value for ' + strFieldName + ' was :' + expectedValue + ' while the actual value is:' + txtValue,);
    }

    async getAttribute(webElement : WebdriverIO.Element, attributeName : string): Promise < string > {
        try {
            const value = await webElement.getAttribute(attributeName);
            return value;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAttributeFromAll(webElements : WebdriverIO.ElementArray, attributeName : string): Promise < any > {
        try {
            const attributeValues: string[] = [];
            let eleTxt;
            for (let i = 0; i < webElements.length; i++) {
                eleTxt = await this.getAttribute(webElements[i], attributeName);
                attributeValues.push(eleTxt);
            }
            return attributeValues;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCSSPropertyValue(webElement : WebdriverIO.Element, property : string): Promise < string > {
        const textValue = (await webElement.getCSSProperty(property)).value;
        return textValue;
    }
    async verifyAlertPresent(timeout : Timeouts): Promise < void > {
        try {
            await browser.waitUntil(async () => (await browser.isAlertOpen()) === true, {
                timeout: timeout,
                timeoutMsg: `Alert was not displayed even after ${timeout}`
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async verifyTextisPresent(checkName : WebdriverIO.Element): Promise < void > {
        console.log('Element Displayed: ' + (
            await checkName.isDisplayed()
        ));
        await expectConditions.checkIfTrue(await checkName.isDisplayed());
    }

    async switchWindow(pageUrl : string): Promise < void > {
        await browser.switchWindow(pageUrl);
    }

    async isDisplayedInTime(webElement : WebdriverIO.Element, waitTime = Timeouts._10Seconds): Promise < boolean > {
        try {
            await this.waitForVisibilityOf(webElement, waitTime);
            return true;
        } catch (error) {
            if (error.toString().includes('element is not visible after')) {
                console.log(`pop-up for loqate was not displayed after ${waitTime} seconds`);
                return false;
            } else {
                throw error;
            }
        }
    }
}
