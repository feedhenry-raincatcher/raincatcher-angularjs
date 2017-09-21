const core = require('../../utils/api');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();
var authData = require('../../data/auth.do');
var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();
var WorkorderService = require('../../services/portal/workorder.so');
var workorderService = new WorkorderService();
var authData = require('../../data/auth.do');
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
  workflow: workflow.title,
  summary: 'test'
};

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
      workflowService.addStep(workflow, { name: 'vehicle1', type: 'Vehicle Inspection Step' });
      workflowService.addStep(workflow, { name: 'accident', type: 'Accident Report Form' });
      workflowService.addStep(workflow, { name: 'signature', type: 'Signature step' });
      workflowService.addStep(workflow, { name: 'vehicle2', type: 'Vehicle Inspection Step' });
    });

    xstep('Verify step panel is visible, name is correct and step definition is correct', function() {});

    xstep('Verify add new step panel is visible below created step, with no values', function() {});

    xstep('Verify if workflow is visible on the side panel', function() {});
  });

  describe('Create Workorder [Portal App]', function() {
    step('Create workorder', function() {
      workorderService.create(workorder);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
    });

    xstep('Verify test workorder details', function() {});

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
      mobileWorkflowService.setWorkflowDetails(50, 'pass', 'fail');
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete accident report step', function() {
      element(by.css('input[ng-model="ctrl.model.regNr"]')).sendKeys('testA');
      element(by.css('input[ng-model="ctrl.model.owner"]')).sendKeys('testB');
      element(by.css('input[ng-model="ctrl.model.phone"]')).sendKeys('testC');
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete signature step', function() {
      element(by.css('.signature-form canvas')).click();
      mobileWorkflowService.submitWorkflowDetails();
    });

    step('Complete second vehicle inspection step', function() {
      mobileWorkflowService.setWorkflowDetails(50, 'fail', 'pass');
      mobileWorkflowService.submitWorkflowDetails();
      browser.sleep(20000);
    });

    xstep('Select back button to go backwards', function() {});

    xstep('Check STEP DETAILS are visible in workorder and values are correct', function() {});

    xstep('Navigate to workorders page and selected COMPLETED WORKORDER from the list', function() {});

    xstep('Verify details have persisted', function() {});

    xstep('Verify that status icon is correct', function() {});
  });

  describe('Check Workorder Completetion [Portal App]', function() {
    step('Open workorder', function() {
      authService.openPortalApp();
      workorderService.open(workorder);
      browser.sleep(10000);
    });
  });
});