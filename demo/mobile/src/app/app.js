'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  // Set of the data services
  require('./modules/user'),
  require('./modules/sync'),
  require('./services'),
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

require('./angularConfig');
