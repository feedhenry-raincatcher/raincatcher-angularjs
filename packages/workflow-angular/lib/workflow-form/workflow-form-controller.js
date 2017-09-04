var CONSTANTS = require('../constants');


/**
 * Controller for editing / creating Workflows
 * @param $scope
 * @param workflowService
 * @param $stateParams
 * @param $q
 * @param $timeout
 * @constructor
 */
function WorkflowFormController($scope, workflowService, workflowFlowService, $stateParams, $q, $timeout) {
  var self = this;
  self.model = false;
  self.submitted = false;

  //If there is no workflow ID, then we are creating a new workflow.
  var workflowPromise = $stateParams.workflowId ? workflowService.read($stateParams.workflowId) : $q.when({
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
      var createUpdatePromise = hasId ? workflowService.update(self.model) : workflowService.create(self.model);

      createUpdatePromise.then(function(workflow) {
        workflowFlowService.goToWorkflowDetails(workflow);
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

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowFormController", ['$scope', 'workflowService', 'workflowFlowService', '$stateParams', '$q', '$timeout', WorkflowFormController]);
