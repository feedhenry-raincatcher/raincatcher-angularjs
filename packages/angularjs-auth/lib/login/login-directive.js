var CONSTANTS = require('../constants');

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).directive('login', function($templateCache, USER_CONFIG) {

  //Users can pass in their own template for login if required.
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/login.tpl.html')
    , controller: 'LoginCtrl'
    , controllerAs: 'ctrl'
    , replace: true
  };
});
