var Promise = require('bluebird');
function HttpDataService(entityName, baseUrlPromise, $http) {
  this.entityName = entityName;
  this.baseUrlPromise = baseUrlPromise;
  this.$http = $http;
}

HttpDataService.prototype.request = function(relativeUrl, httpConfig) {
  var self = this;
  return this.baseUrlPromise.then(function(baseUrl) {
    httpConfig.url = baseUrl + relativeUrl;
    return new Promise(function(resolve, reject) {
      self.$http(httpConfig).then(function successCallback(response) {
        if (response.status !== 200) {
          console.error(response);
          return reject(new Error("Network request failed with invalid status", response.status));
        }
        return resolve(response.data);
      }, function errorCallback(error) {
        console.error(error);
        error = new Error(error);
        return reject(error);
      });
    });
  });
};

HttpDataService.prototype.list = function() {
  return this.request('/' + this.entityName, {
    method: 'GET',
    params: {
      size: '100'
    }
  }).then(function(response) {
    // Extract data from paginated response
    return response.data;
  });
};

HttpDataService.prototype.read = function(objectId) {
  if (!objectId) {
    return Promise.reject(new Error('Need to supply objectId'));
  }
  return this.request('/' + this.entityName + '/' + objectId, {
    method: 'GET'
  });
};

HttpDataService.prototype.create = function(data) {
  return this.request('/' + this.entityName, {
    method: 'POST',
    data: data
  });
};

HttpDataService.prototype.update = function(data) {
  return this.request('/' + this.entityName + '/' + data.id, {
    method: 'PUT',
    data: data
  });
};

HttpDataService.prototype.remove = function(data) {
  return this.request('/' + this.entityName + '/' + data.id, {
    method: 'DELETE'
  });
};

HttpDataService.prototype.search = function(filter) {
  return this.request('/' + this.entityName + '/search', {
    method: 'GET',
    params: {
      size: '25',
      filter: filter
    }
  }).then(function(response) {
    return response.data;
  });
};

module.exports = HttpDataService;

