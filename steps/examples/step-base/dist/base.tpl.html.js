var ngModule;
try {
  ngModule = angular.module('wfm.base');
} catch (e) {
  ngModule = angular.module('wfm.base', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/base.tpl.html',
    '<md-subheader>Report View</md-subheader>\n' +
    '<!-- Three field report -->\n' +
    '<md-list class="accident">\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <!-- Customise change model. to own variable --> \n' +
    '      <h3>{{model.regNr}} </h3>\n' +
    '      <p>E.g. Car Registration Number</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{model.owner}} </h3>\n' +
    '      <p>E.g. Owner name</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{model.phone}} </h3>\n' +
    '      <p>E.g. Owner Phone Number</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
