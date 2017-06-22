var angular = require('angular');
var should = require('should');
var sinon = require('sinon');
require('sinon-as-promised');
require('angular-mocks');


describe("Settings Module", function() {

  before(function() {
    angular.module('app.settings', []);
  });

  describe("Settings Service", function() {

    var DataResetService;
    var $fh;

    beforeEach(function() {
      angular.mock.module('app.settings', function($provide) {
        //Providing the $fh mock service to test the cloud calls.
        $provide.service('$fh', function() {
          return {};
        });
      });
    });

    before(function() {
      require('./dataResetService');
    });

    beforeEach(inject(function(_DataResetService_, _$fh_) {
      DataResetService = _DataResetService_;
      $fh = _$fh_;
    }));


    /**
     * Checking that the $fh.cloud call was called with the core
     */
    function checkCloudCallArguments() {
      sinon.assert.calledOnce($fh.cloud);
      sinon.assert.calledWith($fh.cloud, sinon.match({
        path: sinon.match('/admin/data'),
        method: sinon.match('delete'),
        contentType: sinon.match('application/json')
      }), sinon.match.func, sinon.match.func);
    }

    it("It should call $fh.cloud to reset the data", function(done) {
      $fh.cloud = sinon.stub().yields();

      DataResetService.resetData().then(function() {
        checkCloudCallArguments();
        done();
      }).catch(done);
    });

    it("It should return an error if the reset failed", function(done) {
      var errorMessage = "Error resetting data";
      $fh.cloud = sinon.stub().callsArgWith(2, errorMessage);

      DataResetService.resetData().then(function() {
        done("Should not have succeeded.");
      }).catch(function(err) {
        checkCloudCallArguments();

        should(err.message).equal(errorMessage);
        done();
      });
    });
  });
});

