var Promise = require('bluebird');
var noop = function() { };
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function HttpDataService(entityName, baseUrlPromise, $http) {
  EventEmitter.call(this);
  this.entityName = entityName;
  this.baseUrlPromise = baseUrlPromise;
  this.$http = $http;

  this.handlers = {
    'beforeCreate': noop,
    'beforeUpdate': noop,
    'beforeRemove': function() {
      return true;
    },
  };
}

util.inherits(HttpDataService, EventEmitter);

HttpDataService.prototype.request = function(relativeUrl, httpConfig) {
  var self = this;
  return this.baseUrlPromise.then(function(baseUrl) {
    httpConfig.url = baseUrl + relativeUrl;
    return new Promise(function(resolve, reject) {
      self.$http(httpConfig).then(function successCallback(response) {
        // Consider all 2xx responses correct
        if ((response.status + '')[0] !== '2') {
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
      size: '25'
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
  this.handlers.beforeCreate(data);
  return this.request('/' + this.entityName, {
    method: 'POST',
    data: data
  }).tap(this.triggerEvent('create'));
};

HttpDataService.prototype.update = function(data) {
  this.handlers.beforeUpdate(data);
  return this.request('/' + this.entityName + '/' + data.id, {
    method: 'PUT',
    data: data
  }).tap(this.triggerEvent('update'));
};

HttpDataService.prototype.remove = function(data) {
  var self = this;
  if (!this.handlers.beforeRemove(data)) {
    console.info('Remove operation cancelled due to beforeRemove hook');
    return;
  }
  return this.request('/' + this.entityName + '/' + data.id, {
    method: 'DELETE'
  }).tap(function() {
    // trigger event manually since DELETE responds with no data
    self.emit('remove', data);
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

/**
 * Provides a function that is called before creating a new data item, it can modify it before the operation is commited
 */
HttpDataService.prototype.onBeforeCreate = function(cb) {
  this.handlers.beforeCreate = cb;
};

/**
 * Provides a function that is called before updating the data, it can modify it before the operation is commited
 */
HttpDataService.prototype.onBeforeUpdate = function(cb) {
  this.handlers.beforeUpdate = cb;
};

/**
 * Provides a function that is called before removing a data item, it can prevent the operation by returning a falsey value
 */
HttpDataService.prototype.onBeforeRemove = function(cb) {
  this.handlers.beforeRemove = cb;
};

HttpDataService.prototype.triggerEvent = function(eventName) {
  var self = this;
  return function(data) {
    self.emit(eventName, data);
  };
};

module.exports = HttpDataService;

