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
  require('@raincatcher/dialog'),
  // Enables passport auth service to be used
  require('@raincatcher/demo-auth-passport')('wfm-mobile'),
  require('./services'),
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

// NOTE: Enable the next line in order to use Keycloak auth service
// require('../keycloak');
require('./initialisation');


