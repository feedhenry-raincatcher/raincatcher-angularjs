'use strict';
var CONSTANTS = require('./constants');


module.exports = function(config) {
  config = config || {};

  angular.module(CONSTANTS.AUTH_MODULE_ID, [
    require('./directive')(config)
  ]);

  return CONSTANTS.AUTH_MODULE_ID;
};


