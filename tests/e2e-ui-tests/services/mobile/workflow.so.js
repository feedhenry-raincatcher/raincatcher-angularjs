var pageObject = require('../../page-objects/mobile/workflow');
var completedWorkflowPage = pageObject.completed;
var mainWorkflowPage = pageObject.main;
var utils = require('../../utils');
var pageConstants = require('../../data/page_constants');


/**
 *
 * @constructor
 */
function WorkflowService() {

}

/**
 *
 */
WorkflowService.prototype.verifyWorkflowFormIsVisible = function() {
  utils.check.elementsArePresent([
    mainWorkflowPage.locators.slider,
    mainWorkflowPage.locators.radioButtons.tires.fail,
    mainWorkflowPage.locators.radioButtons.tires.pass,
    mainWorkflowPage.locators.radioButtons.lights.fail,
    mainWorkflowPage.locators.radioButtons.lights.pass,
    mainWorkflowPage.locators.buttons.back,
    mainWorkflowPage.locators.buttons.continue
  ]);
};

/**
 * Used to set the values of the sections on the open workflow details screen
 *
 * @param fuelPercentage
 * @param tires
 * @param lights
 */
WorkflowService.prototype.setWorkflowDetails = function(fuelPercentage, tires, lights) {
  mainWorkflowPage.commands.dragSlider(fuelPercentage);
  if (tires === "pass") {
    mainWorkflowPage.commands.click.tires.passButton();
  } else {
    mainWorkflowPage.commands.click.tires.failButton();
  }
  if (lights === "pass") {
    mainWorkflowPage.commands.click.lights.passButton();
  } else {
    mainWorkflowPage.commands.click.lights.failButton();
  }
};

/**
 * Used to complete an entry to a workflow
 */
WorkflowService.prototype.submitWorkflowDetails = function() {
  mainWorkflowPage.commands.click.button.continue();
};

/**
 * Used to cancel an changes to be submited to a workflow of a workorder
 */
WorkflowService.prototype.cancelWorkflowChanges = function() {
  mainWorkflowPage.commands.click.button.back();
};

/**
 * Used to check the details of a completed workflow
 *
 * @param heading
 * @param fuel
 * @param tires
 * @param lights
 */
WorkflowService.prototype.checkWorkflowDetails = function(heading, tires, lights) {
  utils.check.elementsArePresent([
    completedWorkflowPage.locators.workflowHeader,
    completedWorkflowPage.locators.completedWorkflowListItems
  ]);
  utils.expect.resultIsEqualTo(completedWorkflowPage.commands.get.tiresValue(), tires);
  utils.expect.resultIsEqualTo(completedWorkflowPage.commands.get.lightsValue(), lights);
};

WorkflowService.prototype.goBack = function() {
  mainWorkflowPage.locators.buttons.back.click();
};

WorkflowService.prototype.checkCompletedWorkflowStep = function(stepNumber, step) {
  const stepDetails = element.all(by.css('[ng-repeat="result in ctrl.results"]')).get(stepNumber);
  switch (step.type) {
  case 'Vehicle Inspection Step':
    stepDetails.element(by.css('md-list-item:nth-of-type(2) h3')).getText()
      .then(result => expect(result).to.equal(step.tires));
    stepDetails.element(by.css('md-list-item:nth-of-type(3) h3')).getText()
      .then(result => expect(result).to.equal(step.lights));
    break;
  case 'Accident Report Form':
    stepDetails.element(by.css('md-list-item:nth-of-type(1) h3')).getText()
      .then(result => expect(result).to.equal(step.number));
    stepDetails.element(by.css('md-list-item:nth-of-type(2) h3')).getText()
      .then(result => expect(result).to.equal(step.owner));
    stepDetails.element(by.css('md-list-item:nth-of-type(3) h3')).getText()
      .then(result => expect(result).to.equal(step.phone));
    break;
  }
};

module.exports = WorkflowService;
