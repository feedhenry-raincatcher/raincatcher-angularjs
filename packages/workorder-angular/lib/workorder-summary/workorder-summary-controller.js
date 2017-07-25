var CONSTANTS = require('../constants');

function WorkorderSummaryController($scope, $mdDialog, $state, $stateParams, workorderApiService, $q, WORKORDER_CONFIG) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  var workorderId = $stateParams.workorderId;


  function refreshWorkorderData() {
    //Need to read the workorder from the state parameter
    var workorderPromise = workorderApiService.readWorkorder(workorderId);

    var workflowPromise = workorderPromise.then(function(workorder) {
      return workorderApiService.readWorkflow(workorder.workflowId);
    });

    var resultPromise = workorderPromise.then(function(workorder) {
      return $q.when(workorderApiService.resultMap().then(function(resultMap) {
        return resultMap[workorder.id];
      }));
    });

    var workerPromise = workorderPromise.then(function(workorder) {
      return workorder && workorder.assignee ? workorderApiService.readUser(workorder.assignee) : $q.when(null);
    });
    //TODO: Error handling
    $q.all([workorderPromise, workflowPromise, resultPromise, workerPromise])
      .then(function(results) {
        self.workorder = results[0];
        self.workflow = results[1];
        self.result = results[2];
        self.assignee = results[3];
      }).catch(function(err) {
        console.log("ERROR", err);
      });
  }

  refreshWorkorderData();
  // Whenever the list is updated from the server, refresh the workorder list.
  workorderApiService.subscribeToListUpdated($scope, refreshWorkorderData);



  self.delete = function(event, workorder) {

    if (!self.adminMode) {
      return;
    }

    event.preventDefault();
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete workorder #' + workorder.title + '?')
      .textContent(workorder.title)
      .ariaLabel('Delete Workorder')
      .targetEvent(event)
      .ok('Proceed')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      return workorderApiService.removeWorkorder(workorder)
        .then(function() {
          //Finished removing the workorder, go back to the list.
          $state.go('app.workorder', null, { reload: true });
        }, function(err) {
          //TODO: Error Handling
          throw err;
        });
    });
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderSummaryController', ['$scope', '$mdDialog', '$state', '$stateParams', 'workorderApiService', '$q', 'WORKORDER_CONFIG', WorkorderSummaryController]);
