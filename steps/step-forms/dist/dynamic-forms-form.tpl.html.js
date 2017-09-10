var ngModule;
try {
  ngModule = angular.module('raincatcher.step.dynamic-forms');
} catch (e) {
  ngModule = angular.module('raincatcher.step.dynamic-forms', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/dynamic-forms-form.tpl.html',
    '<md-subheader>{{title}}</md-subheader>\n' +
    '<div ng-controller="DynamicFormController">\n' +
    '  <form name="dynamicForm" sf-schema="schema" sf-form="form" sf-model="model" ></form>\n' +
    '</div>\n' +
    '<!-- ng-submit="onSubmit(dynamicForm)" -->\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '');
}]);
