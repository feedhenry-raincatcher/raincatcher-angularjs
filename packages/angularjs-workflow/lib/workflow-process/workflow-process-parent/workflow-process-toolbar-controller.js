var CONSTANTS = require('../../constants');

/**
 *
 * Controller for the workflow process view.
 *
 * @param $scope
 * @param $stateParams
 * @param workorderService
 * @constructor
 */
function WorkflowProcessToolbarController($scope, $stateParams, workorderService, $state) {
  var workorderId = $stateParams.workorderId;

  workorderService.read(workorderId).then(function(workorder) {
    $scope.workorder = workorder;
  });

  //Want to close this workflow and switch back to the list of workorders
  $scope.close = function() {
    $state.go('app.workorder');
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('ProcessToolbarController', ['$scope', '$stateParams', 'workorderService', '$state', WorkflowProcessToolbarController]);

