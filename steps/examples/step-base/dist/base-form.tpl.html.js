var ngModule;
try {
  ngModule = angular.module('wfm.accident');
} catch (e) {
  ngModule = angular.module('wfm.accident', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/base-form.tpl.html',
    '<p class="wfm-accident-row">Please register driver details</p>\n' +
    '\n' +
    '<div class="wfm-accident-row" class="form-group" ng-form name="accidentForm">\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Car registration number</label>\n' +
    '    <input type="text" id="title" name="title" ng-model="ctrl.model.regNr" required>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Owner name</label>\n' +
    '    <input type="text" id="title" name="title" ng-model="ctrl.model.owner" required>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Owner phone number</label>\n' +
    '    <input type="text" id="title" name="title" ng-model="ctrl.model.phone" required>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-disabled="accidentForm.$invalid || accidentForm.$pristine" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '<!-- workflow-actions-->\n' +
    '');
}]);
