'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./modules/sync/syncService'),
  require('./services'),
  // Set of the data services
  require('@raincatcher/workflow-angular')({
    mode: "user",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/workorder-angular')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  })
]);
require('./initialisation');


