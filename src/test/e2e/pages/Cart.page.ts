import { inputContent } from '../constants/poco.constant';
import { utils } from '../common/browserActions';
import { verificationMethods } from '../common/assertions';
import { Timeouts, headerText } from '../constants/staticData';

const browserActions = new utils();
const expectConditions = new verificationMethods();

class CartPage {
    get btn_CartIcon() {
        return $("//a[@class='shopping_cart_link']");
    }
    get txt_CartIconBadge() {
        return $("//span[@class='shopping_cart_badge']");
    }
    get txt_header() {
        return $("//span[@class='title']");
    }

    get txt_productQty() {
        return $("//div[@class='cart_item']/div[@class='cart_quantity']");
    }
    get txt_ProductName() {
        return $("//div[@class='cart_item']//div[@class='inventory_item_name']");
    }
    get txt_ProductDescription() {
        return $("//div[@class='cart_item']//div[@class='inventory_item_desc']");
    }
    get txt_ProductPrice() {
        return $("//div[@class='cart_item']//div[@class='inventory_item_price']");
    }

    get btn_remove() {
        return $("//button[contains(@id,'remove')]");
    }
    get btn_checkout() {
        return $("//button[@id='checkout']");
    }

    async NavigateToCart() {
        try {
            const expectedHeaderTxt = headerText.cartPage;
            await browserActions.waitForVisibilityOf(await this.txt_CartIconBadge, Timeouts._5Seconds);
            const cartItemsCount = await browserActions.getTextFrom(await this.txt_CartIconBadge);
            await expectConditions.checkIfEqual(cartItemsCount, '1', 'Item count in cart badge is not as same');
            await browserActions.click(await this.btn_CartIcon);
            await browserActions.waitForVisibilityOf(await this.txt_header);
            const headerTxt = await browserActions.getTextFrom(await this.txt_header);
            await expectConditions.checkIfEqual(headerTxt, expectedHeaderTxt, 'Header text does not match');
            console.log(expectedHeaderTxt + ' text is visible in Header');
            await expectConditions.checkIfTrue(await browserActions.isDisplayed(await this.btn_checkout));
            console.log('Checkout Button is displayed');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async verifyCartDetails() {
        try {
            const expected_productQty = '1';
            const productQty_UI = await browserActions.getTextFrom(await this.txt_productQty);
            console.log('Product Qty:' + productQty_UI);
            const productName_UI = await browserActions.getTextFrom(await this.txt_ProductName);
            console.log('Product Name:' + productName_UI);
            const productDescription_UI = await browserActions.getTextFrom(await this.txt_ProductDescription);
            console.log('Product Description:' + productDescription_UI);
            const productPrice_UI = await browserActions.getTextFrom(await this.txt_ProductPrice);
            console.log('Product Price:' + productPrice_UI);

            await expectConditions.checkIfEqual(productQty_UI, expected_productQty, 'Product qty does not match');
            await expectConditions.checkIfEqual(
                productName_UI,
                inputContent.productName,
                'Product Name does not match the name in product details',
            );
            await expectConditions.checkIfEqual(
                productDescription_UI,
                inputContent.productDescription,
                'Product Description does not match the name in product details',
            );
            await expectConditions.checkIfEqual(
                productPrice_UI,
                inputContent.productPrice,
                'Product Price does not match the name in product details',
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async click_Checkout() {
        console.log('Click on checkout button');
        await browserActions.click(await this.btn_checkout);
    }
}

export const CartpagePO = new CartPage();
