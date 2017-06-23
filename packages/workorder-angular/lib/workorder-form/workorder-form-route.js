var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).config(['$stateProvider', 'WORKORDER_CONFIG', function($stateProvider, WORKORDER_CONFIG) {

  var views = {};

  views[WORKORDER_CONFIG.mainColumnViewId] = {
    template: "<workorder-form></workorder-form>"
  };

  $stateProvider.state('app.workorder.edit', {
    url: '/workorder/:workorderId/edit',
    views: views
  });

  $stateProvider.state('app.workorder.new', {
    url: '/new',
    views: views
  });
}]);
