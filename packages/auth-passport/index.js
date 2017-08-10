angular.module('wfm.auth.passport', []);

require('./authService');

module.exports = function(appName) {
  require('./initApp')(appName);
  return 'wfm.auth.passport';
}