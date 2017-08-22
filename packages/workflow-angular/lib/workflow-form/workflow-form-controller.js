var CONSTANTS = require('../constants');


/**
 * Controller for editing / creating Workflows
 * @param $scope
 * @param workflowApiService
 * @param $stateParams
 * @param $q
 * @param $timeout
 * @constructor
 */
function WorkflowFormController($scope, workflowApiService, workflowFlowService, $stateParams, $q, $timeout) {
  var self = this;
  self.model = false;
  self.submitted = false;

  //If there is no workflow ID, then we are creating a new workflow.
  var workflowPromise = $stateParams.workflowId ? workflowApiService.readWorkflow($stateParams.workflowId) : $q.when({
    steps: []
  });

  workflowPromise.then(function(workflow) {
    $timeout(function() {
      self.model = workflow;
    });

  });

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      var hasId = self.model.id;
      var createUpdatePromise = hasId ? workflowApiService.updateWorkflow(self.model) : workflowApiService.createWorkflow(self.model);

      createUpdatePromise.then(function(updatedCreatedWorkflow) {
        workflowFlowService.goToWorkflowDetails(updatedCreatedWorkflow);
      });
    }
  };

  self.selectWorkflow = function(event, workflow) {
    if (workflow.id) {
      workflowFlowService.goToWorkflowDetails(workflow);
    } else {
      workflowFlowService.goToWorkflowList();
    }
    event.preventDefault();
    event.stopPropagation();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowFormController", ['$scope', 'workflowApiService', 'workflowFlowService', '$stateParams', '$q', '$timeout', WorkflowFormController]);
