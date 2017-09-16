var ngModule;
try {
  ngModule = angular.module('raincatcher.step.dynamic-forms');
} catch (e) {
  ngModule = angular.module('raincatcher.step.dynamic-forms', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/dynamic-forms.html',
    '<md-subheader>{{ctrl.title}}</md-subheader>\n' +
    '<div ng-controller="DynamicFormController">\n' +
    '  <form sf-schema="schema" sf-form="form" sf-model="model" ng-disabled="true"></form>\n' +
    '</div>\n' +
    '');
}]);
