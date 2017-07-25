var CONSTANTS = require('../constants');


/**
 * Initialistion functions for UI topic subscribers.
 */
angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).service(CONSTANTS.WORKFLOW_FLOW_SERVICE, function($state) {
  var flowService = {};
  //When a workflow is selected in the UI, we display the workflow details.
  flowService.goToWorkflowDetails = function(workflow) {
    $state.go('app.workflow.detail', {
      workflowId: workflow.id
    },
      { reload: true }
    );
  };
  //Want to display the list of workflows.
  flowService.goToWorkflowList = function() {
    $state.go('app.workflow', null, { reload: false });
  };

  //Subscribing to the begin topic for a workorder. This will begin a workflow for a workorder.
  flowService.beginWorkflow = function(workorder) {
    $state.go('app.workflowProcess.begin', {
      workorderId: workorder.id
    });
  };
  return flowService;
}).filter('isEmpty', function() {
  return function(object) {
    return (Object.keys(object).length === 0);
  };
});
