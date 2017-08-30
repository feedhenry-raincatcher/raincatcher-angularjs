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
  // Enables passport auth service to be used
  require('@raincatcher/angularjs-auth-passport')('wfm-mobile'),
  require('./services'),
  require('./sync'),
  // Set of the data services
  require('@raincatcher/angularjs-workflow')({
    mode: "user",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/angularjs-workorder')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher-examples/step-vehicle-inspection'),
  require('@raincatcher-examples/step-accident')
]);

// NOTE: Enable the next line in order to use Keycloak auth service
// require('../keycloak');
require('./initialisation');


