'use strict';

var angular = require('angular');
var logger = require('@raincatcher/logger');

var accidentStep = require('@raincatcher-examples/step-accident');
var vehicleInspectionStep = require('@raincatcher-examples/step-vehicle-inspection');
var signatureStep = require('@raincatcher/step-signature');

/**
 * Contains all static step definitions
 * If module has more than one definition use
 * stepDefinitions.push(definitions)
 */
var stepDefinitions = [
  vehicleInspectionStep.definition,
  accidentStep.definition,
  signatureStep.definition
];

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  // Enables passport auth service to be used
  require('./passport'),
  // Enables keycloak auth service to be used
  // require('./keycloak'),
  require('./services'),
  require('@raincatcher/angularjs-http'),
  require('ng-sortable'),
  // Commented until this modules will be migrated
  require('@raincatcher/angularjs-workorder')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/angularjs-workflow')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app",
    stepDefinitions: stepDefinitions
  }),
  require('@raincatcher-examples/angularjs-extensions'),
  vehicleInspectionStep.ngModule(),
  accidentStep.ngModule(),
  signatureStep.ngModule()
]);


// require('./keycloak');

require('./config');
