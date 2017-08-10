function DialogService($mdDialog) {
  this.mdDialog = $mdDialog;
}

DialogService.prototype.showAlert = function showAlert(alertContent) {
  return this.mdDialog.show(this.mdDialog.alert(alertContent));
};

DialogService.prototype.showConfirm = function showConfirm(confirmContent) {
  return this.mdDialog.show(this.mdDialog.confirm(confirmContent));
};

angular.module('wfm.util.dialog').service('dialogService', ['$mdDialog', function($mdDialog) {
  return new DialogService($mdDialog);
}]);
