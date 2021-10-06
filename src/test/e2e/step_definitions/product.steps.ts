import { When } from '@cucumber/cucumber';
import { ProductpagePO } from '../pages/Product.page';

When("I verify that I am navigated to Products page", async function () {
    await ProductpagePO.verifyProductPage();
});

When("I sort the results as per {string}",{ wrapperOptions: { retry: 1 } }, async function (filterName: string) {
    await ProductpagePO.sortFilter(filterName);
});
When("I select the {int} product and check its details", async function (productIndex:number) {
    await ProductpagePO.selectProduct(productIndex);
});

When("I add product to cart", async function () {
    await ProductpagePO.addToCart();
});
