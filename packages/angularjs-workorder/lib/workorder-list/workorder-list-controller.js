var CONSTANTS = require('../constants');
var _ = require('lodash');

/**
 * Controller for listing Workorders
 *
 * @constructor
 */

function WorkorderListController($scope, workorderService, workorderFlowService, $q, workorderStatusService) {
  var self = this;

  var _workorders = [];
  self.workorders = [];

  function refreshWorkorders() {
    // Needs $q.when to trigger angular's change detection
    workorderService.list().then(function(workorders) {
      _workorders = workorders;
      self.updateFilter();
    });
  }
  refreshWorkorders();

  self.selectWorkorder = function(event, workorder) {
    workorderFlowService.workorderSelected(workorder);

    event.preventDefault();
    event.stopPropagation();
  };

  self.isWorkorderShown = function(workorder) {
    return self.shownWorkorder === workorder;
  };

  self.applyFilter = function(term) {
    self.term = term;
    self.updateFilter();
  };

  self.updateFilter = _.debounce(function() {
    $scope.$apply(function() {
      if (!self.term) {
        return self.workorders = _workorders;
      }
      if (self.term.length > 3) {
        var term = self.term.toLowerCase();
        self.workorders = _workorders.filter(function(workflow) {
          return String(workflow.title).toLowerCase().indexOf(term) !== -1
            || String(workflow.id).indexOf(term) !== -1;
        });
      }
    });
  }, 300);

  self.getColorIcon = function(workorder) {
    if (!workorder || !workorder.status) {
      return workorderStatusService.getStatusIconColor('').statusColor;
    } else {
      return workorderStatusService.getStatusIconColor(workorder.status).statusColor;
    }
  };

  self.setupEventListenerHandlers = function() {
    workorderService.on('create', function(workorder) {
      _workorders.push(workorder);
      self.updateFilter();
    });

    workorderService.on('remove', function(workorder) {
      _.remove(_workorders, function(w) {
        return w.id === workorder.id;
      });
      self.updateFilter();
    });

    workorderService.on('update', function(workorder) {
      var idx = _.findIndex(_workorders, function(w) {
        return w.id === workorder.id;
      });

      _workorders.splice(idx, 1, workorder);
      self.updateFilter();
    });
  };

  if (workorderService.on) {
    self.setupEventListenerHandlers();
  } else if (workorderService.subscribeToDatasetUpdates) {
    // use the single method to update workorders via sync
    workorderService.subscribeToDatasetUpdates(refreshWorkorders);
  }
}

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderListController', ['$scope', 'workorderService', 'workorderFlowService', '$q', 'workorderStatusService', WorkorderListController]);
