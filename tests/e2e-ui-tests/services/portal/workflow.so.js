var pageObject = require('../../page-objects/portal/workflow');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../../utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function WorkflowService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workflowForm;
  BaseService.call(this, pageObject);
}

utils.object.inherit(WorkflowService, BaseService);

/**
 * Clear specific fields on Workflow Form
 */
WorkflowService.prototype.clearOtherFields = _.noop;
/**
 * Search workflow in workflows list
 * @param {*} workflow to be searched
 */
WorkflowService.prototype.searchForItem = function(workflow, count) {
  return mwp.commands.search(workflow.title)
  .then(() => mwp.commands.count())
  .then((c) => utils.expect.resultIsEqualTo(c, count));
};
/**
 * Get Workflow Id from selected workflow page
 * @param {*} workflow to get id
 */
WorkflowService.prototype.getWorkflowId = function(workflow) {
  var wid;
  var condition = function(locator, timeout) {
    timeout = timeout || 10000;
    return browser.wait(function() {
      return locator.getAttribute('href').then(value => {
        var id = _.split(value, '/')[7]; // TODO find workflow id more easier
        wid = _.trim(id);
        return _.size(wid) !== 0;
      });
    }, timeout);
  };
  return this.open(workflow)
  .then(() => new Promise(resolve => setTimeout(resolve, 3000))) // TODO better handle this wait
  .then(function() {
    utils.wait.until(swp.locators.workflowEditLink, 5000, condition);
  })
  .then(() => wid);
};
/**
 * Check if all fields of Workflow Form are present
 */
WorkflowService.prototype.expectFieldsPresent = function() {
  return nwp.locators.workflowForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(nwp.locators.workflowForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expect.eachResultToBeTrue(results);
    return utils.promise.all(nwp.locators.workflowForm.dropdowns, x => x.isPresent());
  })
  .then((results) => utils.expect.eachResultToBeTrue(results));
};

/**
 * Compare actual workflow details with expected
 * @param {*} workflow to be compared to
 */
WorkflowService.prototype.expectDetailsToBe = function(workflow) { // TODO implement
  return swp.locators.workflowHeader.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  })
  .then((result) => {
    utils.expect.resultIsEqualTo(result, workflow.title);
    return swp.locators.stepForm.self.isPresent();
  })
  .then((result) => utils.expect.resultIsTrue(result));
};

WorkflowService.prototype.expectElementInfo = function(workflow) {
  return swp.locators.workflowHeader.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  })
  .then((result) => utils.expect.resultIsEqualTo(result, workflow.title));
};

WorkflowService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  return promise.then((elem) => mwp.commands.getTitle(elem))
  .then((result) => expectFunc(result, expected.title));
};

WorkflowService.prototype.addStep = function(workflow, step, dummyParams) {
  dummyParams = dummyParams || false;
  return this.open(workflow)
  .then(() => swp.locators.stepForm.self.isPresent())
  .then((result) => utils.expect.resultIsTrue(result))
  .then(() => {
    if (!dummyParams && swp.locators.stepForm.dropdowns) {
      // utils.ui.sendKeysPromise(swp.locators.stepForm.dropdowns, step);
    }
  })
  .then(() => {
    if (!dummyParams && swp.locators.stepForm.fields) {
      utils.ui.sendKeysPromise(swp.locators.stepForm.fields, step);
    }
  })
  .then(() => swp.locators.stepForm.buttons.add.click());
};

WorkflowService.prototype.updateStep = function(workflow, toUpdate, updatee) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((result) => {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toUpdate.name);
    });
  })
  .then((idx) => swp.locators.workflowSteps.get(idx))
  .then((el) => el.element(by.css('md-card-actions>a[aria-label="Edit Step"]')).click())
  .then(() => utils.promise.all(swp.locators.stepForm.fields, x => x.clear()))
  .then((results) => utils.expect.eachResultToBeNull(results))
  .then(() => utils.ui.sendKeysPromise(swp.locators.stepForm.fields, updatee))
  .then(() => swp.locators.stepForm.buttons.update.click());
};

WorkflowService.prototype.removeStep = function(workflow, toDelete) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((result) => {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toDelete.name);
    });
  })
  .then((idx) => swp.locators.workflowSteps.get(idx))
  .then((el) => el.element(by.css('md-card-actions>button[aria-label="Delete Step"')).click())
  .then(() => utils.ui.clickButtonPromise(mwp.locators.proceedButton));
};

WorkflowService.prototype.expectStepWarningsPresent = function() {
  return swp.locators.stepForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(swp.locators.stepForm.warnings, x => x.isPresent());
  })
  .then((results) => utils.expect.eachResultToBeTrue(results));
};

WorkflowService.prototype.expectStepDetailsToBe = function(workflow, expected) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((details) => {
    var idx = details.findIndex(function(step) {
      return _.endsWith(step.h2, expected.name);
    });
    return {details, idx};
  })
  .then((result) => {
    var stepCode = swp.commands.getStepCode(result.details, result.idx);
    utils.expect.resultIsEqualTo(stepCode.h3, expected.code);
    var viewTemplate = swp.commands.getViewTemplate(result.details, result.idx);
    utils.expect.resultIsEqualTo(viewTemplate.h3, expected.view);
    // var formId = swp.commands.getFormId(result.details, result.idx); // TODO
    // utils.expect.resultIsEqualTo(formId.h3, expected.formId);
    var formTemplate = swp.commands.getFormTemplate(result.details, result.idx);
    utils.expect.resultIsEqualTo(formTemplate.h3, expected.form);
  });
};

module.exports = WorkflowService;