'use strict';

var angular = require('angular');

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('ng-sortable'),
  require('./feedhenry')
  // Commented until this modules will be migrated
  // , require('@raincatcher/workorder-angular')({
  //   mode: "admin",
  //   listColumnViewId: "column2",
  //   mainColumnViewId: "content@app"
  // })
  // , require('@raincatcher/workflow-angular')({
  //   mode: "admin",
  //   listColumnViewId: "column2",
  //   mainColumnViewId: "content@app"
  // })
]);

require('./config');
