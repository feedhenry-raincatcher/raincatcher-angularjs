const core = require('../../utils/api');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();
var authData = require('../../data/auth.do');
var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();
var WorkorderService = require('../../services/portal/workorder.so');
var workorderService = new WorkorderService();
var MobileAuthService = require('../../services/mobile/auth.so');
var mobileAuthService = new MobileAuthService();
var MobileWorkorderService = require('../../services/mobile/workorder.so');
var mobileWorkorderService = new MobileWorkorderService();
var MobileWorkflowService = require('../../services/mobile/workflow.so');
var mobileWorkflowService = new MobileWorkflowService();

const prefix = 'test-';
const workflow = { title: prefix + 'workflow' };
const workorder = {
  title: prefix + 'workorder',
  assignee: authData.users.TREVER.fullName,
  workflow: workflow.title + ' v5',
  summary: 'test',
  status: 'New'
};
const steps = [
  { name: 'vehicle1', type: 'Vehicle Inspection Step', tires: 'Fail', lights: 'Pass' },
  { name: 'accident', type: 'Accident Report Form', number: 'testA', owner: 'testB', phone: 'testC' },
  { name: 'signature', type: 'Signature step' },
  { name: 'vehicle2', type: 'Vehicle Inspection Step', tires: 'Pass', lights: 'Fail' }
];

describe('Verify WFM workflow and workorder functionality', function() {
  before('Cleanup', function() {
    return core.auth.login(authData.users.DAISY.username, authData.password.DEFAULT_PASSWORD)
      .then(() => core.cleanup(prefix));
  });

  describe('Workflow With Step [Portal app]', function() {
    step('Login to portal', function() {
      browser.ignoreSynchronization = true;
      authService.openPortalApp();
      authService.loginToPortalApp(authData.users.DAISY.username, authData.password.DEFAULT_PASSWORD);
      authService.verifySuccessfulLogin();
    });

    step('Create workflow', function() {
      browser.ignoreSynchronization = false;
      workflowService.create(workflow);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
    });

    step('Add steps', function() {
      steps.forEach(step =>
        workflowService.addStep(workflow, step)
      );
    });

    step('Verify step panel is visible, name is correct and step definition is correct', function() {
      steps.forEach((step, index) =>
        workflowService.expectStepToBe(index + 1, step)
      );
    });

    step('Verify add new step panel is visible below created step, with no values', function() {
      workflowService.expectAddStepPresent();
    });

    xstep('Verify if workflow is visible on the side panel', function() {});
  });

  describe('Create Workorder [Portal App]', function() {
    step('Create workorder', function() {
      workorderService.create(workorder);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
    });

    step('Verify test workorder details', function() {
      workorderService.expectDetailsToBe(workorder);
    });

    xstep('Verify test workorder is in the list', function() {});
  });

  describe('Complete Workorder [Mobile App]', function() {
    step('Login to mobile app', function() {
      mobileAuthService.openMobileApp();
      browser.driver.executeScript(function() {
        sessionStorage.clear();
        localStorage.clear();
      });
      mobileAuthService.openMobileApp();
      mobileAuthService.verifyLoginPageIsVisible();
      mobileAuthService.loginToMobileApp(authData.users.TREVER.username,
        authData.password.DEFAULT_PASSWORD);
      mobileAuthService.verifySuccessfulLogin();
    });

    step('Select workorder from the list', function() {
      browser.sleep(20000);
      mobileWorkorderService.selectWorkorderFromTheList(workorder.title);
    });

    step('Begin workflow', function() {
      mobileWorkorderService.beginWorkflow();
    });

    step('Complete first vehicle inspection step', function() {
      mobileWorkflowService.setWorkflowDetails(50, 'fail', 'pass');
      browser.sleep(5000);
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete accident report step', function() {
      element(by.css('input[ng-model="ctrl.model.regNr"]')).sendKeys(steps[1].number);
      element(by.css('input[ng-model="ctrl.model.owner"]')).sendKeys(steps[1].owner);
      element(by.css('input[ng-model="ctrl.model.phone"]')).sendKeys(steps[1].phone);
      browser.sleep(5000);
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete signature step', function() {
      element(by.css('.signature-form canvas')).click();
      browser.sleep(5000);
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Select back button to go backwards', function() {
      mobileWorkflowService.goBack();
      browser.sleep(5000);
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete second vehicle inspection step', function() {
      mobileWorkflowService.setWorkflowDetails(50, 'pass', 'fail');
      browser.sleep(5000);
      mobileWorkflowService.submitWorkflowDetails();
      browser.sleep(20000);
    });

    step('Check STEP DETAILS are visible in workorder and values are correct', function() {
      steps.forEach((step, index) =>
        mobileWorkflowService.checkCompletedWorkflowStep(index, step)
      );
    });

    step('Navigate to workorders page and selected COMPLETED WORKORDER from the list', function() {
      element(by.css('md-sidenav md-list-item:nth-of-type(1) button')).click();
      mobileWorkorderService.selectWorkorderFromTheList(workorder.title);
    });

    step('Verify details have persisted', function() {
      steps.forEach((step, index) =>
        mobileWorkflowService.checkCompletedWorkflowStep(index, step)
      );
    });

    step('Verify that status icon is correct', function() {
      mobileWorkorderService.verifyWorkorderWorkflowIsCompleted();
    });
  });

  describe('Check Workorder Completetion [Portal App]', function() {
    step('Open workorder', function() {
      authService.openPortalApp();
      workorderService.open(workorder);
      browser.sleep(10000);
    });

    step('Verfiy details are present and correct and include all steps results', function() {
      workorderService.expectSteps(steps);
    });
  });
});