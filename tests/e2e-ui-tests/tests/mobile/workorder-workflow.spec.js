var authData = require('../../data/auth.do');
var workorderData = require('../../data/workorders.do');
var AuthService = require('../../services/mobile/auth.so');
var authService = new AuthService();
var WorkorderService = require('../../services/mobile/workorder.so');
var workorderService = new WorkorderService();
var WorkflowService = require('../../services/mobile/workflow.so');
var workflowService = new WorkflowService();
var core = require('../../utils/api');

const prefix = 'test-';
const workflowTitle = prefix + 'workflow';
const workorderTitle = prefix + 'workorder';
const vehicleStepTitle = prefix + 'vehicle';

describe('Mobile Workorders and Workflow E2E', function() {
  before('Cleanup', function() {
    return core.auth.login(authData.users.DAISY.username, authData.password.DEFAULT_PASSWORD)
      .then(() => core.cleanup(prefix));
  });

  describe(authData.users.TREVER.username + ' can complete workorder', function() {
    let workorder;

    before('Prepare workorder and workflow', function() {
      let workflow;
      return core.workflows.create(workflowTitle)
        .then(wf => {
          workflow = wf;
          return core.workflows.addStep(vehicleStepTitle, 'vehicleInspection', wf.id)
        })
        .then(() => core.users.filter(authData.users.TREVER.username))
        .then(u => core.workorders.create(workorderTitle, u.users[0].id, workflow.id))
        .then(wo => workorder = wo);
    });

    step('login to mobile as ' + authData.users.TREVER.username, function() {
      authService.openMobileApp();
      browser.driver.executeScript(function() {
        sessionStorage.clear();
        localStorage.clear();
      });
      authService.openMobileApp();
      authService.verifyLoginPageIsVisible();
      authService.loginToMobileApp(authData.users.TREVER.username,
        authData.password.DEFAULT_PASSWORD);
    });

    step('verify workorders page is displayed', function() {
      authService.verifySuccessfulLogin();
    });

    step('select a workorder from list', function() {
      browser.sleep(20000);
      workorderService.selectWorkorderFromTheList(workorderTitle);
    });

    step('that workorder details are present and correct', function() {
      browser.sleep(1000);
      const workorderDetails = {
        id: workorder.id,
        status: 'New',
        workorderName: workorderTitle
      };
      workorderService.verifyWorkorderDetailsArePresentAndCorrect(workorderDetails);
    });

    step('that the begin workflow button is present', function() {
      workorderService.verifyWorkorderWorkflowIsNotCompleted();
    });

    step('click on the begin workflow button', function() {
      workorderService.beginWorkflow();
    });

    step('verify elements of workflow completeion page are visible', function() {
      workflowService.verifyWorkflowFormIsVisible();
    });

    step('click back button', function() {
      workflowService.cancelWorkflowChanges();
    });

    step('verify that the begin workflow button is still present', function() {
      browser.sleep(1000);
      workorderService.verifyWorkorderWorkflowIsNotCompleted();
    });

    step('click on begin workflow button', function() {
      workorderService.beginWorkflow();
    });

    step('click continue button', function() {
      browser.sleep(10000);
      workflowService.submitWorkflowDetails();
    });

    step('verify workflow section details are correct', function() {
      browser.sleep(1000);
      workorderService.verifyWorkorderWorkflowIsCompleted();
    });

    step('logout from mobile', function() {
      authService.logoutOfMobileApp();
    });
  });
});
