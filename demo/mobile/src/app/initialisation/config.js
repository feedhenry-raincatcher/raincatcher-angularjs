var fh = require('fh-js-sdk');

function createMainAppRoute($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  // if none of the states are matched, use this as the fallback

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get("$state");
    $state.go("app.workorder");
  });

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      controller: 'mainController'
    });
}

angular.module('wfm-mobile').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', createMainAppRoute]).controller('mainController', [
  '$rootScope', '$scope', '$state', '$mdSidenav', '$window', '$http', 'passport',
  function ($rootScope, $scope, $state, $mdSidenav, $window, $http, passport) {
    passport.getProfile($http, $window).then(function(profileData) {
      $scope.profileData = profileData;
    });
    $scope.toggleSidenav = function(event, menuId) {
      $mdSidenav(menuId).toggle();
      event.stopPropagation();
    };
    $scope.navigateTo = function(state, params) {
      if (state) {
        $state.go(state, params);
      }
    };
    $scope.logout = function() {
      if($scope.profileData) {
        passport.logout($http, $window);
      }
    }
  }]);
