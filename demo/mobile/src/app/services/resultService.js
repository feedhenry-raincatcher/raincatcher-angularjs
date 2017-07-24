var Promise = require("bluebird");

function ResultService(resultManager) {
  this.resultManager = resultManager;
};

ResultService.prototype.listResults = function listResults() {
  return resultManager.listAsync();
};

/**
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
ResultService.prototype.resultMap = function () {
  return this.listResults()
    .then(function (results) {
      WorkorderApiService.prototype.map = {};
      results.forEach(function (result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module('wfm.common.apiservices').service("resultService", function () {
  return new ResultService();
});
