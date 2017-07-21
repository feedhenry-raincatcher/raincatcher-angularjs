'use strict';
var CONSTANTS = require('./constants');

module.exports = function(config) {
  config = config || {};
  angular.module(CONSTANTS.WORKORDER_MODULE_ID, [
    "wfm.common.apiservices",
    require('angular-messages'),
    require('angular-ui-router'),
    require('./directive')(config),
  ]);
  return CONSTANTS.WORKORDER_MODULE_ID;
};
