var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorderList', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workorder-list.tpl.html')
    , controller: "WorkorderListController"
    , controllerAs: 'ctrl'
  };
});