var CONSTANTS = require('../constants');

/**
 *
 * Controller for listing Workorders
 *
 * @param $scope
 * @param {Mediator} mediator
 * @param {WorkorderMediatorService} workorderMediatorService
 * @param workorderStatusService
 * @param $q
 * @constructor
 */

function WorkorderListController($scope, mediator, workorderMediatorService, $q, workorderStatusService) {
  var self = this;
  var _workorders = [];

  self.workorders = [];
  self.resultMap = {};

  function refreshWorkorderData() {
    $q.all([workorderMediatorService.listWorkorders(), workorderMediatorService.resultMap()]).then(function(results) {
      self.workorders = results[0];
      _workorders = results[0];
      self.resultMap = results[1];
    });
  }

  refreshWorkorderData();

  //Whenever the list is updated from the server, refresh the workorder list.
  workorderMediatorService.subscribeToListUpdated($scope, refreshWorkorderData);

  self.selectWorkorder = function(event, workorder) {
    mediator.publish('wfm:ui:workorder:selected', workorder);
    event.preventDefault();
    event.stopPropagation();
  };
  self.isWorkorderShown = function(workorder) {
    return self.shownWorkorder === workorder;
  };

  self.applyFilter = function(term) {
    term = term.toLowerCase();
    self.workorders = _workorders.filter(function(workorder) {
      return String(workorder.id).indexOf(term) !== -1
        || String(workorder.title).toLowerCase().indexOf(term) !== -1;
    });
  };

  self.getColorIcon = function(workorder) {
    var result = this.resultMap[workorder.id];
    if (!result) {
      return workorderStatusService.getStatusIconColor('').statusColor;
    } else {
      return workorderStatusService.getStatusIconColor(this.resultMap[workorder.id].status).statusColor;
    }
  };
}

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderListController', ['$scope', 'mediator', 'workorderMediatorService', '$q', 'workorderStatusService', WorkorderListController]);