var until = protractor.ExpectedConditions;
var pageConstants = require('../../../data/page_constants');

var LoginPage = function() {
  var locators = {
    buttons: {
      submitButton: element(by.id('login'))
    },
    fields: {
      usernameField: element(by.id('username')),
      passwordField: element(by.id('password'))
    },
    pageText: {
      usernameLabel: element(by.css('label[for="username"]')),
      passwordLabel: element(by.css('label[for="password"]'))
    },
    warnings: {
      invalidCredentialsErrorMsg: element(by.css('.feedback-error h1'))
    }
  };

  var commands = {
    openPortalApp: function() {
      browser.get(pageConstants.login.URL.PORTAL);
    },
    clickSubmitbutton: function() {
      locators.buttons.submitButton.click();
    },
    enterUsername: function(username) {
      browser.wait(until.presenceOf(locators.fields.usernameField), 10000);
      locators.fields.usernameField.clear().sendKeys(username);
    },
    enterPassword: function(password) {
      locators.fields.passwordField.clear().sendKeys(password);
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = LoginPage();
