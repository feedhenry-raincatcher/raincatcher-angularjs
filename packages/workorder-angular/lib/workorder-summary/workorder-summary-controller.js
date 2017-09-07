var CONSTANTS = require('../constants');

function WorkorderSummaryController($mdDialog, $state, $stateParams, workorderService, userService, wfmService, $q, WORKORDER_CONFIG) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  function refreshWorkorderData() {
    var workorderId = $stateParams.workorderId;
    //Need to read the workorder from the state parameter
    var workorderPromise = workorderService.read(workorderId);

    var userPromise = workorderPromise.then(function(workorder) {
      return workorder && workorder.assignee ? userService.readUser(workorder.assignee) : null;
    });
    $q.all([workorderPromise, userPromise])
      .then(function(results) {
        var workorder = results[0];
        var user = results[1];
        self.workorder = workorder;
        self.workflow = workorder.workflow;
        self.results = workorder.results;
        self.assignee = user;
      }).catch(function(err) {
        console.error("Error when refreshing workorder", err);
      });
  }

  refreshWorkorderData();

  //Whenever the list is updated from the server, refresh the workorder list.
  var subscribe = workorderService.subscribeToDatasetUpdates;
  if (subscribe) {
    var updateMethod = refreshWorkorderData.bind(self);
    subscribe.bind(workorderService)(updateMethod);
  }

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
      return workorderService.remove(workorder)
        .then(function() {
          //Finished removing the workorder, go back to the list.
          $state.go('app.workorder', null, { reload: true });
        }, function(err) {
          //TODO: Error Handling
          throw err;
        });
    });
  };

  self.getStepForResult = function(result) {
    return wfmService.getStepForResult(result, self.workorder);
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderSummaryController', ['$mdDialog', '$state', '$stateParams', 'workorderService', 'userService', 'wfmService', '$q', 'WORKORDER_CONFIG', WorkorderSummaryController]);
