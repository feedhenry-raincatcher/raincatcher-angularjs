angular.module('wfm.auth.passport', []);

module.exports = function(appName, isMobile) {
  require('./authService')(isMobile);
  require('./initApp')(appName);
  return 'wfm.auth.passport';
}