var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).config(['$stateProvider', 'WORKORDER_CONFIG', function($stateProvider, WORKORDER_CONFIG) {

  var views = {};

  //If we are in admin mode, if there is a list view, then the list can be rendered into that view.
  if (WORKORDER_CONFIG.adminMode && WORKORDER_CONFIG.listColumnViewId) {
    views[WORKORDER_CONFIG.listColumnViewId] = {
      template: '<workorder-list></workorder-list>'
    };

    views[WORKORDER_CONFIG.mainColumnViewId] = {
      templateProvider: function($templateCache) {
        return $templateCache.get('wfm-template/workorder-empty.tpl.html');
      }
    };
  } else {
    //Otherwise, render it into the main view.
    views[WORKORDER_CONFIG.mainColumnViewId] = {
      template: '<workorder-list></workorder-list>'
    };
  }

  var workorderListStateConfig = {
    url: '/workorders/list',
    views: views
  };

  $stateProvider.state('app.workorder', workorderListStateConfig);
}]);
