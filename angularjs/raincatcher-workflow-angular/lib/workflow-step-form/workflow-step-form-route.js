var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {

  var views =  {
  };

  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    template: '<workflow-step-form></workflow-step-form>'
  };

  $stateProvider
    .state('app.workflow.step', {
      url: '/workflow/:workflowId/steps/:code/edit',
      views: views
    });
}]);