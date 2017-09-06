module.exports = function(appName) {
  require('./initApp')(appName);
  return require('./authService');
}