'use strict';
var CONSTANTS = require('./constants');

module.exports = function(config) {
  angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE, []).constant("USER_CONFIG", config);
  require('../dist');
  require('./login');
  return CONSTANTS.AUTH_DIRECTIVE_MODULE;
};


