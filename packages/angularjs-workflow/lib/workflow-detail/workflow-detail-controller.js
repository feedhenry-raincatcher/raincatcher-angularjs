var CONSTANTS = require('../constants');


/**
 *
 * Controller for displaying a workflow
 *
 * @param $scope
 * @param $mdDialog
 * @param $stateParams
 * @param workflowService
 * @param $timeout
 * @param $q
 * @constructor
 */
function WorkflowDetailController($scope, $mdDialog, $stateParams, workflowService, workorderService, workflowFlowService, $q) {
  var self = this;
  self.workflow = null;

  //Used with the ng-sortable module
  self.dragControlListeners = {
    containment: '#stepList',
    accept: function(sourceItemHandleScope, destSortableScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    },
    orderChanged :  function() {
      workflowService.update(self.workflow);
    }
  };

  $q.all([
    workflowService.read($stateParams.workflowId),
    workorderService.list()
  ]).then(function(results) {
    self.workflow = results[0];
    self.workorders = results[1];
  });

  function showDeleteDialog(workorders, event) {
    var workflowId  = self.workflow.id;

    var workorder = workorders.filter(function(workorder) {
      return String(workorder.workflowId) === String(workflowId);
    });

    var title = (workorder.length)
      ? "Workflow is used at least by at least 1 workorder, are you sure you want to delete workflow #'"+workflowId+"?"
      : "Would you like to delete workflow #"+workflowId+"?";
    var confirm = $mdDialog.confirm()
      .title(title)
      .textContent(self.workflow.title)
      .ariaLabel('Delete workflow')
      .targetEvent(event)
      .ok('Proceed')
      .cancel('Cancel');

    return $mdDialog.show(confirm);
  }

  function showDeleteStepDialog(step, event) {
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete step : '+ step.name +' ?')
      .textContent(step.name)
      .ariaLabel('Delete step')
      .targetEvent(event)
      .ok('Proceed')
      .cancel('Cancel');
    return $mdDialog.show(confirm);
  }

  self.delete = function(event, workflow) {
    event.preventDefault();

    showDeleteDialog(self.workorders, event)
      .then(function() {
        return workflowService.remove(workflow);
      })
      .then(function() {
        workflowFlowService.goToWorkflowList();
      }, function(err) {
        //TODO: Proper Error Handling.
        throw err;
      });
  };

  self.deleteStep = function(event, step, stepIndex, workflow) {
    event.preventDefault();
    showDeleteStepDialog(step, event).then(function() {
      if (workflow.steps[stepIndex].code === step.code) {
        workflow.steps.splice(stepIndex, 1);
      }
      workflowService.update(workflow)
        .then(function(_workflow) {
          workflowFlowService.goToWorkflowDetails(_workflow);
        });
    });
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller('WorkflowDetailController', ['$scope', '$mdDialog', '$stateParams', 'workflowService', 'workorderService', 'workflowFlowService', '$q', WorkflowDetailController]);
