var fh = require('fh-js-sdk');

function createMainAppRoute($stateProvider, $urlRouterProvider, $httpProvider, Auth) {
  // This property needs to be set to true in order for Passport to work
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
  '$rootScope', '$scope', '$state', '$mdSidenav', 'userService', '$http', '$window', 'dialogService',
  function($rootScope, $scope, $state, $mdSidenav, userService, $http, $window, dialogService) {
    userService.getProfile($http, $window).then(function(profileData) {
      $scope.profileData = profileData;
    }).catch(function(err) {
      dialogService.showAlert({
        title: 'Error Loading Profile Data',
        textContent: 'Failed to load profile data. ' + err + 'Please login',
        ok: 'Login'
      }).then(function() {
        userService.login();
      });
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
    $scope.hasResourceRole = function(role) {
      return userService.hasResourceRole(role);
    };
    $scope.manageAccount = function() {
      userService.manageAccount();
    };
    $scope.logout = function() {
      userService.logout($http, $window);
    };
  }]);
