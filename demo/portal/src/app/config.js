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
  var redirectUrlForInvalidRoutes = '/unauthorised';

  $urlRouterProvider.otherwise(function() {
    return redirectUrlForInvalidRoutes;
  });

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      data: {
        columns: 3
      },
      controller: function($scope, $state, $mdSidenav, $mdDialog, userService) {
        $scope.authorised = [];

        userService.readUser().then(function(profileData) {
          if (profileData) {
            $scope.profileData = profileData;
            var workorderAuthorised = $scope.hasResourceRole('admin', 'workorder');
            $scope.hasResourceRole('admin', 'workflow');
            if (workorderAuthorised) {
              redirectUrlForInvalidRoutes = '/workorders/list';
              $state.go('app.workorder');
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
            if (params && params.authorised) {
              if ($mdSidenav('left').isOpen()) {
                $mdSidenav('left').close();
              }
              $state.go(state, params);
            } else {
              $state.go('app.unauthorised');
            }

          }
        };

        $scope.hasResourceRole = function(role, resource) {
          var authorised = userService.hasResourceRole(role);
          $scope.authorised[resource] = authorised;

          return authorised;
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
      }});

}

angular.module('app').config(["$stateProvider", "$urlRouterProvider", AppConfig]);
