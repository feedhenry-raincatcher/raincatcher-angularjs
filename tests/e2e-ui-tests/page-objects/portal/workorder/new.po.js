var consts = require('../../../data/page_constants');
var utils = require('../../../utils');

var NewWorkorderPage = function() {
  var workorderFormSelector = 'form[name="workorderForm"]';
  var locators = {
    workorderForm: {
      self: element(by.css(workorderFormSelector)),
      fields: {
        title: element(by.css(workorderFormSelector + ' #inputTitle')),
        summary: element(by.css(workorderFormSelector + ' #inputSummary'))
      },
      dropdowns: {
        workflow: element(by.css(workorderFormSelector + ' #workflow'))
      },
      searchInputs: {
        assignee: element(by.css(workorderFormSelector + ' input[type="search"]'))
      },
      warnings: {
        workflow: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.workflow.$error"] div')),
        title: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.title.$error"] div')),
      },
      buttons: {
        create: element(by.css(workorderFormSelector + ' button[aria-label="Create Workorder"]')),
        update: element(by.css(workorderFormSelector + ' button[aria-label="Create Workorder"]')),
        cancel: element(by.css('workorder-form button[aria-label="Close"]'))
      }
    }
  };

  var commands = {

    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL_NEW);
    },
    selfCheck: function() {
      browser.getCurrentUrl().then(function(result) {
        expect(result).to.include(consts.workorders.portal.URL_NEW);
        return locators.workorderForm.self.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
      });
    },
    // enter data into page fields
    enterTitle: function(title) {
      return locators.workorderForm.fields.title.sendKeys(title);
    },
    enterAddress: function(address) {
      return locators.workorderForm.fields.address.sendKeys(address);
    },
    enterLatitute: function(latitude) {
      return locators.workorderForm.fields.latitude.sendKeys(latitude);
    },
    enterLongitude: function(longitude) {
      return locators.workorderForm.fields.longitude.sendKeys(longitude);
    },
    enterStartDate: function(finishDateEdit) {
      return locators.workorderForm.datetime.w.startDate.sendKeys(finishDateEdit);
    },
    enterStartTime: function(finishTime) {
      return locators.workorderForm.datetime.startTime.sendKeys(finishTime);
    },
    enterFinishDate: function(finishDateEdit) {
      return locators.workorderForm.datetime.finishDate.sendKeys(finishDateEdit);
    },
    enterFinishTime: function(finishTime) {
      return locators.workorderForm.datetime.finishTime.sendKeys(finishTime);
    },
    enterSummary: function(summary) {
      return locators.workorderForm.fields.summary.sendKeys(summary);
    },
    // clear DATE and TIME data
    clearStartDate() {
      locators.workorderForm.datetime.startDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearStartTime() {
      locators.workorderForm.datetime.startTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishDate() {
      locators.workorderForm.datetime.finishDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishTime() {
      locators.workorderForm.datetime.finishTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    checkWorkflowWarningMessage: function() {
      return locators.workorderForm.warnings.workflow.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.workflow.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.WORKFLOW_MISSING_MSG);
        });
      });
    },
    checkTitleWarningMessage: function() {
      return locators.workorderForm.warnings.title.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.title.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.TITLE_MISSING_MSG);
        });
      });
    },
    checkAddressWarningMessage: function() {
      return locators.workorderForm.warnings.address.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.address.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.ADDRESS_MISSING_MSG);
        });
      });
    },
    checkLatitudeWarningMessage: function() {
      return locators.workorderForm.warnings.latitude.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.latitude.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.LATITUDE_MISSING_MSG);
        });
      });
    },
    checkLongitudeWarningMessage: function() {
      return locators.workorderForm.warnings.longitude.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.longitude.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.LONGITUDE_MISSING_MSG);
        });
      });
    },
    checkFinishDateWarningMessage: function() {
      return locators.workorderForm.warnings.finishDate.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.finishDate.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.FINISH_DATE_MISSING_MSG);
        });
      });
    },
    checkFinishTimeWarningMessage: function() {
      return locators.workorderForm.warnings.finishTime.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.finishTime.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.FINISH_TIME_MISSING_MSG);
        });
      });
    },
    checkSummaryWarningMessage: function() {
      return locators.workorderForm.warnings.summary.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workorderForm.warnings.summary.getText().then(function(result) {
          utils.expect.resultIsEqualTo(result, consts.workorders.SUMMARY_MISSING_MSG);
        });
      });
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = NewWorkorderPage();