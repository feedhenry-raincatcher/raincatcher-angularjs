var CONSTANTS = require('../constants');

/**
 * Controller for listing Workorders
 *
 * @constructor
 */

function WorkorderListController($scope, workorderApiService, workorderFlowService, $q, workorderStatusService) {
  var self = this;

  self.workorders = [];

  function refreshWorkorderData() {
    // Needs $q.when to trigger angular's change detection
    $q.when(workorderApiService.listWorkorders()).then(function(workorders) {
      self.workorders = workorders;
    });
  }

  refreshWorkorderData();

  //Whenever the list is updated from the server, refresh the workorder list.
  workorderApiService.subscribeToListUpdated($scope, refreshWorkorderData);

  self.selectWorkorder = function(event, workorder) {
    workorderFlowService.workorderSelected(workorder);

    event.preventDefault();
    event.stopPropagation();
  };
  self.isWorkorderShown = function(workorder) {
    return self.shownWorkorder === workorder;
  };

  self.applyFilter = function(term) {
    if (term.length === 0) {
      refreshWorkorderData();
    }

    if (term.length > 3) {
      var filter = {
        id: term
      };

      $q.resolve(workorderApiService.searchWorkorders(filter)).then(function(workorders) {
        self.workorders = workorders;
      });
    }
  };

  self.getColorIcon = function(workorder) {
    if (!workorder || !workorder.status) {
      return workorderStatusService.getStatusIconColor('').statusColor;
    } else {
      return workorderStatusService.getStatusIconColor(workorder.status).statusColor;
    }
  };
}

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderListController', ['$scope', 'workorderApiService', 'workorderFlowService', '$q', 'workorderStatusService', WorkorderListController]);
