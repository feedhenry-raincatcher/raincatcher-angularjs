var authData = require('../../data/auth.do');
var workorderData = require('../../data/workorders.do');
var AuthService = require('../../services/mobile/auth.so');
var authService = new AuthService();
var WorkorderService = require('../../services/mobile/workorder.so');
var workorderService = new WorkorderService();
var WorkflowService = require('../../services/mobile/workflow.so');
var workflowService = new WorkflowService();

describe('Mobile Workorders and Workflow E2E', function() {
  describe('READ workorders tests', function() {
    describe(authData.usernames.TREVER_SMITH + ' can read the workorder list', function() {
      step('login to mobile as ' + authData.usernames.TREVER_SMITH, function() {
        authService.openMobileApp();
        authService.verifyLoginPageIsVisible();
        authService.loginToMobileApp(authData.users.TREVER.username,
          authData.password.DEFAULT_PASSWORD);
      });

      step('verify workorders page is displayed', function() {
        authService.verifySuccessfulLogin();
      });

      step('verify there are 8 workorders in the workorders list', function() {
        workorderService.verifyNumberOfWorkordersInList(workorderData.mobileWorkorders.TOTAL);
      });

      step('select a workorder from the list', function() {
        workorderService.selectWorkorderFromTheListByIndex(workorderData.mobileWorkorders.FIRST_WORKORDER.index);
      });

      step('that workorder details are present and correct', function() {
        workorderService.verifyWorkorderDetailsArePresentAndCorrect(workorderData.mobileWorkorders.FIRST_WORKORDER);
      });

      step('that the begin workflow button is present', function() {
        workorderService.verifyWorkorderWorkflowIsNotCompleted();
      });

      step('logout from mobile', function() {
        authService.logoutOfMobileApp();
      });
    });

    describe('SEARCH workorder tests', function() {
      step('login to mobile as ' + authData.usernames.TREVER_SMITH, function() {
        authService.openMobileApp();
        authService.verifyLoginPageIsVisible();
        authService.loginToMobileApp(authData.users.TREVER.username,
          authData.password.DEFAULT_PASSWORD);
      });

      step('verify workorders page is displayed', function() {
        authService.verifySuccessfulLogin();
      });

      step('search for a workorder in the list', function() {
        workorderService.searchForWorkorderInList(workorderData.mobileWorkorders.lastWorkorder.workorderName);
      });

      step('verify there is only one workorder in the list', function() {
        workorderService.verifyNumberOfWorkordersInList(1);
      });

      step('select the workorder from the list', function() {
        workorderService.selectWorkorderFromTheListByIndex(0);
      });

      step('that workorder details are present and correct', function() {
        workorderService.verifyWorkorderDetailsArePresentAndCorrect(workorderData.mobileWorkorders.lastWorkorder);
      });

      step('logout from mobile', function() {
        authService.logoutOfMobileApp();
      });

      describe('Complete and read workflow tests', function() {
        step('login to mobile as ' + authData.usernames.TREVER_SMITH, function() {
          authService.openMobileApp();
          authService.verifyLoginPageIsVisible();
          authService.loginToMobileApp(authData.users.TREVER.username,
            authData.password.DEFAULT_PASSWORD);
        });

        step('verify workorders page is displayed', function() {
          authService.verifySuccessfulLogin();
        });

        step('search for a workorder in the list', function() {
          workorderService.searchForWorkorderInList(workorderData.mobileWorkorders.lastWorkorder.workorderName);
        });

        step('verify there is only one workorder in the list', function() {
          workorderService.verifyNumberOfWorkordersInList(1);
        });

        step('select the workorder from the list', function() {
          workorderService.selectWorkorderFromTheListByIndex(0);
        });

        step('that workorder details are present and correct', function() {
          workorderService.verifyWorkorderDetailsArePresentAndCorrect(workorderData.mobileWorkorders.lastWorkorder);
        });

        step('verify that the begin workflow button is present', function() {
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
          workorderService.verifyWorkorderWorkflowIsNotCompleted();
        });

        step('click on begin workflow button', function() {
          workorderService.beginWorkflow();
        });

        step('verify elements of workflow completeion page are visible', function() {
          workflowService.verifyWorkflowFormIsVisible();
        });

        step('set the workflow details', function() {
          workflowService.setWorkflowDetails(
            workorderData.mobileWorkorders.lastWorkorder.workorderData.fuel,
            workorderData.mobileWorkorders.lastWorkorder.workorderData.tires,
            workorderData.mobileWorkorders.lastWorkorder.workorderData.lights);
        });

        step('click continue button', function() {
          workflowService.submitWorkflowDetails();
        });


        step('verify workflow section details are correct', function() {
          workflowService.checkWorkflowDetails(
            workorderData.mobileWorkorders.lastWorkorder.heading,
            workorderData.mobileWorkorders.lastWorkorder.workorderData.fuel,
            workorderData.mobileWorkorders.lastWorkorder.workorderData.tires,
            workorderData.mobileWorkorders.lastWorkorder.workorderData.lights);
        });

        step('logout from mobile', function() {
          authService.logoutOfMobileApp();
        });
      });
    });
  });
});
