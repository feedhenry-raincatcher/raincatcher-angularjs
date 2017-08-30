var pageObject = require('../../page-objects/portal/auth');
var loginPage = pageObject.login;
var navigationPage = pageObject.navigation;
var workordersPage = pageObject.workorders;
var utils = require('../../utils');
var pageConstants = require('../../data/page_constants');

/**
 *
 * @constructor
 */
function AuthService() {

};

/**
 * Used to open the login page of the portal application
 */
AuthService.prototype.openPortalApp = function() {
  loginPage.commands.openPortalApp();
};

/**
 *
 * @param {String} usernameOrEmail - the username or email of the user
 * @param {String} password - the password associated with the users username or
 *                            email address
 */
AuthService.prototype.loginToPortalApp = function(usernameOrEmail, password) {
  if (usernameOrEmail !== "") {
    loginPage.commands.enterUsername(usernameOrEmail);
  }
  if (password !== "") {
    loginPage.commands.enterPassword(password);
  }
  loginPage.commands.clickSubmitbutton();
};

/**
 *  Used to check that the login page is visible and that the page detaisl are
 *  correct
 */
AuthService.prototype.verifyLoginPageIsVisible = function() {
  utils.check.elementsArePresent([
    loginPage.locators.pageText.usernameLabel,
    loginPage.locators.fields.usernameField,
    loginPage.locators.pageText.passwordLabel,
    loginPage.locators.fields.passwordField,
    loginPage.locators.buttons.submitButton
  ]);
  utils.check.valuesAreCorrect([
    loginPage.locators.pageText.usernameLabel,
    loginPage.locators.pageText.passwordLabel
  ], [
    pageConstants.login.USERNAME_LABEL_MSG,
    pageConstants.login.PASSWORD_LABEL_MSG
  ]);
};

/**
 * Used to check that login has been successful and we are on the correct page
 */
AuthService.prototype.verifySuccessfulLogin = function() {
  utils.check.elementsArePresent([
    workordersPage.locators.header,
    workordersPage.locators.emptyTitle,
    workordersPage.locators.emptyBody,
    workordersPage.locators.newButton,
    workordersPage.locators.search
  ]);
  utils.check.elementVisibilityAndValue(workordersPage.locators.heading,
    pageConstants.workorders.portal.DEFAULT_HEADING);
};

/**
 * Used to check that the error message is displayed after incorrect credentials
 * have been entered, and that the error message is as expected
 */
AuthService.prototype.verifyErrorMessageIsDisplayed = function() {
  utils.check.elementVisibilityAndValue(loginPage.locators.invalidCredentialsErrorMsg,
    pageConstants.login.AUTH_FAIL_MSG);
};

/**
 * Used to logout of the mobile application
 */
AuthService.prototype.logoutOfPortalApp = function() {
  navigationPage.commands.clickLogoutButton();
};

module.exports = AuthService;
