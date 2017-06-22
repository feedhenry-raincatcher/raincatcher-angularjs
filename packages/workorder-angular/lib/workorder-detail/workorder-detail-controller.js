var CONSTANTS = require('../constants');

/**
 *
 * Controller for displaying workorder details to the user.
 * @param mediator
 * @param WORKORDER_CONFIG
 * @constructor
 */

function WorkorderDetailController(mediator, WORKORDER_CONFIG, workorderStatusService) {
  var self = this;

  self.adminMode = WORKORDER_CONFIG.adminMode;

  self.selectWorkorder = function(event, workorder) {
    if (workorder.id) {
      mediator.publish('wfm:workorder:selected', workorder);
    } else {
      mediator.publish('wfm:workorder:list');
    }

    event.preventDefault();
    event.stopPropagation();
  };

  self.getColorIcon = function(status) {
    return workorderStatusService.getStatusIconColor(status).statusColor;
  };
}


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderDetailController', ["mediator", 'WORKORDER_CONFIG', 'workorderStatusService', WorkorderDetailController]);