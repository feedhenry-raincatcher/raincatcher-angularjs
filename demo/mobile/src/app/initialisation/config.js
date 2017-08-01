var fh = require('fh-js-sdk');

function createMainAppRoute($stateProvider, $urlRouterProvider) {
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
  '$rootScope', '$scope', '$state', '$mdSidenav', '$http', '$window', 'Auth',
  function($rootScope, $scope, $state, $mdSidenav, $http, $window, Auth) {

    // return user profile from keycloak
    if (Auth.keycloak) {
      // display manage account menu item in UI
      $scope.useKeycloak = true;

      // retrieve the users profile from keycloak
      var profile = Auth.keycloak.userProfile;
      $scope.profileData = {
        "name": profile.attributes.name[0],
        "email": profile.email,
        "avatar": profile.attributes.avatar[0]
      };
    } else {
      // return user profile from passport
      Auth.passport.loadUserProfile($http, $window).then(function(profileData) {
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
      return Auth.keycloak.hasResourceRole(role);
    };
    $scope.hasRealmRole = function(role) {
      return Auth.keycloak.hasRealmRole(role);
    };
    $scope.manageAccount = function() {
      Auth.keycloak.accountManagement();
    };
    $scope.logout = function() {
      if (Auth.keycloak) {
        Auth.keycloak.logout();
      } else {
        Auth.passport.logout($http, $window);
      }
    };
  }]);
