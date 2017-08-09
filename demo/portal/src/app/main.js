'use strict';

var angular = require('angular');
var logger = require('@raincatcher/logger');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('@raincatcher/angularjs-auth-passport')('app'),
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
    stepDefinitions: require("./wfm.json").stepDefinitions
  })
]);

// require('./keycloak');
require('./config');
