
// Compiled templates
require('./dist');

var extensionsModule = angular.module(require('./constants').MODULE_NAME);

extensionsModule.directive('workorderData', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/workorder-data.tpl.html')
  };
});

extensionsModule.directive('workorderDataEdit', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/workorder-data-edit.tpl.html')
  };
});
