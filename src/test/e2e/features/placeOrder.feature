Feature: (UI) Validate user is able to login and place order via https://www.saucedemo.com/

    'As a user
    'I want to login to demo website
    'So that I can test order placement functionality'

    @regression @placeorder
    Scenario Outline: Verify that user is able to place order in website for test number <testNum>
        Given I open the website
        When I login to application using User "<user>" and password "<psw>"
        And I verify that I am navigated to Products page
        And I sort the results as per "<sortingfilter>"
        And I select the <index> product and check its details
        And I add product to cart
        And I navigate to cart page
        And I verify the product details on cart
        And I click on checkout
        Then I add firstname "<firstName>",last name "<lastName>" and zipCode "<zip>"
        Then I continue to Checkout page and verify details
        Then I place the order
        Examples:
            | testNum | user          | psw          | sortingfilter       | firstName | lastName | zip    |index|
            | 1       | standard_user | secret_sauce | Price (low to high) | MyName    | sirName  | 010101 |3|
