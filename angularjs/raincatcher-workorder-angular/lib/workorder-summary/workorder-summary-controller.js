var CONSTANTS = require('../constants');
var debug = require('../utils/logger')(__filename);

function WorkorderSummaryController($scope, $mdDialog, mediator, $stateParams, workorderMediatorService, $q, WORKORDER_CONFIG) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  var workorderId = $stateParams.workorderId;


  function refreshWorkorderData() {
    //Need to read the workorder from the state parameter
    var workorderPromise = workorderMediatorService.readWorkorder(workorderId);

    var workflowPromise = workorderPromise.then(function(workorder) {
      return workorderMediatorService.readWorkflow(workorder.workflowId);
    });

    var resultPromise = workorderPromise.then(function(workorder) {
      return $q.when(workorderMediatorService.resultMap().then(function(resultMap) {
        return resultMap[workorder.id];
      }));
    });

    var workerPromise = workorderPromise.then(function(workorder) {
      return workorder && workorder.assignee ? workorderMediatorService.readUser(workorder.assignee) : $q.when(null);
    });
    //TODO: Error handling
    $q.all([workorderPromise, workflowPromise, resultPromise, workerPromise])
      .then(function(results) {
        self.workorder = results[0];
        self.workflow = results[1];
        self.result = results[2];
        self.assignee = results[3];
      }).catch(function(err) {
        debug("ERROR", err);
        console.log("ERROR", err);
      });
  }

  refreshWorkorderData();
  // Whenever the list is updated from the server, refresh the workorder list.
  workorderMediatorService.subscribeToListUpdated($scope, refreshWorkorderData);



  self.delete = function(event, workorder) {

    if (!self.adminMode) {
      return;
    }

    event.preventDefault();
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete workorder #'+workorder.title+'?')
      .textContent(workorder.title)
      .ariaLabel('Delete Workorder')
      .targetEvent(event)
      .ok('Proceed')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      return workorderMediatorService.removeWorkorder(workorder)
        .then(function() {
          //Finished removing the workorder, go back to the list.
          mediator.publish('wfm:ui:workorder:list');
        }, function(err) {
          //TODO: Error Handling
          throw err;
        });
    });
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderSummaryController', ['$scope', '$mdDialog', 'mediator', '$stateParams', 'workorderMediatorService', '$q', 'WORKORDER_CONFIG', WorkorderSummaryController]);