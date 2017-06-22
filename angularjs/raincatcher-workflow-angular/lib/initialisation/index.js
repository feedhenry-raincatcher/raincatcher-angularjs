var CONSTANTS = require('../constants');


/**
 * Initialistion functions for UI topic subscribers.
 */
angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).run(function($state, workflowMediatorService) {

  //When a workflow is selected in the UI, we display the workflow details.
  workflowMediatorService.workflowUITopics.on(CONSTANTS.TOPICS.SELECTED, function(workflow) {
    $state.go('app.workflow.detail', {
      workflowId: workflow.id || workflow._localuid },
      { reload: true }
    );
  });

  //Want to display the list of workflows.
  workflowMediatorService.workflowUITopics.on(CONSTANTS.TOPICS.LIST, function() {
    $state.go('app.workflow', null, {reload: false});
  });

  //Subscribing to the begin topic for a workorder. This will begin a workflow for a workorder.
  workflowMediatorService.workflowUITopics.on(CONSTANTS.TOPICS.BEGIN, function(workorder) {
    $state.go('app.workflowProcess.begin', {
      workorderId: workorder.id
    });
  });
})
.filter('isEmpty', function() {
  return function(object) {
    return (Object.keys(object).length === 0);
  };
});