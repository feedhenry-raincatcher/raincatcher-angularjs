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

    if (!wfmService.isOnStep(workorder)) {
      return $state.go('app.workflowProcess.begin', {
        workorderId: workorder.id
      });
    }

    $timeout(function() {
      self.workorder = workorder;
      self.workflow = workorder.workflow;
      self.result = workorder.results;
      self.stepIndex = wfmService.getCurrentStepIdx(workorder);
      self.stepCurrent = wfmService.getCurrentStep(workorder);
    });
  }

  self.back = function() {
    wfmService.previousStep(workorderId)
      .then(updateWorkflowState)
      .catch(console.error);
  };

  self.triggerCompleteStep = function(submission) {
    wfmService.completeStep(workorderId, submission)
      .then(updateWorkflowState)
      .catch(console.error);
  };

  self.triggerBackStep = function() {
    self.back();
  };

  wfmService.readWorkOrder(workorderId).then(updateWorkflowState);
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessStepsController', ['$scope', '$state', 'wfmService', '$timeout', '$stateParams', WorkflowProcessStepsController]);
