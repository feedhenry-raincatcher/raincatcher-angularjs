'use strict';
var CONSTANTS = require('./constants');


module.exports = function(config) {
  config = config || {};

  angular.module(CONSTANTS.WORKFLOW_MODULE_ID, [
    CONSTANTS.COMMON_TEMPLATE_DIRECTIVES,
    require('./workflow-directive')(config)
  ]);

  return CONSTANTS.WORKFLOW_MODULE_ID;
};
