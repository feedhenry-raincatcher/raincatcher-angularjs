'use strict';

var angular = require('angular');
var logger = require('@raincatcher/logger');

var accidentStep = require('@raincatcher-examples/step-accident');
var vehicleInspectionStep = require('@raincatcher-examples/step-vehicle-inspection');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./passport'),
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
    stepDefinitions: [
      vehicleInspectionStep.definition,
      accidentStep.definition
    ]
  }),
  vehicleInspectionStep.ngModule(),
  accidentStep.ngModule()
]);


// require('./keycloak');

require('./config');
