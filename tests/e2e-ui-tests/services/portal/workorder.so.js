var pageObject = require('../../page-objects/portal/workorder');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../../utils');
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
    // nwp.commands.clearFinishDate(),
    // nwp.commands.clearFinishTime()
  ]);
};

/**
 * Search workorder in workorders list
 * @param {*} workorder to be searched
 */
WorkorderService.prototype.searchForItem = function(workorder, count) {
  return pageObject.main.commands.search(workorder.title)
  .then(() => browser.sleep(1000))
  .then(() => pageObject.main.commands.count())
  .then((c) => utils.expect.resultIsEqualTo(c, count));
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
    utils.expect.eachResultToBeTrue(results);
    return utils.promise.all(nwp.locators.workorderForm.dropdowns, x => x.isPresent());
  })
  .then((results) => { // dropdowns present
    utils.expect.eachResultToBeTrue(results);
  });
};

/**
 * Compare actual workorder details with expected
 * @param {*} workorder to be compared to
 */
WorkorderService.prototype.expectDetailsToBe = function(workorder) {
  return swp.commands.getDetails()
  .then((details) => {
    var status = swp.commands.getStatus(details);
    utils.expect.resultIsEqualTo(status.h3, workorder.status);
    var title = swp.commands.getTitle(details);
    utils.expect.resultIsEqualTo(title.h3, workorder.title);
    return Promise.all([
      swp.commands.getWorkflow()
      .then((workflow) => utils.expect.resultIsEqualTo(workflow, workorder.workflow))
    ]);
  });
};

WorkorderService.prototype.expectElementInfo = function(workorder) {
  return swp.locators.workorderHeader.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return swp.locators.workorderHeader.getText();
  })
  .then((result) => utils.expect.resultIsEqualTo(result, 'Work Order : ' + workorder.title));
};

WorkorderService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  expectFunc = expectFunc || _.noop;
  return promise
  .then((elem) => {
    return Promise.all([
      mwp.commands.getTitle(elem)
      .then((result) => expectFunc(result, expected.title))
    ]);
  });
};

WorkorderService.prototype.clone = function(workorder, workflowId) {
  var cwor =_.clone(workorder); // + ' - ' +  workorder.workflow;
  cwor.workflow = workflowId;
  return cwor;
};

WorkorderService.prototype.expectSteps = function(steps) {
  steps.forEach((step, index) => {
    switch (step.type) {
    case 'Vehicle Inspection Step':
      element(by.css(`workorder-result:nth-of-type(${index + 1}) md-list-item:nth-of-type(2) h3`))
        .getText()
        .then(result => expect(result).to.equal(step.tires));
      element(by.css(`workorder-result:nth-of-type(${index + 1}) md-list-item:nth-of-type(3) h3`))
        .getText()
        .then(result => expect(result).to.equal(step.lights));
      break;
    case 'Accident Report Form':
      element(by.css(`workorder-result:nth-of-type(${index + 1}) md-list-item:nth-of-type(1) h3`))
        .getText()
        .then(result => expect(result).to.equal(step.number));
      element(by.css(`workorder-result:nth-of-type(${index + 1}) md-list-item:nth-of-type(2) h3`))
        .getText()
        .then(result => expect(result).to.equal(step.owner));
      element(by.css(`workorder-result:nth-of-type(${index + 1}) md-list-item:nth-of-type(3) h3`))
        .getText()
        .then(result => expect(result).to.equal(step.phone));
      break;
    }
  });
};

module.exports = WorkorderService;