var CONSTANTS = require('../../constants');

/**
 *
 * Controller for starting a workflow process.
 *
 * @param $state
 * @param workflowMediatorService
 * @param $stateParams
 * @param $timeout
 * @constructor
 */
function WorkflowProcessBeginController($state, workflowMediatorService, $stateParams, $timeout) {
  var self = this;

  //Here we want to begin the workorder workflow..
  //First we display it to the user.

  var workorderId = $stateParams.workorderId;
  workflowMediatorService.workflowSummary(workorderId).then(function(workflowSummaryDetails) {
    $timeout(function() {
      self.workorder = workflowSummaryDetails.workorder;
      self.workflow = workflowSummaryDetails.workflow;
      self.status = workflowSummaryDetails.status;
      self.stepIndex = workflowSummaryDetails.nextStepIndex;
      self.result = workflowSummaryDetails.result;
      self.notCompleted = self.stepIndex < self.workflow.steps.length;
    });
  });

  //Want to go to the next step.
  self.begin = function() {
    $state.go('app.workflowProcess.steps', {
      workorderId: self.workorder.id
    });
  };
}


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessBeginController', ['$state', 'workflowMediatorService', '$stateParams', '$timeout', WorkflowProcessBeginController]);