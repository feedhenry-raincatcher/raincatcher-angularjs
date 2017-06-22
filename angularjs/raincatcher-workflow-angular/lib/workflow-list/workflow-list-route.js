var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {

  var views = {};

  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    templateProvider: function($templateCache) {
      return $templateCache.get('wfm-template/workflow-empty.tpl.html');
    }
  };

  views[WORKFLOW_CONFIG.listColumnViewId] = {
    template: '<workflow-list></workflow-list>'
  };

  $stateProvider.state('app.workflow', {
    url: '/workflows/list',
    views: views
  });
}]);