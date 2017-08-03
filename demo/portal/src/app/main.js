'use strict';

var angular = require('angular');
var logger = require('@raincatcher/logger');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./services'),
  require('@raincatcher/demo-wfm'),
  require('@raincatcher/demo-sync'),
  require('ng-sortable'),
  require('./feedhenry'),
  // Commented until this modules will be migrated
  require('@raincatcher/workorder-angular')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/workflow-angular')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app"
  })
]);

require('./config');
