var CONSTANTS = require('../constants');
var _ = require('lodash');

/**
 *
 * Controller for listing workorders
 *
 * @param $scope
 * @param $stateParams
 * @param {workflowservice} workflowService
 * @param $timeout
 * @constructor
 */
function WorkflowListController($scope, $stateParams, workflowService, workflowFlowService) {
  var self = this;
  self.selectedWorkflowId = $stateParams.workflowId;

  // full list of workflows
  var _workflows;
  // filtered list of workflows for display
  self.workflows = null;

  workflowService.on('create', function(workflow) {
    _workflows.push(workflow);
    self.updateFilter();
  });

  workflowService.on('remove', function(workflow) {
    _.remove(_workflows, function(w) {
      return w.id === workflow.id;
    });
    self.updateFilter();
  });

  workflowService.on('update', function(workflow) {
    var idx = _.findIndex(_workflows, function(w) {
      return w.id === workflow.id;
    });

    _workflows.splice(idx, 1, workflow);
    self.updateFilter();
  });


  function refreshWorkflows() {
    workflowService.list().then(function(workflows) {
      _workflows = workflows;
      self.updateFilter();
    });
  }

  refreshWorkflows();

  self.selectWorkflow = function(event, workflow) {
    self.selectedWorkflowId = workflow.id;
    workflowFlowService.goToWorkflowDetails(workflow);
  };

  self.applyFilter = function(term) {
    self.term = term;
    self.updateFilter();
  };

  self.updateFilter = _.debounce(function() {
    $scope.$apply(function() {
      if (!self.term) {
        return self.workflows = _workflows;
      }
      var term = self.term.toLowerCase();
      self.workflows = _workflows.filter(function(workflow) {
        return String(workflow.title).toLowerCase().indexOf(term) !== -1
          || String(workflow.id).indexOf(term) !== -1;
      });
    });
  }, 300);
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowListController', ['$scope', '$stateParams', 'workflowService', 'workflowFlowService', WorkflowListController]);
