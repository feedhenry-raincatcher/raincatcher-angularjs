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
    return Promise.resolve(self.$http(httpConfig)).then(function(response) {
      if (response.status !== 200) {
        console.error('Non-OK response with status ' + response.status);
        console.error(response);
        throw new Error(response);
      }
      return response.data;
    });
  }).catch(function(error) {
    error = new Error(error);
    console.error(error);
    throw error;
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

module.exports = HttpDataService;

