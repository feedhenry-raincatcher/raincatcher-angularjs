var ngModule;
try {
  ngModule = angular.module('wfm.template.directives');
} catch (e) {
  ngModule = angular.module('wfm.template.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-toolbar.tpl.html',
    '\n' +
    '<div class="md-toolbar-tools">\n' +
    '  <md-button ng-click="close()" hide-gt-sm class="md-icon-button">\n' +
    '    <md-icon aria-label="Close" md-font-set="material-icons">close</md-icon>\n' +
    '  </md-button>\n' +
    '  <h1>Workorder : {{workorder.title}}</h1>\n' +
    '</div>');
}]);
