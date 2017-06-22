var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorderForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workorder-form.tpl.html')
    , controller: 'WorkorderFormController'
    , controllerAs: 'ctrl'
  };
});