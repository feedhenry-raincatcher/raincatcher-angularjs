'use strict';
var CONSTANTS = require('./constants');

module.exports = function(config) {
  config = config || {};
  angular.module(CONSTANTS.WORKORDER_MODULE_ID, [
    require('angular-messages'),
    require('angular-ui-router'),
    require('./workorder-directive')(config),
  ]);
  return CONSTANTS.WORKORDER_MODULE_ID;
};
