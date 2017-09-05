var CONSTANTS = require('../../constants');

/**
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
    self.result = workorder.result;
    self.started = !wfmService.isNew(self.workorder);
    self.completed = wfmService.isCompleted(self.workorder);
  });

  self.begin = function() {
    wfmService.begin(self.workorder)
      .then(function() {
        $state.go('app.workflowProcess.steps', {
          workorderId: workorderId
        });
      })
      .catch(console.error.bind(console));
  };
}


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowProcessBeginController', ['$state', 'workorderService', 'wfmService', '$stateParams', '$timeout', WorkflowProcessBeginController]);
