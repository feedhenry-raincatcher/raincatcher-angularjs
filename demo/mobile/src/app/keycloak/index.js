var keycloakConfig = require('../../config.json');
var keycloakModule = require('@raincatcher/angularjs-auth-keycloak');

var MOBILE_AUTH_MODULE_ID = "wfm.auth.mobile.keycloak";

var angularModule = angular.module(MOBILE_AUTH_MODULE_ID, []);
var keycloakLib;
if (window.navigator.onLine) {
  keycloakLib = keycloakModule.init('wfm-mobile', angularModule,
    keycloakConfig.keycloak, keycloakConfig.keycloakInit);
  keycloakModule.interceptor(angularModule, keycloakLib);
}
angular.module(MOBILE_AUTH_MODULE_ID).factory('authService', ["$mdDialog", function($mdDialog) {
  var authService = new keycloakModule.KeycloakAuth(keycloakLib, $mdDialog);
  return authService;
}]);


module.exports = MOBILE_AUTH_MODULE_ID;
