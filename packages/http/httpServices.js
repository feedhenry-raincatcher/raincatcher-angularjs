var config = require('./config.json');
var _ = require('lodash');

// Generating common data repositories
var HttpApiDataService = require("./httpDataRepository");

var datasets = config.datasetIds;
angular.module('wfm.http').service("workorderService", ['baseUrlService', '$http', function(baseUrlService, $http) {
  return new HttpApiDataService(datasets.workorders, baseUrlService, $http);
}]);
angular.module('wfm.http').service("workflowService", ['baseUrlService', '$http', function(baseUrlService, $http) {
  return new HttpApiDataService(datasets.workflows, baseUrlService, $http);
}]);
angular.module('wfm.http').service("resultService", ['baseUrlService', '$http', function(baseUrlService, $http) {
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
  return new ResultHttpService(datasets.results, $http);
}]);

