var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).config(['$stateProvider', 'WORKORDER_CONFIG', function($stateProvider, WORKORDER_CONFIG) {


  var views = {};

  views[WORKORDER_CONFIG.mainColumnViewId] = {
    template: "<workorder-summary></workorder-summary>"
  };

  $stateProvider.state('app.workorder.summary', {
    url: '/workorder/:workorderId/summary',
    views: views
  });
}]);
