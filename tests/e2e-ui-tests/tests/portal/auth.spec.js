var authData = require('../../data/auth.do');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

xdescribe("Portal Auth E2E", function() {
  describe("Valid authentication scenario", function() {
    describe('Check user can login with valid credentials', function() {
      step('open portal login', function() {
        browser.ignoreSynchronization = true;
        authService.openPortalApp();
      });

      step('verify we are on login page', function() {
        authService.verifyLoginPageIsVisible();
      });

      step('login as ' + authData.users.DAISY.username + ' with password ' + authData.password.DEFAULT_PASSWORD, function() {
        authService.loginToPortalApp(authData.users.DAISY.username,
          authData.password.DEFAULT_PASSWORD);
      });

      step('verify workorders screen is displayed', function() {
        browser.ignoreSynchronization = false;
        authService.verifySuccessfulLogin();
      });
    });

    describe('Check user can logout correctly', function() {
      step('logout of portal client', function() {
        authService.logoutOfPortalApp();
      });

      step('verify login page is displayed', function() {
        browser.ignoreSynchronization = true;
        authService.verifyLoginPageIsVisible();
      });
    });
  });

  describe('Invalid login scenarios', function() {
    describe('check user cannot login with incorrect password', function() {
      step('open portal login', function() {
        authService.openPortalApp();
      });

      step('attempt to login as ' + authData.users.DAISY.username + ' with password ' + authData.password.INVALID_PASSWORD, function() {
        authService.loginToPortalApp(authData.users.DAISY.username,
          authData.password.INVALID_PASSWORD);
      });

      step('verify login error message is displayed', function() {
        authService.verifyErrorMessageIsDisplayed();
      });
    });

    describe('check user cannot login without a password', function() {
      step('open portal login', function() {
        authService.openPortalApp();
      });

      step('attempt to login as ' + authData.users.DAISY.username + ' without a password', function() {
        authService.loginToPortalApp(authData.users.DAISY.username, "");
      });

      step('verify login error message is displayed', function() {
        authService.verifyErrorMessageIsDisplayed();
      });
    });

    describe('check user cannot login with invalid username', function() {
      step('open portal login', function() {
        authService.openPortalApp();
      });

      step('attempt to login as ' + authData.users.INVALID_USER.username + ' with password ' + authData.password.DEFAULT_PASSWORD, function() {
        authService.loginToPortalApp(authData.users.INVALID_USER.username,
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
