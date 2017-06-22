var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorder', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workorder.tpl.html')
    , scope: {
      workorder: '=',
      assignee: '=',
      status: '='
    }
    , controller: 'WorkorderDetailController'
    , controllerAs: 'ctrl'
  };
});