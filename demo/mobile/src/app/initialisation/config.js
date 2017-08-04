var fh = require('fh-js-sdk');

function createMainAppRoute($stateProvider, $urlRouterProvider, $httpProvider, Auth) {
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

angular.module('wfm-mobile').config(['$stateProvider', '$urlRouterProvider', createMainAppRoute]).controller('mainController', [
  '$rootScope', '$scope', '$state', '$mdSidenav', 'userService', '$http', '$window', 'Auth', 'dialogService',
  function($rootScope, $scope, $state, $mdSidenav, userService, $http, $window, Auth, dialogService) {
    if (Auth) {
      // retrieve user profile from keycloak
      Auth.getProfile().then(function(profile) {
        $scope.profileData = profile;
      }).catch(function(err) {
        dialogService.showAlert({
          title: 'Error Loading Profile Data',
          textContent: 'Failed to load profile data. ' + err + 'Please login',
          ok: 'Login'
        }).then(function() {
          Auth.login();
        });
      })
    } else {
      // Retrieve user profile from passport
      userService.getProfile($http, $window).then(function(profileData) {
        $scope.profileData = profileData;
      });
    }

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
      return Auth.hasResourceRole(role);
    };
    $scope.hasRealmRole = function(role) {
      return Auth.hasRealmRole(role);
    };
    $scope.manageAccount = function() {
      Auth.accountManagement();
    };
    $scope.logout = function() {
      if (Auth) {
        Auth.logout();
      } else {
        var req = {
          method: 'GET',
          url: fh.getCloudURL() + '/logout'
        };

        return $http(req, {withCredentials: true}).then(function() {
          $window.location = fh.getCloudURL() + '/login';
        }, function(err) {
          console.log('error logging out', err);
        });
      }
    };
  }]);
