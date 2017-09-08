var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).config(['$stateProvider', 'WORKORDER_CONFIG', function($stateProvider, WORKORDER_CONFIG) {

  var views = {};

  views[WORKORDER_CONFIG.mainColumnViewId] = {
    template: "<workorder></workorder>"
  };

  $stateProvider.state('app.workorder.detail', {
    url: '/workorder/:workorderId',
    views: views
  });
}]);
