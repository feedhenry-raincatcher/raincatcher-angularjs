var PassportAuthService = require('@raincatcher/angularjs-auth-passport')('app');
var module = angular.module('wfm.auth.portal.passport');

module.factory('authService', ['$http', '$window', '$mdDialog', '$state',
  function($http, $window, $mdDialog, $state) {
    return new PassportAuthService($http, $window, $mdDialog, $state);
  }]);

module.config(['$httpProvider', function($httpProvider) {
  // This property needs to be set to true to allow cookies to be sent to the server
  $httpProvider.defaults.withCredentials = true;
}]);