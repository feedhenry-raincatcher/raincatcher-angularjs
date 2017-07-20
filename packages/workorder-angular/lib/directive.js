'use strict';
var CONSTANTS = require('./constants');
module.exports = function(config) {
  config = config || {};

  config.adminMode = config.mode === CONSTANTS.MODES.ADMIN;
  angular.module(CONSTANTS.WORKORDER_DIRECTIVE, [])
    .constant("WORKORDER_CONFIG", config);

  require('./services/api-service'),
  require('./services/flow-service'),

  require('../dist');
  require('./workorder-detail');
  require('./workorder-form');
  require('./workorder-list');
  require('./workorder-status');
  require('./workorder-submission-result');
  require('./workorder-summary');

  return CONSTANTS.WORKORDER_DIRECTIVE;
};

