var keycloakConfig = require('../../config.json');
var keycloakModule = require('@raincatcher/angularjs-auth-keycloak');

var AUTH_MODULE_ID = "wfm.auth.keycloak";

var angularModule = angular.module(AUTH_MODULE_ID, []);

var keycloakLib;
if (window.navigator.onLine) {
  keycloakLib = keycloakModule.init('app', angularModule,
    keycloakConfig.keycloak, keycloakConfig.keycloakInit);
  keycloakModule.interceptor(angularModule, keycloakLib);
}
angular.module(AUTH_MODULE_ID).factory('authService', ["$mdDialog", function($mdDialog) {
  var authService = new keycloakModule.KeycloakAuth(keycloakLib, $mdDialog);
  return authService;
}]);


module.exports = AUTH_MODULE_ID;
