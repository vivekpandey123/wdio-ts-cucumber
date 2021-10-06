import { inputContent } from '../constants/poco.constant';
import { utils } from '../common/browserActions';
import { verificationMethods } from '../common/assertions';
import { headerText, checkOutTextValues } from '../constants/staticData';
import { RegexValues } from '../constants/staticData';

const browserActions = new utils();
const expectConditions = new verificationMethods();

class Checkout {
    get txt_header() {
        return $("//span[@class='title']");
    }

    get input_firstName() {
        return $("//input[@id='first-name']");
    }
    get input_LastName() {
        return $("//input[@id='last-name']");
    }
    get input_ZipCode() {
        return $("//input[@id='postal-code']");
    }

    get btn_continue() {
        return $("//input[@id='continue']");
    }
    get txt_DescHeader() {
        return $("//div[@class='cart_desc_label']");
    }
    get txt_productName() {
        return $("//div[@class='inventory_item_name']");
    }
    get txt_productDescription() {
        return $("//div[@class='inventory_item_desc']");
    }
    get txt_productPrice() {
        return $("//div[@class='inventory_item_price']");
    }
    get txt_PaymentValue() {
        return $("(//div[@class='summary_value_label'])[1]");
    }
    get txt_ShippingValue() {
        return $("(//div[@class='summary_value_label'])[2]");
    }
    get txt_itemSubTotal() {
        return $("//div[@class='summary_subtotal_label']");
    }
    get txt_itemTax() {
        return $("//div[@class='summary_tax_label']");
    }
    get txt_itemTotal() {
        return $("//div[@class='summary_total_label']");
    }

    get btn_Finish() {
        return $("//button[@id='finish']");
    }
    get txt_checkoutComplete() {
        return $("//h2[@class='complete-header']");
    }
    get txt_dispatchMsg() {
        return $("//div[@class='complete-text']");
    }
    get btn_backHome() {
        return $("//button[@id='back-to-products']");
    }

    async addShippingInfo(firstName: string, lastName: string, ZipCode: string) {
        try {
            const expected_HeaderTxt = headerText.CheckoutPage_info;
            await browserActions.waitForVisibilityOf(await this.input_firstName);
            const headerTxt = await browserActions.getTextFrom(await this.txt_header);
            expectConditions.checkIfEqual(headerTxt, expected_HeaderTxt, 'header text does not match in Checkout page');
            await browserActions.typeInto(await this.input_firstName, firstName);
            await browserActions.typeInto(await this.input_LastName, lastName);
            await browserActions.typeInto(await this.input_ZipCode, ZipCode);
            console.log('Added information for name and zip code in Checkout');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async CheckoutandVerifyProductDetails() {
        try {
            await browserActions.click(await this.btn_continue);
            const expected_headerTxt = headerText.CheckoutPage_overView;
            await browserActions.waitForVisibilityOf(await this.txt_DescHeader);
            const headerTxtOnUI = await browserActions.getTextFrom(await this.txt_header);
            await expectConditions.checkIfEqual(headerTxtOnUI, expected_headerTxt, 'Header text in checkout overview does not match');
            console.log('Navigated to Checkout Overview page');

            const productName_UI = await browserActions.getTextFrom(await this.txt_productName);
            console.log('Product Name:' + productName_UI);
            const productDescription_UI = await browserActions.getTextFrom(await this.txt_productDescription);
            console.log('Product Description:' + productDescription_UI);
            const productPrice_UI = await browserActions.getTextFrom(await this.txt_productPrice);
            console.log('Product Price:' + productPrice_UI);

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
    async verifySummaryDetails() {
        try {
            const paymentinfoTxt = await browserActions.getTextFrom(await this.txt_PaymentValue);
            const shippingInfoTxt = await browserActions.getTextFrom(await this.txt_ShippingValue);
            const subtotalPrice = (await browserActions.getTextFrom(await this.txt_itemSubTotal))
                .split(' ')[1]
                .replace(RegexValues.CurrencyRegex, '');
            const taxPrice = (await browserActions.getTextFrom(await this.txt_itemTax))
                .split(' ')[1]
                .replace(RegexValues.CurrencyRegex, '');
            const totalPrice = (await browserActions.getTextFrom(await this.txt_itemTotal))
                .split(' ')[1]
                .replace(RegexValues.CurrencyRegex, '');
            await expectConditions.checkIfContains(paymentinfoTxt, checkOutTextValues.paymentInfoStringPart_value);
            await expectConditions.checkIfEqual(
                shippingInfoTxt,
                checkOutTextValues.shippingInfo_value,
                'shipping info value does not match in checkout overview',
            );
            console.log('Subtotal' + subtotalPrice);
            console.log('Tax' + taxPrice);
            console.log('total' + totalPrice);
            const calculatedTotal = subtotalPrice + taxPrice;
            await expectConditions.checkIfEqual(totalPrice, calculatedTotal, 'Calculated Total is equal to actual total in UI');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async placeOrder() {
        try {
            const expected_headertxt = headerText.CheckoutPage_complete;
            await browserActions.click(await this.btn_Finish);
            await browserActions.waitForVisibilityOf(await this.txt_checkoutComplete);
            const headertext_UI = await browserActions.getTextFrom(await this.txt_header);
            await expectConditions.checkIfEqual(headertext_UI, expected_headertxt, 'Header text does not match in Checkout Complete');
            const OrderCompletetxt = await browserActions.getTextFrom(await this.txt_checkoutComplete);
            const orderDispatchMsg = await browserActions.getTextFrom(await this.txt_dispatchMsg);
            await expectConditions.checkIfEqual(
                OrderCompletetxt,
                checkOutTextValues.thankYouMsg,
                'Thank message on checkout complete does not match',
            );
            await expectConditions.checkIfEqual(
                orderDispatchMsg,
                checkOutTextValues.dispatchedMsg,
                'Dispatch message on checkout complete does not match',
            );
            await expectConditions.checkIfTrue(await browserActions.isDisplayed(await this.btn_backHome));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const CheckoutPO = new Checkout();
