angular.module('wfm.http').config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.cache = true;
  }]);
