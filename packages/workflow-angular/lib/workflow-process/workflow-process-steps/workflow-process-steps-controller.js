var CONSTANTS = require('../../constants');


/**
 *
 * Lots of this will move to core.
 *
 * Here, we render the current step of the workflow to the user.
 *
 * @param $scope
 * @param $state
 * @param workflowApiService
 * @param $timeout
 * @param $stateParams
 * @constructor
 */
function WorkflowProcessStepsController($scope, $state, workflowApiService, $timeout, $stateParams) {
  var self = this;
  var workorderId = $stateParams.workorderId;

  function updateWorkflowState(workflowSummary) {

    //If the workflow is complete, then we can switch to the summary view.
    if (workflowSummary.result && workflowSummary.result.status === CONSTANTS.STATUS.COMPLETE_DISPLAY) {
      return $state.go('app.workflowProcess.complete', {
        workorderId: workflowSummary.workorder.id
      });
    }

    //If the next step is < 0 then we are going back to the beginning
    if (workflowSummary.nextStepIndex < 0) {
      return $state.go('app.workflowProcess.begin', {
        workorderId: workflowSummary.workorder.id
      });
    }

    //Otherwise, render the next step in the workflow.
    $timeout(function() {
      self.workorder = workflowSummary.workorder;
      self.workflow = workflowSummary.workflow;
      self.result = workflowSummary.result;
      self.stepIndex = workflowSummary.nextStepIndex;
      self.stepCurrent = workflowSummary.step;
    });
  }

  self.back = function() {
    workflowApiService.previousStep(workorderId).then(function(workflowSummary) {
      updateWorkflowState(workflowSummary);
    });
  };

  //Beginning the workflow
  workflowApiService.beginWorkflow(workorderId).then(function(workflowSummary) {
    updateWorkflowState(workflowSummary);
  });

  self.triggerCompleteStep = function(submission) {
    workflowApiService.completeStep({
      workorderId: workorderId,
      submission: submission,
      stepCode: self.stepCurrent.code
    }).then(function(workflowSummary) {
      updateWorkflowState(workflowSummary);
    });
  };

  self.triggerBackStep = function() {
    self.back();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessStepsController', ['$scope', '$state', 'workflowApiService', '$timeout', '$stateParams', WorkflowProcessStepsController]);
