var pageObject = require('../../page-objects/mobile/auth');
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

}

/**
 * Used to open the login page of the mobile application
 */
AuthService.prototype.openMobileApp = function() {
  loginPage.commands.openMobileApp();
};

/**
 *
 * @param {String} usernameOrEmail - the username or email of the user
 * @param {String} password - the password associated with the users username or
 *                            email address
 */
AuthService.prototype.loginToMobileApp = function(usernameOrEmail, password) {
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
    pageConstants.login.USERNAME_LABEL_MSG_MOBILE,
    pageConstants.login.PASSWORD_LABEL_MSG
  ]);
};

/**
 * Used to check that login has been successful and we are on the correct page
 */
AuthService.prototype.verifySuccessfulLogin = function() {
  utils.check.elementsArePresent([
    workordersPage.locators.heading,
    workordersPage.locators.searchBox,
    workordersPage.locators.workordersList
  ]);
  utils.check.elementVisibilityAndValue(workordersPage.locators.heading,
    pageConstants.workorders.mobile.DEFAULT_HEADING);
};

/**
 * Used to verify the details of the user displayed above the navigation tab are
 * correct for the logged in user
 *
 * @param {String} fullName - the full name of the user
 * @param {String} email - the users email address
 * @param {String} imagePath - the URL path for the image
 */
AuthService.prototype.verifyUserDetails = function(fullName, email, imagePath) {
  utils.check.elementVisibilityAndAttributeValue(navigationPage.locators.userAvatar,
    "src", imagePath);
  utils.check.elementVisibilityAndValue(navigationPage.locators.userName, fullName);
  utils.check.elementVisibilityAndValue(navigationPage.locators.userEmail, email);
};

/**
 * Used to check that the error message is displayed after incorrect credentials
 * have been entered, and that the error message is as expected
 */
AuthService.prototype.verifyErrorMessageIsDisplayed = function() {
  utils.check.elementVisibilityAndValue(loginPage.locators.warnings.invalidCredentialsErrorMsg,
    pageConstants.login.AUTH_FAIL_MSG_MOBILE);
};

/**
 * Used to logout of the mobile application
 */
AuthService.prototype.logoutOfMobileApp = function() {
  navigationPage.commands.clickLogoutButton();
};

module.exports = AuthService;