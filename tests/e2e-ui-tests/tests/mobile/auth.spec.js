var authData = require('../../data/auth.do');
var AuthService = require('../../services/mobile/auth.so');
var authService = new AuthService();

describe("Mobile Auth E2E", function() {
  describe("Valid authentication scenario", function() {
    describe('Check user can login with valid credentials', function() {
      step('open mobile login', function() {
        authService.openMobileApp();
      });

      step('verify we are on login page', function() {
        authService.verifyLoginPageIsVisible();
      });

      step('login as ' + authData.users.TREVER.username + ' with password ' + authData.password.DEFAULT_PASSWORD, function() {
        authService.loginToMobileApp(authData.users.TREVER.username,
          authData.password.DEFAULT_PASSWORD);
      });

      step('verify workorders screen is displayed', function() {
        authService.verifySuccessfulLogin();
      });

      step('verify user details are correct', function() {
        authService.verifyUserDetails(authData.users.TREVER.fullName,
          authdata.users.TREVER.email,
          authData.users.TREVER.photoURL);
      });
    });

    describe('Check user can logout correctly', function() {
      step('logout of mobile client', function() {
        authService.logoutOfMobileApp();
      });

      step('verify login page is displayed', function() {
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
        authservice.loginToMobileApp(authData.users.TREVER.username,
          authData.password.INVALID_PASSWORD);
      });

      step('verify login error message is displayed', function() {
        authService.verifyErrorMessageIsDisplayed();
      });
    });

    describe('check user cannot login without a password', function() {
      step('open mobile login', function() {
        authService.openMobileApp();
      });

      step('attempt to login as ' + authData.users.TREVER.username + ' without a password', function() {
        authservice.loginToMobileApp(authData.users.TREVER.username, "")
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
    step('', function() {
      console.log('Access control tests still to be implemented');
    });
  })
});
