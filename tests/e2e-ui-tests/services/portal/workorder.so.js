var pageObject = require('../pages/workorder');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function WorkorderService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workorderForm;
  BaseService.call(this, pageObject);
}

utils.object.inherit(WorkorderService, BaseService);

/**
 * Clear specific fields on Item Form
 */
WorkorderService.prototype.clearOtherFields = function() {
  return Promise.all([
    // nwp.commands.clearStartDate(), // TODO
    // nwp.commands.clearStartTime(), // TODO
    nwp.commands.clearFinishDate(),
    nwp.commands.clearFinishTime()
  ]);
};

/**
 * Search workorder in workorders list
 * @param {*} workorder to be searched
 */
WorkorderService.prototype.searchForItem = function(workorder, count) {
  return pageObject.main.commands.search(workorder.title)
  .then(() => pageObject.main.commands.count())
  .then((c) => utils.expect.resultIsEquelTo(c, count));
};

/**
 * Check if all fields of Workorder Form are present
 */
WorkorderService.prototype.expectFieldsPresent = function() {
  return nwp.locators.workorderForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(nwp.locators.workorderForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expect.eachResultsIsTrue(results);
    return utils.promise.all(nwp.locators.workorderForm.dropdowns, x => x.isPresent());
  })
  .then((results) => { // dropdowns present
    utils.expect.eachResultsIsTrue(results);
    return utils.promise.all(nwp.locators.workorderForm.datetime, x => x.isPresent());
  })
  .then((results) => utils.expect.eachResultsIsTrue(results));
};

/**
 * Compare actual workorder details with expected
 * @param {*} workorder to be compared to
 */
WorkorderService.prototype.expectDetailsToBe = function(workorder) {
  return swp.commands.getDetails()
  .then((details) => {
    var status = swp.commands.getStatus(details);
    utils.expect.resultIsEquelTo(status.h3, workorder.status);
    var coordinates = swp.commands.getCoordinates(details, workorder.address);
    utils.expect.resultIsEquelTo(coordinates.h3, workorder.latitude+', '+workorder.longitude);
    var title = swp.commands.getTitle(details);
    utils.expect.resultIsEquelTo(title.h3, workorder.title);
    // var finishDate = swp.commands.getFinishDate(details); //  TODO check date format
    // utils.checkResultIsEquelTo(finishDate.h3, params.finishDate);
    var finishTime = swp.commands.getFinishTime(details);
    utils.expect.resultIsEquelTo(finishTime.h3.substring(0, 5), workorder.finishTime.substring(0, 5));
    var assignee = swp.commands.getAssignee(details);
    utils.expect.resultIsEquelTo(assignee.h3, workorder.assignee);
    return Promise.all([
      swp.commands.getWorkSummary()
      .then((summary) => utils.expect.resultIsEquelTo(summary, workorder.summary)),
      swp.commands.getWorkflow()
      .then((workflow) => utils.expect.resultIsEquelTo(workflow, 'Workflow: ' + workorder.workflow))
    ]);
  });
};

WorkorderService.prototype.expectElementInfo = function(workorder) {
  return swp.locators.workorderHeader.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return swp.locators.workorderHeader.getText();
  })
  .then((result) => utils.expect.resultIsEquelTo(result, 'Work order : ' + workorder.title));
};

WorkorderService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  expectFunc = expectFunc || _.noop;
  return promise
  .then((elem) => {
    return Promise.all([
      mwp.commands.getTitle(elem)
      .then((result) => expectFunc(result, expected.title)),
      mwp.commands.getAddress(elem)
      .then((result) => expectFunc(result, expected.address))
    ]);
  });
};

WorkorderService.prototype.clone = function(workorder, workflowId) {
  var cwor =_.clone(workorder); // + ' - ' +  workorder.workflow;
  cwor.workflow = workflowId;
  return cwor;
};

module.exports = WorkorderService;