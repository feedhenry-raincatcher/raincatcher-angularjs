'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./services'),
  require('./modules/sync'),
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
require('./initialisation');


