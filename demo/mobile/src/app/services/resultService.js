var Promise = require("bluebird");

function ResultService() {
}

ResultService.prototype.listResults = function listResults() {
  return Promise.resolve([]);
};

/**
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
ResultService.prototype.resultMap = function() {
  return this.listResults()
    .then(function(results) {
      var map = {};
      results.forEach(function(result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module('wfm.common.apiservices').service("resultService", function() {
  return new ResultService();
});
