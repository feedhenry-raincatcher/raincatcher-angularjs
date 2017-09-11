var passportClient = require('@raincatcher/angularjs-auth-passport');

passportClient.init('app');
var WebAuthService = passportClient.WebAuthService;

var passportModule = angular.module('wfm.auth.portal.passport', []);

passportModule.factory('authService', ['$http', '$window', '$mdDialog', '$state',
  function($http, $window, $mdDialog, $state) {
    return new WebAuthService($http, $window, $mdDialog, $state);
  }]);

passportClient.cookieInterceptor(passportModule);

module.exports = 'wfm.auth.portal.passport';
