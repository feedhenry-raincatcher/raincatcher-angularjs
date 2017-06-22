module.exports = 'app.settings';

angular.module('app.settings', [
  'ui.router',
  'ngMaterial',
  'app.feedhenry'
]);

require('./dataResetService');
require('./settingsController');
require('./settingsDirective');
