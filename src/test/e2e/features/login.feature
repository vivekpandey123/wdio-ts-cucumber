Feature: (UI) Validate user login functionality

    'As a user
    'I want to test login functionality to demo website'

    @failedLogin @regression
    Scenario Outline: Verify that user is not able to login with incorrect Credentials for Test "<testNum>"
        Given I open the website
        When I login to application using User "<user>" and password "<psw>"
        Then I verify that I am not allowed to login
        Examples:
            | testNum | user            | psw          |
            | 1       | locked_out_user | secret_sauce |
            | 2       | standard_user   | wrongpsw     |

    @successlogin @regression
    Scenario Outline: Verify that user is able to login with correct Credentials for Test "<testNum>"
        Given I open the website
        When I login to application using User "<user>" and password "<psw>"
        And I verify that I am navigated to Products page
        Examples:
            | testNum | user          | psw          |
            | 1       | standard_user | secret_sauce |