var CONSTANTS = require('./constants.js');

angular.module(CONSTANTS.MOBILE_AUTH_MODULE_ID, []);
require('./mobileAuthService');

module.exports = CONSTANTS.MOBILE_AUTH_MODULE_ID;