var CONSTANTS = require('../constants');

/**
 * Controller for listing Workorders
 *
 * @constructor
 */

function WorkorderListController($scope, workorderService, workorderFlowService, $q, workorderStatusService) {
  var self = this;

  self.workorders = [];

  function refreshWorkorderData() {
    // Needs $q.when to trigger angular's change detection
    $q.when(workorderService.list()).then(function(workorders) {
      self.workorders = workorders;
    });
  }
  refreshWorkorderData();

  //Whenever the list is updated from the server, refresh the workorder list.
  var subscribe = workorderService.subscribeToDatasetUpdates;
  if (subscribe) {
    var updateMethod = refreshWorkorderData.bind(self);
    subscribe.bind(workorderService)(updateMethod);
  }

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
        id: term,
        title: term
      };

      $q.resolve(workorderService.search(filter)).then(function(workorders) {
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

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderListController', ['$scope', 'workorderService', 'workorderFlowService', '$q', 'workorderStatusService', WorkorderListController]);
