'use strict';
var CONSTANTS = require('./constants');


module.exports = function (config) {
  config = config || {};
  // Initialize all templates
  angular.module(CONSTANTS.COMMON_TEMPLATE_DIRECTIVES, []);

  angular.module("wfm.ui.module", [
    CONSTANTS.COMMON_TEMPLATE_DIRECTIVES,
    CONSTANTS.COMMON_API_SERVICES,
    require('./workflow-ng')(config),
    require('./workorder-ng')(config)
  ]);

  return CONSTANTS.COMMON_TEMPLATE_DIRECTIVES;
};
