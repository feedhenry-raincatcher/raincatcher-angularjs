var angular = require('angular');


/**
 *
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
      resolve: {
        profileData: function(userClient) {
          return userClient.getProfile();
        },
        syncManagers: function(syncPool, profileData) {
          return syncPool.syncManagerMap(profileData);
        },
        workorderManager: function(syncManagers) {
          return syncManagers.workorders;
        },
        workflowManager: function(syncManagers) {
          return syncManagers.workflows;
        }
      },
      controller: function($scope, $state, $mdSidenav, mediator, profileData) {
        $scope.profileData = profileData;
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
      }
    });
}


angular.module('app').config(["$stateProvider", "$urlRouterProvider", AppConfig]);