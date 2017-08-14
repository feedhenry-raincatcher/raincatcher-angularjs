var _ = require('lodash');

// Generating common data repositories
var HttpApiDataService = require("./httpDataService");

var datasets = {
  workorders: "workorders",
  workflows: "workflows",
  results: "results"
};
angular.module('wfm.common.apiservices').service("workorderService", ['baseUrl', '$http', function(baseUrlPromise, $http) {
  return new HttpApiDataService(datasets.workorders, baseUrlPromise, $http);
}]);
angular.module('wfm.common.apiservices').service("workflowService", ['baseUrl', '$http', function(baseUrlService, $http) {
  return new HttpApiDataService(datasets.workflows, baseUrlService, $http);
}]);
angular.module('wfm.common.apiservices').service("resultService", ['baseUrl', '$http', function(baseUrlService, $http) {
  var ResultHttpService = function() {
    HttpApiDataService.apply(this, arguments);
  };
  ResultHttpService.prototype = _.create(HttpApiDataService.prototype, {
    'constructor': ResultHttpService,
    readByWorkorder: function(workorderId) {
      return this.list()
        .then(function(results) {
          if (_.isEmpty(results)) {
            return;
          }
          return _.find(results, function(result) {
            return result.workorderId === workorderId;
          });
        });
    }
  });
  return new ResultHttpService(datasets.results, baseUrlService, $http);
}]);

