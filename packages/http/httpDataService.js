// Service that is being injected to modules to provide all operations around sync
function HttpDataService(entityName, baseUrlPromise, $http) {
  this.entityName = entityName
  this.baseUrlPromise = baseUrlPromise;
  this.$http = $http;
}

HttpDataService.prototype.request = function(relativeUrl, httpConfig) {
  return this.baseUrlPromise.then(function(baseUrl) {
    httpConfig.url = baseUrl + relativeUrl;
    return this.$http(httpConfig);
  });
};

HttpDataService.prototype.list = function() {
  return this.request('/' + this.entityName, {
    method: 'GET'
  });
};

HttpDataService.prototype.read = function(objectId) {
  return this.request('/' + this.entityName + '/' + objectId, {
    method: 'GET'
  });
};

HttpDataService.prototype.create = function(data) {
  return this.request('/' + this.entityName + '/' + data.id, {
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

