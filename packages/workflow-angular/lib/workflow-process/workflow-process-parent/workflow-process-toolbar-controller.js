var CONSTANTS = require('../../constants');

/**
 *
 * Controller for the workflow process view.
 *
 * @param $scope
 * @param $stateParams
 * @param workflowMediatorService
 * @param mediator
 * @constructor
 */
function WorkflowProcessToolbarController($scope, $stateParams, workflowMediatorService, mediator) {
  var workorderId = $stateParams.workorderId;

  workflowMediatorService.readWorkorder(workorderId).then(function(workorder) {
    $scope.workorder = workorder;
  });

  //Want to close this workflow and switch back to the list of workorders
  $scope.close = function() {
    mediator.publish('wfm:ui:workorder:list');
  };
}


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('ProcessToolbarController', ['$scope', '$stateParams', 'workflowMediatorService', 'mediator', WorkflowProcessToolbarController]);

