var authData = require('../../data/auth.do');
var AuthService = require('../../services/mobile/auth.so');
var authService = new AuthService();
var pageConstants = require('../../data/page_constants');

describe("Mobile Auth E2E", function() {
  describe("Valid authentication scenario", function() {
    describe('Check user can login with valid credentials', function() {
      step('open mobile login', function() {
        browser.ignoreSynchronization = true;
        authService.openMobileApp();
        browser.driver.executeScript(function() {
          sessionStorage.clear();
          localStorage.clear();
        });
        authService.openMobileApp();
      });

      step('login as ' + authData.users.TREVER.username + ' with password ' + authData.password.DEFAULT_PASSWORD, function() {
        element(by.id('username')).clear().sendKeys(authData.users.TREVER.username);
        element(by.id('password')).clear().sendKeys(authData.password.DEFAULT_PASSWORD);
        element(by.css('button[type="submit"]')).click();
      });

      step('verify workorders screen is displayed', function() {
        browser.ignoreSynchronization = false;
        authService.verifySuccessfulLogin();
      });
    });

    describe('Check user can logout correctly', function() {
      step('logout of mobile client', function() {
        authService.logoutOfMobileApp();
      });

      step('verify login page is displayed', function() {
        browser.ignoreSynchronization = true;
        authService.verifyLoginPageIsVisible();
      });
    });
  });

  describe('Invalid login scenarios', function() {
    describe('check user cannot login with incorrect password', function() {
      step('open mobile login', function() {
        authService.openMobileApp();
      });

      step('attempt to login as ' + authData.users.TREVER.username + ' with password ' + authData.password.INVALID_PASSWORD, function() {
        authService.loginToMobileApp(authData.users.TREVER.username,
          authData.password.INVALID_PASSWORD);
      });

      step('verify login error message is displayed', function() {
        authService.verifyErrorMessageIsDisplayed();
      });
    });

    describe('check user cannot login with invalid username', function() {
      step('open mobile login', function() {
        authService.openMobileApp();
      });

      step('attempt to login as ' + authData.users.INVALID_USER.username + ' with password ' + authData.password.DEFAULT_PASSWORD, function() {
        authService.loginToMobileApp(authData.users.INVALID_USER.username,
          authData.password.DEFAULT_PASSWORD);
      });

      step('verify login error message is displayed', function() {
        authService.verifyErrorMessageIsDisplayed();
      });
    });
  });

  describe('Access control tests', function() {
    xstep('Access control tests still to be implemented', function() {
      
    });
  });
});
