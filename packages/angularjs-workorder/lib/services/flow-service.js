var CONSTANTS = require('../constants');

/**
 * Service for controlling flow (transitions) for workorders
 */
angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service(CONSTANTS.WORKORDER_FLOW_SERVICE,
  ['$state', 'WORKORDER_CONFIG', 'wfmService', function($state, WORKORDER_CONFIG, wfmService) {
    function workorderSelected(workorder) {
      //If we are in administration mode, then the workorder should be displayed to the user.
      if (WORKORDER_CONFIG.adminMode) {
        $state.go(
          'app.workorder.summary',
          { workorderId: workorder.id }
        );
      } else {
        //In User mode, selecting the workorder means that we want to start the workflow.
        var state = wfmService.isCompleted(workorder) ?
          'app.workflowProcess.complete' : 'app.workflowProcess.begin';
        $state.go(state, {
          workorderId: workorder.id
        });
      }
    }

    function listWorkorders() {
      $state.go('app.workorder');
    }

    return {
      workorderSelected: workorderSelected,
      listWorkorders: listWorkorders
    };
  }]);
