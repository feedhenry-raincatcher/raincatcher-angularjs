'use strict';

var _ = require('lodash');

var workflowClient = require('./workflow-client');

module.exports = 'wfm.workflow.sync';

function wrapManager($q, $timeout, manager) {
  var wrappedManager = _.create(manager);
  wrappedManager.new = function() {
    var deferred = $q.defer();
    $timeout(function() {
      var workflow = {
        title: ''
      };
      deferred.resolve(workflow);
    }, 0);
    return deferred.promise;
  };

  return wrappedManager;
}

angular.module('wfm.workflow.sync', [])
.factory('workflowSync', function($q, $timeout, mediator) {
  var workflowSync = {};
  workflowSync.createManager = function() {
    if (workflowSync.manager) {
      return $q.when(workflowSync.manager);
    } else {
      workflowSync.manager = wrapManager($q, $timeout, workflowClient(mediator));

      return workflowSync.manager;
    }
  };
  workflowSync.removeManager = function() {
    if (workflowSync.manager) {
      return workflowSync.manager.safeStop()
      .then(function() {
        delete workflowSync.manager;
      });
    }
  };
  return workflowSync;
});
