var ngModule;
try {
  ngModule = angular.module('wfm.ui.extensions');
} catch (e) {
  ngModule = angular.module('wfm.ui.extensions', []);
}

ngModule.run(['$templateCache', function($templateCache) {
  $templateCache.put('wfm-template/workorder-data.tpl.html',
    '<md-list-item class="md-2-line" ng-show="workorder.data && workorder.data.summary">\n' +
    '  <md-icon md-font-set="material-icons">info</md-icon>\n' +
    '  <div class="md-list-item-text">\n' +
    '    <h3>{{workorder.data.summary}}</h3>\n' +
    '    <p>Summary</p>\n' +
    '  </div>\n' +
    '  <md-divider></md-divider>\n' +
    '</md-list-item>\n' +
    '');
}]);
