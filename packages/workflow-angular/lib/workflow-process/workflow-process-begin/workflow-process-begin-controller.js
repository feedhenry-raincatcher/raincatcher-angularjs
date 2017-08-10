var CONSTANTS = require('../../constants');

/**
 *
 * Controller for starting a workflow process.
 *
 * @param $state
 * @param workflowApiService
 * @param $stateParams
 * @param $timeout
 * @constructor
 */
function WorkflowProcessBeginController($state, workflowApiService, $stateParams) {
  var self = this;

  var workorderId = $stateParams.workorderId;
  workflowApiService.workflowSummary(workorderId).then(function(summary) {
    self.workorder = summary.workorder;
    self.workflow = summary.workflow;
    self.status = summary.workflow.status;
    self.stepIndex = summary.nextStepIndex;
    self.result = summary.result;
    self.notCompleted = summary.nextStepIndex < self.workflow.steps.length;
  });

  self.begin = function() {
    var operationPromise;
    if (!self.result) {
      operationPromise = workflowApiService.beginWorkflow(workorderId);
    } else {
      operationPromise = workflowApiService.workflowSummary(workorderId);
    }
    operationPromise.then(function() {
      $state.go('app.workflowProcess.steps', {
        workorderId: workorderId
      });
    });
  };
}


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessBeginController', ['$state', 'workflowApiService', '$stateParams', '$timeout', WorkflowProcessBeginController]);
