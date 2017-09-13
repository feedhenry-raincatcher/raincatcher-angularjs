var pageObject = require('../../page-objects/mobile/workorder');
var mainWorkorderPage = pageObject.main;
var selectedWorkorderPage = pageObject.selected;
var utils = require('../../utils');

/**
 *
 * @constructor
 */
function WorkorderService() {

}

WorkorderService.prototype.verifyNumberOfWorkordersInList = function(expectedNumber) {
  utils.check.listSize(mainWorkorderPage.locators.workordersListItems, expectedNumber);
};

WorkorderService.prototype.selectWorkorderFromTheListByIndex = function(index) {

};

WorkorderService.prototype.searchForWorkorderInList = function(workorderName) {
  utils.check.elementsArePresent([ mainWorkorderPage.locators.searchBox ]);
  mainWorkorderPage.commands.searchForWorkorderInList(workorderName);
};

WorkorderService.prototype.verifyWorkorderDetailsArePresentAndCorrect = function(params) {
  utils.check.elementsArePresent([
    selectedWorkorderPage.locators.detailsListItems
  ]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.id, params[0]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.status, params[1]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.coordinates, params[2]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.workorderName, params[3]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.startDate, params[4]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.startTime, params[5]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.finishDate, params[6]);
  utils.expect.resultIsEqualTo(selectedWorkorderPage.commands.get.finishTime, params[7]);
};

WorkorderService.prototype.verifyWorkorderWorkflowIsNotCompleted = function() {
  utils.check.elementsArePresent([ mainWorkorderPage.locators.beginWorkflowButton ]);
};

WorkorderService.prototype.beginWorkflow = function() {
  selectedWorkorderPage.commands.beginWorkflow();
};

WorkorderService.prototype.verifyCompletedWorkflowDetailsArePresent = function(params) {
  utils.check.elementsArePresent([ selectedWorkorderPage.locators ]);
};



module.exports = WorkorderService;