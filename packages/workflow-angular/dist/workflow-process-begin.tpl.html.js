var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-begin.tpl.html',
    '<div class="workflow" ng-if="ctrl.workflow">\n' +
    '  <workflow-progress workflow="ctrl.workflow" step-index="-1"></workflow-progress>\n' +
    '\n' +
    '  <workorder workorder="ctrl.workorder" status="ctrl.workorder.status"></workorder>\n' +
    '  <div ng-if="!ctrl.completed" class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '    <md-button ng-click="ctrl.begin()" class="md-primary">\n' +
    '      <span ng-if="!ctlr.started">Start Workflow</span>\n' +
    '      <span ng-if="ctlr.started">Continue Workflow</span>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '  <workflow-result ng-if="ctrl.results" result="ctrl.results" workflow="ctrl.workflow"></workflow-result>\n' +
    '</div>\n' +
    '');
}]);
