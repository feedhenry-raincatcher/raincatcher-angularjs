var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-complete.tpl.html',
    '<div class="workflow" ng-if="ctrl.workflow">\n' +
    '  <workflow-progress workflow="ctrl.workflow" step-index="ctrl.workflow.steps.length"></workflow-progress>\n' +
    '\n' +
    '  <workorder workorder="ctrl.workorder" status="ctrl.workorder.status"></workorder>\n' +
    '\n' +
    '  <div ng-repeat="result in ctrl.results">\n' +
    '    <md-divider></md-divider>\n' +
    '    <workorder-result result="result" step="ctrl.getStepForResult(result)"></workorder-result>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
