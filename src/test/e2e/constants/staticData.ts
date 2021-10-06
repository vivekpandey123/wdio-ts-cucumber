export enum Timeouts {
    _2Seconds = 2000,
    _5Seconds = 5000,
    _8Seconds = 8000,
    _10Seconds = 10000,
    _15Seconds = 15000,
    _20Seconds = 20000,
    _30Seconds = 30000,
    _60Seconds = 60000,
}
export const userCreds = {
    validUser: 'standard_user',
    incorrectUser: 'locked_out_user',
    bugUser: 'problem_user',
    slowUser: 'performance_glitch_user',
    password: 'secret_sauce',
};
export const headerText = {
    productPage: 'PRODUCTS',
    cartPage: 'YOUR CART',
    CheckoutPage_info: 'CHECKOUT: YOUR INFORMATION',
    CheckoutPage_overView: 'CHECKOUT: OVERVIEW',
    CheckoutPage_complete: 'CHECKOUT: COMPLETE!',
};
export const checkOutTextValues = {
    paymentInfoStringPart_value: 'SauceCard',
    shippingInfo_value: 'FREE PONY EXPRESS DELIVERY!',
    thankYouMsg: 'THANK YOU FOR YOUR ORDER',
    dispatchedMsg: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
};

export const RegexValues = {
    CurrencyRegex: "[.,',€,CHF,£,¥,￥,$,Kč,' ',' ',kr]",
};
