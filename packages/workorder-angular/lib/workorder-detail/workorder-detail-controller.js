var CONSTANTS = require('../constants');

/**
 * Controller for displaying workorder details to the user.
 * @param WORKORDER_CONFIG
 * @constructor
 */

function WorkorderDetailController($state, WORKORDER_CONFIG, workorderStatusService, workorderFlowService) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  self.selectWorkorder = function(event, workorder) {
    if (workorder.id) {
      workorderFlowService.workorderSelected(workorder);
    } else {
      workorderFlowService.listWorkorders();
    }

    event.preventDefault();
    event.stopPropagation();
  };

  self.getColorIcon = function(status) {
    return workorderStatusService.getStatusIconColor(status).statusColor;
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderDetailController', ['$state','WORKORDER_CONFIG', 'workorderStatusService', 'workorderFlowService', WorkorderDetailController]);
