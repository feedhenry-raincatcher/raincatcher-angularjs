var WorkorderService = require('../../services/portal/workorder.so');
var workorderService = new WorkorderService();

var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();

var data = require('../../data/workorders.do');

var constants = require('../../utils/constants');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

describe('Workorder E2E', function() {
  before('LOGIN', function() {
    browser.ignoreSynchronization = true;
    authService.openPortalApp();
    authService.loginToPortalApp(constants.auth.usernames.DAISY_DIALER,
      constants.auth.DEFAULT_PASSWORD);
    authService.verifySuccessfulLogin();
  });

  after('LOGOUT', function() {
    authService.logoutOfPortalApp();
  });

  context('RUN TEST', function() {
    before('create workflows', function() {
      browser.ignoreSynchronization = false;
      workflowService.create(data.workflows.WORKFLOW1);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225

      workflowService.create(data.workflows.WORKFLOW2);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
    });
    context('CREATE', function() {
      step('create an empty{} workorder', function() {
        workorderService.create({}, true);
      });
      step('check field warinigs shown', function() {
        workorderService.expectWarningsPresent();
      });
      step('create ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.CREATE, data.workflows.WORKFLOW1.title));
      });
      step('open ' + data.params.WORKORDER_TCREATE + ' workorder', function() { //RAINCATCH-641
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
        workorderService.open(data.workorders.CREATE); // open workorder to see details
      });
      step('check ' + data.params.WORKORDER_TCREATE + ' workorder details', function() { //RAINCATCH-641
        workorderService.expectDetailsToBe(data.workorders.CREATE); // compare workorder details
      });
      step('check ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
        workorderService.expectToBeInList(data.workorders.CREATE);
      });
      xstep('mobile App workorder in list', function() {
        // TODO
      });
      after('remove ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
        workorderService.remove(data.workorders.CREATE);
      });
    });

    context('UPDATE', function() {
      before('create ' + data.params.WORKORDER_TUPDATE1 + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.UPDATE1, data.workflows.WORKFLOW1.title));
      });
      step('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
        workorderService.update(data.workorders.UPDATE1, workorderService.clone(data.workorders.UPDATE2, data.workflows.WORKFLOW2.title));
      });
      step('open ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() { //RAINCATCH-641
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
        workorderService.open(data.workorders.UPDATE2); // open workorder to see details
      });
      step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder details', function() { //RAINCATCH-641
        workorderService.expectDetailsToBe(data.workorders.UPDATE2); // verify workorder details
      });
      step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in list', function() {
        workorderService.expectToBeInList(data.workorders.UPDATE2);
      });
      step('check ' + data.params.WORKORDER_TUPDATE1 + ' workorder not in list', function() {
        workorderService.expectNotInTheList(data.workorders.UPDATE1);
      });
      xstep('mobile App workorder in list', function() {
        // TODO
      });
      after('remove ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() {
        workorderService.remove(data.workorders.UPDATE2);
      });

    });

    context('CANCEL', function() {
      before('create ' + data.params.WORKORDER_TCANCEL + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.CANCEL, data.workflows.WORKFLOW1.title));
      });
      step('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
        workorderService.open(data.workorders.CANCEL);
      });
      step('press [delete] button', function() {
        workorderService.pressDeleteButton();
      });
      step('press [cancel] button', function() {
        workorderService.pressCancelButton();
      });
      step('check ' + data.params.WORKORDER_TCANCEL + ' workorder in list', function() {
        workorderService.expectToBeInList(data.workorders.CANCEL);
      });
      step('press [new] button', function() {
        workorderService.pressNewButton();
      });
      step('press [cancel] button', function() {
        workorderService.pressNewCancelButton();
      });
      step('check [new] button visible', function() {
        workorderService.expectNewButtonIsPresent();
      });
      step('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
        workorderService.open(data.workorders.CANCEL);
      });
      step('press [edit] button', function() {
        workorderService.pressEditButton();
      });
      step('press [cancel] button', function() {
        workorderService.pressNewCancelButton();
      });
      step('check ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
        workorderService.expectDetailsToBe(data.workorders.CANCEL);
      });
      after('remove ' + data.params.WORKORDER_TCANCEL + ' workorder', function() {
        workorderService.remove(data.workorders.CANCEL);
      });
    });

    context('SEARCH', function() {
      var searched;
      before('create ' + data.params.WORKORDER_TSEARCH + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.SEARCH, data.workflows.WORKFLOW1.title));
      });
      step('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
        searched = workorderService.search(data.workorders.SEARCH, 1);
      });
      step('check ' + data.params.WORKORDER_TSEARCH + ' workorder in list', function() {
        workorderService.expectElementDetailsEqualTo(searched, data.workorders.SEARCH);
      });
      step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
        workorderService.expectElementDetailsNotEqualTo(searched, data.workorders.DELETE);
      });
      step('search reset to list all workorders', function() {
        workorderService.searchReset();
      });
      after('create ' + data.params.WORKORDER_TSEARCH + ' workorder', function() {
        workorderService.remove(data.workorders.SEARCH);
      });
    });

    context('DELETE', function() {
      before('create ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.DELETE, data.workflows.WORKFLOW1.title));
      });
      step('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
        workorderService.remove(data.workorders.DELETE);
      });
      step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
        workorderService.expectNotInTheList(data.workorders.DELETE);
      });
      xstep('mobile App workorder in list', function() {
        // TODO
      });
    });
    after('remove workflows', function() {
      workflowService.remove(data.workflows.WORKFLOW1);
      workflowService.remove(data.workflows.WORKFLOW2);
    });
  });
});
