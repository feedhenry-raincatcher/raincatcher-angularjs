var angular = require('angular');
var sinon = require('sinon');
require('sinon-as-promised');
require('angular-mocks');


describe("Settings Controller", function() {

  var DataResetService, $mdDialog, $state, userClient, SettingsController;

  before(function() {
    angular.module('app.settings', []);
  });

  before(function() {
    require('./settingsController');
  });

  var mockConfirmDialog = {
    type: "mockConfirm"
  };

  var mockLogoutDialog = {
    type: "mockLogout"
  };

  var mockErrorDialog = {
    type: "error"
  };

  var mockAlertDialog;

  beforeEach(function() {

    mockAlertDialog = sinon.stub();

    mockAlertDialog.withArgs(sinon.match({
      title: sinon.match('Error Resetting Data')
    })).returns(mockErrorDialog);

    mockAlertDialog.withArgs(sinon.match({
      title: sinon.match('Data Reset Complete')
    })).returns(mockLogoutDialog);

    mockAlertDialog.returns(null);

    angular.mock.module('app.settings', function($provide) {
      //Providing the DataResetService mock service
      $provide.service('DataResetService', function() {
        return {
          resetData: sinon.stub().resolves()
        };
      });

      $provide.service('$mdDialog', function() {
        return {
          confirm: sinon.stub().returns(mockConfirmDialog),
          alert: mockAlertDialog,
          show: sinon.stub().resolves()
        };
      });

      $provide.service('$state', function() {
        return {
          go: sinon.spy()
        };
      });

      $provide.service('userClient', function() {
        return {
          clearSession: sinon.stub().resolves()
        };
      });

    });
  });

  describe("Resetting Data ", function() {

    beforeEach(inject(function(_DataResetService_, _$mdDialog_, _$state_, _userClient_, $controller, $rootScope) {
      DataResetService = _DataResetService_;
      $mdDialog = _$mdDialog_;
      $state = _$state_;
      userClient = _userClient_;
      SettingsController = $controller('SettingsController', {
        $scope: $rootScope.$new()
      });
    }));

    it("It should reset data after confirmation", function(done) {
      var mockEvent = {
        preventDefault: sinon.spy()
      };

      SettingsController.resetData(mockEvent).then(function() {
        sinon.assert.calledOnce(mockEvent.preventDefault);
        sinon.assert.calledOnce($mdDialog.confirm);

        sinon.assert.calledOnce(mockAlertDialog);
        sinon.assert.calledWith(mockAlertDialog, sinon.match({
          title: 'Data Reset Complete'
        }));

        sinon.assert.calledTwice($mdDialog.show);
        sinon.assert.calledWith($mdDialog.show, mockConfirmDialog);
        sinon.assert.calledWith($mdDialog.show, mockLogoutDialog);

        sinon.assert.calledOnce(DataResetService.resetData);

        sinon.assert.calledOnce(userClient.clearSession);

        sinon.assert.calledOnce($state.go);

        done();
      });
    });


  });

});