var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorderSummary', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workorder-summary.tpl.html')
    , controller: 'WorkorderSummaryController'
    , controllerAs: 'ctrl'
  };
});