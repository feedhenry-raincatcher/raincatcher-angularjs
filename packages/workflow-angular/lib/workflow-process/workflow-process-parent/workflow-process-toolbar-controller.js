var CONSTANTS = require('../../constants');

/**
 *
 * Controller for the workflow process view.
 *
 * @param $scope
 * @param $stateParams
 * @param workflowApiService
 * @constructor
 */
function WorkflowProcessToolbarController($scope, $stateParams, workflowApiService, workflowFlowService) {
  var workorderId = $stateParams.workorderId;

  workflowApiService.readWorkorder(workorderId).then(function(workorder) {
    $scope.workorder = workorder;
  });

  //Want to close this workflow and switch back to the list of workorders
  $scope.close = function() {
    workflowFlowService.goToWorkflowList();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('ProcessToolbarController', ['$scope', '$stateParams', 'workflowApiService', 'workflowFlowService', WorkflowProcessToolbarController]);

