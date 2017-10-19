var ngModule;
try {
  ngModule = angular.module('wfm.step.camera');
} catch (e) {
  ngModule = angular.module('wfm.step.camera', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/camera-form.tpl.html',
    '<p class="wfm-step-row">Please register details</p>\n' +
    '<!-- Three field form -->\n' +
    '<div class="wfm-step-row" class="form-group" ng-form name="stepForm">\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>E.g. First Name</label>\n' +
    '    <!-- Customise change ng-model ctrl.model to own variable -->\n' +
    '    <input type="text" id="title" name="title" ng-model="ctrl.model.firstName" required>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>E.g. Last Name </label>\n' +
    '    <input type="text" id="title" name="title" ng-model="ctrl.model.lastName" required>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-disabled="stepForm.$invalid || stepForm.$pristine" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '<!-- workflow-actions-->\n' +
    '');
}]);
