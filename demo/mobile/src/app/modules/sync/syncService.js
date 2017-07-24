

angular.module('wfm.sync',[]).service('syncService', ['syncPool' , 'userService', function (syncPool, userService) {
  return userService.getProfile()
    .then(syncPool.syncManagerMap);
}]);

module.exports = 'wfm.sync';
