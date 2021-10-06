import {Then} from '@cucumber/cucumber';
import {CheckoutPO} from '../pages/Checkout.page';

Then("I add firstname {string},last name {string} and zipCode {string}", async function (firstName : string, lastName : string, zipCode : string) {
    await CheckoutPO.addShippingInfo(firstName, lastName, zipCode);
},);

Then("I continue to Checkout page and verify details", async function () {
    await CheckoutPO.CheckoutandVerifyProductDetails();
});

Then("I place the order", async function () {
    await CheckoutPO.placeOrder();
});
