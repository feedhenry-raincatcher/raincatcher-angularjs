'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');
var logger = require('@raincatcher/logger');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./util'),
  require('./services'),
  require('@raincatcher/demo-wfm'),
  require('@raincatcher/demo-sync'),
  // Set of the data services
  require('@raincatcher/workflow-angular')({
    mode: "user",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/workorder-angular')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher/vehicle-inspection')
]);

require('../keycloak');
require('./initialisation');


