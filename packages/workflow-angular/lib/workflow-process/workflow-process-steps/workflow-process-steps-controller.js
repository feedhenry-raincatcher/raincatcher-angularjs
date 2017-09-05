var CONSTANTS = require('../../constants');


/**
 * Lots of this will move to core.
 *
 * Here, we render the current step of the workflow to the user.
 *
 * @param $scope
 * @param $state
 * @param wfmService
 * @param $timeout
 * @param $stateParams
 * @constructor
 */
function WorkflowProcessStepsController($scope, $state, wfmService, $timeout, $stateParams) {
  var self = this;
  var workorderId = $stateParams.workorderId;

  function updateWorkflowState(workorder) {
    //If the workflow is complete, then we can switch to the summary view.
    if (wfmService.isCompleted(workorder)) {
      return $state.go('app.workflowProcess.complete', {
        workorderId: workorder.id
      });
    }

    //If the next step is < 0 then we are going back to the beginning
    if (wfmService.isOnStep(workorder)) {
      return $state.go('app.workflowProcess.begin', {
        workorderId: workorder.id
      });
    }

    //Otherwise, render the next step in the workflow.
    $timeout(function() {
      self.workorder = workorder;
      self.workflow = workorder.workflow;
      self.result = workorder.results;
      // TODO
      self.stepIndex = 0
      self.stepCurrent = workorder.currentStep;
    });
  }

  self.back = function() {
    wfmService.previousStep(workorderId).then(function(workflowSummary) {
      updateWorkflowState(workflowSummary);
    });
  };

  //Beginning the workflow
  wfmService.readWorkOrder(workorderId).then(function(workorder) {
    updateWorkflowState(workorder);
  });

  self.triggerCompleteStep = function(submission) {
    wfmService.completeStep({
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

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessStepsController', ['$scope', '$state', 'wfmService', '$timeout', '$stateParams', WorkflowProcessStepsController]);
