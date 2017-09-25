var angular = require('angular');

/**
 * Configuration script for the main portal application.
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
      controller: function($scope, $state, $mdSidenav, $mdDialog, userService) {
        userService.readUser().then(function(profileData) {
          if (profileData) {
            $scope.profileData = profileData;
            var isAdmin = userService.hasRole('admin');
            $scope.workorderEnabled = isAdmin;
            $scope.workflowEnabled = isAdmin;
            if (!isAdmin) {
              $state.go('app.unauthorised');
            }
          }
        }).catch(function(err) {
          console.info(err);
          userService.login();
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

        $scope.logout = function() {
          userService.logout();
        };
      }
    })
    .state('app.unauthorised', {
      abstract: false,
      url: '/unauthorised',
      templateUrl: 'app/main.tpl.html',
      data: {
        columns: 2
      }
    });
}

angular.module('app').config(["$stateProvider", "$urlRouterProvider", AppConfig]);
