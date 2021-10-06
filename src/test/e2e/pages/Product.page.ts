import { inputContent } from '../constants/poco.constant';
import { utils } from '../common/browserActions';
import { verificationMethods } from '../common/assertions';
import { headerText, Timeouts } from '../constants/staticData';

const browserActions = new utils();
const expectConditions = new verificationMethods();

class Productpage {
    private index: number | undefined;
    get txt_header() {
        return $("//span[@class='title']");
    }
    get drpDown_sorting() {
        return $("//select[@class='product_sort_container']");
    }
    get drpDown_activeSorting() {
        return $("//span[@class='active_option']");
    }
    get txt_productTitle() {
        return $("(//div[@class='inventory_list']//div[@class='inventory_item_name'])[" + this.index + ']');
    }
    get img_productImg() {
        return $("//div[@class='inventory_details_img_container']/img");
    }
    get txt_productName() {
        return $("//div[contains(@class,'inventory_details_name')]");
    }
    get txt_productDescription() {
        return $("//div[contains(@class,'inventory_details_name')]/following::div[contains(@class,'inventory_details_desc')]");
    }
    get txt_productPrice() {
        return $("//div[@class='inventory_details_price']");
    }
    get btn_addToCart() {
        return $("//button[contains(@id,'add-to-cart')]");
    }
    get btn_Remove() {
        return $("//button[contains(@id,'remove')]");
    }
    get txt_CartIconBadge() {
        return $("//span[@class='shopping_cart_badge']");
    }

    async verifyProductPage() {
        try {
            const expected_headerTxt = headerText.productPage;
            console.log('check if Products Header is visible');
            await browserActions.waitForVisibilityOf(await this.txt_header, Timeouts._5Seconds);
            const headerTxtOnUI = await browserActions.getTextFrom(await this.txt_header);
            console.log('Text on header banner:' + headerTxtOnUI);
            await expectConditions.checkIfEqual(headerTxtOnUI, expected_headerTxt, 'header text on Product page does not match');
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async sortFilter(filterValue: string) {
        try {
            await browserActions.selectByVisibleText(await this.drpDown_sorting, filterValue);
            const activedropDowntext = await browserActions.getTextFrom(await this.drpDown_activeSorting);
            console.log('current selection in sorting dropdown:' + activedropDowntext);
            await expectConditions.checkIfEqual(activedropDowntext, filterValue.toUpperCase(), 'active sorting Selection does not match');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectProduct(byindex: number) {
        try {
            this.index = byindex;
            await browserActions.click(await this.txt_productTitle);
            await browserActions.waitForVisibilityOf(await this.img_productImg, Timeouts._5Seconds);
            inputContent.productName = await browserActions.getTextFrom(await this.txt_productName);
            inputContent.productDescription = await browserActions.getTextFrom(await this.txt_productDescription);
            inputContent.productPrice = await browserActions.getTextFrom(await this.txt_productPrice);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addToCart() {
        try {
            await browserActions.click(await this.btn_addToCart);
            await browserActions.waitForVisibilityOf(await this.btn_Remove, Timeouts._2Seconds);
            await browserActions.waitForVisibilityOf(await this.txt_CartIconBadge, Timeouts._5Seconds);
            const cartItemsCount = await browserActions.getTextFrom(await this.txt_CartIconBadge);
            await expectConditions.checkIfEqual(cartItemsCount, '1', 'Item count in cart badge is not as same');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const ProductpagePO = new Productpage();
