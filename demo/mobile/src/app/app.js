'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');
var logger = require('@raincatcher/logger');

var accidentStep = require('@raincatcher-examples/step-accident');
var vehicleInspectionStep = require('@raincatcher-examples/step-vehicle-inspection');

logger.setLogger(new logger.ClientLogger(2));

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  // Enables passport auth service to be used
  require('../passport'),
  require('./services'),
  require('./sync'),
  // Set of the data services
  require('@raincatcher/angularjs-workflow')({
    mode: "user",
    mainColumnViewId: "content@app",
    stepDefinitions: [
      vehicleInspectionStep.definition,
      accidentStep.definition
    ]
  }),
  require('@raincatcher/angularjs-workorder')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher/angularjs-auth')(),
  vehicleInspectionStep.ngModule(),
  accidentStep.ngModule()
]);

// NOTE: Enable the next line in order to use Keycloak auth service
// require('../keycloak');
require('./initialisation');


