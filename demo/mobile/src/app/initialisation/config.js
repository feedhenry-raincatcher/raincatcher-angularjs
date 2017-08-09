function createMainAppRoute($stateProvider, $urlRouterProvider, $httpProvider) {
  // This property needs to be set to true in order for Passport to work, this can be disabled for Keycloak
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
  '$rootScope', '$scope', '$state', '$mdSidenav', 'userService', 'dialogService',
  function($rootScope, $scope, $state, $mdSidenav, userService, dialogService) {
    userService.getProfile().then(function(profileData) {
      $scope.profileData = profileData;
    }).catch(function(err) {
      dialogService.showAlert({
        title: 'Failed to Load Profile Data',
        textContent: 'Unable to load profile data due to the following error: ' + err + 'Please login',
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
      var manageAccount = userService.manageAccount();
      manageAccount();
    };

    $scope.enableManageAccount = function() {
      if (userService.manageAccount()) {
        return true;
      }
      return false;
    };

    $scope.logout = function() {
      userService.logout();
    };
  }]);
