var CONSTANTS = require('../constants');

/**
 * Controller for displaying workorder details to the user.
 * @param WORKORDER_CONFIG
 * @constructor
 */

function WorkorderDetailController($state, WORKORDER_CONFIG, workorderStatusService) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  self.getColorIcon = function(status) {
    return workorderStatusService.getStatusIconColor(status).statusColor;
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderDetailController', ['$state','WORKORDER_CONFIG', 'workorderStatusService', 'workorderFlowService', WorkorderDetailController]);
