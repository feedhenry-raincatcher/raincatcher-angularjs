var ngModule;
try {
  ngModule = angular.module('wfm.accident');
} catch (e) {
  ngModule = angular.module('wfm.accident', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/accident-form.tpl.html',
    '<div layout="row">\n' +
    '  <div flex="40" layout="row" layout-align="start center">\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Car registration number</label>\n' +
    '      <input type="text" id="title" name="title" ng-model="ctrl.model.regNr" required>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '<div layout="row">\n' +
    '  <div flex="40" layout="row" layout-align="start center">\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Owner name</label>\n' +
    '      <input type="text" id="title" name="title" ng-model="ctrl.model.owner" required>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '<div layout="row">\n' +
    '  <div flex="40" layout="row" layout-align="start center">\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Owner phone number</label>\n' +
    '      <input type="text" id="title" name="title" ng-model="ctrl.model.phone" required>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
