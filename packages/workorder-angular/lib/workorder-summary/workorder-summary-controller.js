var CONSTANTS = require('../constants');

function WorkorderSummaryController($scope, $mdDialog, $state, $stateParams, workorderApiService, $q, WORKORDER_CONFIG) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  function refreshWorkorderData() {
    var workorderId = $stateParams.workorderId;
    //Need to read the workorder from the state parameter
    var workorderPromise = workorderApiService.readWorkorder(workorderId);

    var workerPromise = workorderPromise.then(function(workorder) {
      return workorder && workorder.assignee ? workorderApiService.readUser(workorder.assignee) : null;
    });
    $q.all([workorderPromise, workerPromise])
      .then(function(results) {
        self.workorder = results[0];
        self.workflow = self.workorder.workflow;
        self.result = self.workorder.results;
        self.assignee = results[1];
      }).catch(function(err) {
        console.info("Error when refreshing workorder", err);
      });
  }

  refreshWorkorderData();
  // Whenever the list is updated from the server, refresh the workorder list.
  workorderApiService.subscribeToWokorderUpdates(refreshWorkorderData.bind(self));

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
