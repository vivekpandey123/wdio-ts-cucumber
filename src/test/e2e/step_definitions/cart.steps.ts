import { Given, When, Then } from '@cucumber/cucumber';
import { CartpagePO } from '../pages/Cart.page';

Given("I navigate to cart page", async function () {
    await CartpagePO.NavigateToCart();
});

Then("I verify the product details on cart", async function () {
    await CartpagePO.verifyCartDetails();
});

When("I click on checkout", async function () {
    await CartpagePO.click_Checkout();
});
