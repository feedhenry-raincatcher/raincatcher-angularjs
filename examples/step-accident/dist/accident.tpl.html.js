var ngModule;
try {
  ngModule = angular.module('wfm.accident');
} catch (e) {
  ngModule = angular.module('wfm.accident', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/accident.tpl.html',
    '<md-subheader>Accident report</md-subheader>\n' +
    '\n' +
    '<md-list class="accident">\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{accidentModel.regNr}} </h3>\n' +
    '      <p>Car Registration Number</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{accidentModel.owner}} </h3>\n' +
    '      <p>Owner name</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{accidentModel.phone}} </h3>\n' +
    '      <p>Owner Phone Number</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
