var CONSTANTS = require('../constants');

/**
 * Service for controlling flow (transitions) for workorders
 */
angular.module('wfm.workorder.flowservices',[]).service(CONSTANTS.WORKORDER_FLOW_SERVICE,
  ["$state", "WORKORDER_CONFIG", "workorderApiService", function ($state, WORKORDER_CONFIG, workorderApiService) {

    function workorderSelected(workorder) {
      //If we are in administration mode, then the workorder should be displayed to the user.
      if (WORKORDER_CONFIG.adminMode) {
        $state.go(
          'app.workorder.summary',
          { workorderId: workorder.id },
          { reload: true }
        );
      } else {
        //In User mode, selecting the workorder means that we want to start the workflow.
        workorderApiService.begin(workorder);
      }
    }

    function listWorkorders() {
      $state.go('app.workorder', null, { reload: true });
    }

    return {
      workorderSelected: workorderSelected,
      listWorkorders: listWorkorders
    }
  }]);

module.exports = 'wfm.workorder.flowservices';
