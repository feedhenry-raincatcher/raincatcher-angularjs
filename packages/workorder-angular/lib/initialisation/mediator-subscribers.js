var CONSTANTS = require('../constants');
var debug = require('../utils/logger')(__filename);

angular.module(CONSTANTS.WORKORDER_MODULE_ID).run(function($state, mediator, WORKORDER_CONFIG) {

  mediator.subscribe('wfm:ui:workorder:selected', function(workorder) {
    debug("Workorder selected", workorder);

    //If we are in administration mode, then the workorder should be displayed to the user.
    if (WORKORDER_CONFIG.adminMode) {
      $state.go(
        'app.workorder.summary',
        { workorderId: workorder.id || workorder._localuid },
        { reload: true }
      );
    } else {
      //In User mode, selecting the workorder means that we want to start the workflow.
      mediator.publish("wfm:ui:workflow:begin", workorder);
    }
  });
  mediator.subscribe('wfm:ui:workorder:list', function() {
    $state.go('app.workorder', null, {reload: true});
  });
});