var CONSTANTS = require('../../constants');

/**
 *
 * Controller for starting a workflow process.
 *
 * @param $state
 * @param workflowService
 * @param $stateParams
 * @param $timeout
 * @constructor
 */
function WorkflowProcessBeginController($state, workorderService, wfmService, $stateParams) {
  var self = this;

  var workorderId = $stateParams.workorderId;
  workorderService.read(workorderId).then(function(workorder) {
    self.workorder = workorder;
    self.workflow = workorder.workflow;
    self.status = workorder.status;
    // TODO: update step index logic
    // self.stepIndex = workorder.nextStepIndex;
    self.stepIndex = 0;
    self.result = workorder.result;
    self.notCompleted = self.stepIndex < self.workflow.steps.length;
  });

  self.begin = function() {
    var operationPromise;
    if (!self.result) {
      operationPromise = wfmService.beginWorkflow(workorderId);
    } else {
      operationPromise = workorderService.read(workorderId);
    }
    operationPromise.then(function() {
      $state.go('app.workflowProcess.steps', {
        workorderId: workorderId
      });
    });
  };
}


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessBeginController', ['$state', 'workorderService', 'wfmService', '$stateParams', '$timeout', WorkflowProcessBeginController]);
