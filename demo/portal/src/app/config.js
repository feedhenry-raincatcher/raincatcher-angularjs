var angular = require('angular');


/**
 * Configuration script for the main portal application.
 *
 * This script sets up the resolvers for the sync managers used to manage:
 *
 * - workorders
 * - workflows
 * - workflow results
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @constructor
 */
function AppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/workorders/list');

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      data: {
        columns: 3
      },
      controller: function($scope, $state, $mdSidenav, userService, dialogService) {
        userService.readUser().then(function(profileData) {
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

        $scope.$state = $state;
        $scope.toggleSidenav = function(event, menuId) {
          $mdSidenav(menuId).toggle();
          event.stopPropagation();
        };

        $scope.navigateTo = function(state, params) {
          if (state) {
            if ($mdSidenav('left').isOpen()) {
              $mdSidenav('left').close();
            }
            $state.go(state, params);
          }
        };

        $scope.hasResourceRole = function(role) {
          return userService.hasResourceRole(role);
        };

        $scope.logout = function() {
          userService.logout();
        };
      }
    });
}

angular.module('app').config(["$stateProvider", "$urlRouterProvider", AppConfig])
