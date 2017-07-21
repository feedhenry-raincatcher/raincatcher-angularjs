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

angular.module('wfm-mobile')
  .config(['$stateProvider', '$urlRouterProvider', createMainAppRoute])
  .controller('mainController', [
    '$rootScope', '$scope', '$state', 'userService',
    function($rootScope, $scope, $state, userService) {
      userService.readLoggedInUser().then(function(profileData) {
        $scope.profileData = profileData;
      });
      // $scope.toggleSidenav = function(event, menuId) {
      //   $mdSidenav(menuId).toggle();
      //   event.stopPropagation();
      // };
      $scope.navigateTo = function(state, params) {
        if (state) {
          $state.go(state, params);
        }
      };
    }]);
