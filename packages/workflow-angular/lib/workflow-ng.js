'use strict';
var CONSTANTS = require('./constants');


module.exports = function(config) {
  config = config || {};

  angular.module(CONSTANTS.WORKFLOW_MODULE_ID, [
    require('./directive')(config)
  ]);

  return CONSTANTS.WORKFLOW_MODULE_ID;
};
