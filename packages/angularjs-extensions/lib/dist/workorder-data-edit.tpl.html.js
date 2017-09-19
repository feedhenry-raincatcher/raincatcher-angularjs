var ngModule;
try {
  ngModule = angular.module('wfm.ui.extensions');
} catch (e) {
  ngModule = angular.module('wfm.ui.extensions', []);
}

ngModule.run(['$templateCache', function($templateCache) {
  $templateCache.put('wfm-template/workorder-data-edit.tpl.html',
    '<md-input-container class="md-block">\n' +
    '  <label>Summary</label>\n' +
    '  <input type="text" id="inputTitle" name="title" ng-model="ctrl.model.data.summary" required>\n' +
    '  <div ng-messages="workorderForm.title.$error" ng-if="ctrl.submitted || workorderForm.title.$dirty">\n' +
    '    <div ng-message="required">A summary is required.</div>\n' +
    '  </div>\n' +
    '</md-input-container>\n' +
    '');
}]);
