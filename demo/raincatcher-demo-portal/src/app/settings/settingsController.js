


/**
 * Creating the confirmation dialog to reset all data.
 * @param $mdDialog
 * @param event
 * @returns {*}
 */
function getConfirmDialog($mdDialog, event) {
  return $mdDialog.confirm({
    title: 'Are you sure?',
    textContent: "Are you sure you want to reset ALL data? This is not reversible. Any data that has been created will be removed.",
    ariaLabel: 'Reset All Data',
    targetEvent: event,
    ok: 'Reset All Data',
    cancel: 'Cancel'
  });
}

/**
 * Creating the dialogue to alert the user that the reset has completed.
 * @param $mdDialog
 * @returns {*}
 */
function getCompleteAlert($mdDialog) {
  return $mdDialog.alert({
    title: 'Data Reset Complete',
    textContent: 'All data has been reset. Please log in again.',
    ok: 'Login'
  });
}

/**
 * Creating a dialog to alert the user that there was an error resetting the data.
 * @param $mdDialog
 * @param err
 * @returns {*}
 */
function getErrorAlert($mdDialog, err) {
  return $mdDialog.alert({
    title: 'Error Resetting Data',
    textContent: err && err.message ? err.message : "Unknown error",
    ok: 'Close'
  });
}


/**
 * Controller for the settings directive
 *
 * NOTE: DO NOT USE IN PRODUCTION. THIS IS FOR DEMO PURPOSES ONLY!
 *
 * @param DataResetService (WARNING: DO NOT USE IN PRODUCTION. THIS IS FOR DEMO PURPOSES ONLY! THIS SERVICE CAN REMOVE ALL DATA!)
 * @param $mdDialog
 * @param $state
 * @param userClient
 * @constructor
 */
function SettingsController(DataResetService, $mdDialog, $state, userClient) {
  var self = this;

  //Function executed to reset ALL data for the solution.
  self.resetData = function(event) {
    event.preventDefault();

    //The user must confirm before the request is made to delete the data.
    return $mdDialog.show(getConfirmDialog($mdDialog, event)).then(function() {

      //Resetting all data ((WARNING: DO NOT USE IN PRODUCTION. THIS IS FOR DEMO PURPOSES ONLY! THIS SERVICE CAN REMOVE ALL DATA!))
      return DataResetService.resetData().then(function() {
        //Alert the user that the reset is complete, the user must log in again as users would have been deleted as part of the reset.
        $mdDialog.show(getCompleteAlert($mdDialog)).then(function() {
          //Clearing the local user session data to force a login.
          userClient.clearSession().then(function() {
            $state.go('app.login');
          });
        });
      }).catch(function(err) {
        //There was an error resetting the date. Alert the user and allow them to try again.
        $mdDialog.show(getErrorAlert($mdDialog, err));
      });
    });
  };

}


angular.module('app.settings').controller('SettingsController', ['DataResetService', '$mdDialog', '$state', 'userClient', SettingsController]);