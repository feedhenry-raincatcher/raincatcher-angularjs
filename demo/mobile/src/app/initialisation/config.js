function createMainAppRoute($stateProvider, $urlRouterProvider) {
  // if none of the states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get("$state");
    //$state.go("app.workorder");
    $state.go('app.login', undefined, {reload: true});
  });
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      controller: 'mainController'
    });
}

angular.module('wfm-mobile').config(['$stateProvider', '$urlRouterProvider', createMainAppRoute]).controller('mainController', [
  '$rootScope', '$scope', '$state', '$mdSidenav', 'userService', '$mdDialog',
  function($rootScope, $scope, $state, $mdSidenav, userService, $mdDialog) {
    userService.readUser().then(function(profileData) {
      $scope.profileData = profileData;
    }).catch(function(err) {
      console.info(err);
      $mdDialog.show($mdDialog.alert({
        title: 'Failed to Load Profile Data',
        textContent: 'Unable to load profile data',
        ok: 'Login'
      })).then(function() {
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

    $scope.logout = function() {
      userService.logout();
    };
  }]);
