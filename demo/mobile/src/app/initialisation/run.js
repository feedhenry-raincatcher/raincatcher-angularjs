/**
 * Monitoring for changes in the logged in user.
 *
 * @param $rootScope
 * @param $state
 * @param syncPool
 */
function onLogout($state, syncPool) {
  isAuthenticated = false;
  syncPool.removeManagers().then(function() {
    $state.go('app.login', undefined, { reload: true });
  }, function(err) {
    console.error(err);
  });
}

function onLogin($rootScope, $state, syncPool) {
  syncPool.syncManagerMap(_profileData)  // created managers will be cached
    .then(syncPool.forceSync)
    .then(function() {
      if ($rootScope.toState) {
        $state.go($rootScope.toState, $rootScope.toParams, { reload: true });
        delete $rootScope.toState;
        delete $rootScope.toParams;
      } else {
        $state.go('app.workorder', undefined, { reload: true });
      }
    });
}

function monitorUserProfileChange($rootScope, $state, syncPool) {
  // TODO connect security and interact with methods above
}

//angular.module('wfm-mobile').run(['$rootScope', '$state', 'syncPool', monitorUserProfileChange]);
