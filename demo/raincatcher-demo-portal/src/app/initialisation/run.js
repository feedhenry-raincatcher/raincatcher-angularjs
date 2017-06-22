var angular = require('angular');
var $fh = require('fh-js-sdk');

var workorderCoreModule = require('fh-wfm-workorder/lib/client');
var workflowCoreModule = require('fh-wfm-workflow/lib/client');
var resultCoreModule = require('fh-wfm-result/lib/client');
var fileCore = require('fh-wfm-file/lib/client');
var userCore = require('fh-wfm-user/lib/client');

/**
 * Script to subscribe to the `wfm:auth:profile:change` topic.
 *
 * This will check to see if a user is logging in or out.
 *
 * @param $state
 * @param mediator
 * @param syncPool
 * @constructor
 */
function subscribeToUserChange($state, mediator, syncPool) {
  mediator.subscribe('wfm:auth:profile:change', function(_profileData) {
    if (_profileData === null) { // a logout
      syncPool.removeManagers().then(function() {
        $state.go('app.login', undefined, {reload: true});
      }, function(err) {
        console.error(err);
      });
    } else {
      syncPool.syncManagerMap(_profileData)  // created managers will be cached
        .then(syncPool.forceSync)
        .then(function() {
          $state.go('app.schedule', undefined, {reload: true});
        });
    }
  });
}

/**
 *
 * Creating promises for any of the fh-wfm modules that require asynchronous initialisation
 *
 * @param $rootScope
 * @param $q
 * @param mediator
 * @param userClient
 * @constructor
 */
function createWFMInitialisationPromises($rootScope, $q, mediator, userClient) {
  var initPromises = [];
  var initListener = mediator.subscribe('promise:init', function(promise) {
    initPromises.push(promise);
  });

  mediator.publish('init');
  console.log(initPromises.length, 'init promises to resolve.');
  var all = (initPromises.length > 0) ? $q.all(initPromises) : $q.when(null);
  return all.then(function() {
    $rootScope.ready = true;
    console.log(initPromises.length, 'init promises resolved.');
    mediator.remove('promise:init', initListener.id);
    userClient.clearSession();

    return null;
  });
}


/**
 *
 * Registering listeners for state changes and errors
 *
 * @param $rootScope
 * @param $state
 * @param userClient
 * @constructor
 */
function verifyLoginOnStateChange($rootScope, $state, userClient) {

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams) {
    //Verifying that the logged in user has a session before showing any other screens but the login.
    if (toState.name !== "app.login") {
      userClient.hasSession().then(function(hasSession) {
        if (!hasSession) {
          e.preventDefault();
          $rootScope.toState = toState;
          $rootScope.toParams = toParams;
          $state.go('app.login');
        }
      });
    }
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error('State change error: ', error, {
      event: event,
      toState: toState,
      toParams: toParams,
      fromState: fromState,
      fromParams: fromParams,
      error: error
    });
    if (error['get stack']) {
      console.error(error['get stack']());
    }
    event.preventDefault();
  });
}

/**
 *
 * Initialising the core modules.
 *
 * @param {Mediator} mediator
 */
function initCoreModules(mediator) {
  workorderCoreModule(mediator);
  workflowCoreModule(mediator);
  resultCoreModule(mediator);
  fileCore(mediator,{},$fh);
  userCore(mediator);
}

angular.module('app')
  .run(["mediator", initCoreModules])
  .run(["$rootScope", "$q", "mediator", "userClient", createWFMInitialisationPromises])
  .run(["$state", "mediator", "syncPool", subscribeToUserChange])
  .run(["$rootScope", "$state", "userClient", verifyLoginOnStateChange]);