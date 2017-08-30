var WorkorderService = require('../../services/portal/workorder.so');
var workorderService = new WorkorderService();

var WorkerService = require('../../services/portal/worker.so');
var workerService = new WorkerService();

var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();

var data = require('../../data/workorders.do');

var constants = require('../../data/page_constants');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

describe('Workorder E2E', function() {
  before('LOGIN', function() {
    authService.openPortalApp();
    authService.loginToPortalApp(constants.auth.usernames.DAISY,
      constants.auth.DEFAULT_PASSWORD);
    authService.verifySuccessfulLogin();
  });

  after('LOGOUT', function() {
    authService.logoutOfPortalApp();
  });

  context('RUN TEST', function() {
    var workflow1Id, workflow2Id;
    before('create workers', function() {
      workerService.create(data.workers.WORKER1);
      workerService.create(data.workers.WORKER2);
    });
    before('create workflows', function() {
      workflowService.create(data.workflows.WORKFLOW1);
      workflowService.getWorkflowId(data.workflows.WORKFLOW1)
        .then((wid) => workflow1Id = wid);

      workflowService.create(data.workflows.WORKFLOW2);
      workflowService.getWorkflowId(data.workflows.WORKFLOW2)
        .then((wid) => workflow2Id = wid);
    });
    context('CREATE', function() {
      step('create an empty{} workorder', function() {
        workorderService.create({}, true);
      });
      step('check field warinigs shown', function() {
        workorderService.expectWarningsPresent();
      });
      step('create ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
        workorderService.create(workorderService.clone(data.workorders.CREATE, workflow1Id));
      });
      step('open ' + data.params.WORKORDER_TCREATE + ' workorder', function() { //RAINCATCH-641
        workorderService.open(data.workorders.CREATE); // open workorder to see details
      });
      step('check ' + data.params.WORKORDER_TCREATE + ' workorder details', function() { //RAINCATCH-641
        workorderService.expectDetailsToBe(data.workorders.CREATE); // compare workorder details
      });
      step('check ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
        workorderService.expectToBeInList(data.workorders.CREATE);
      });
      step('check ' + data.params.WORKORDER_TCREATE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
        workerService.verifyWorkorderInList(data.workers.WORKER1, data.workorders.CREATE);
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
        workorderService.create(workorderService.clone(data.workorders.UPDATE1, workflow1Id));
      });
      step('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
        workorderService.update(data.workorders.UPDATE1, workorderService.clone(data.workorders.UPDATE2, workflow2Id));
      });
      step('open ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() { //RAINCATCH-641
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
      step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in ' + data.params.WORKER_TCRUDL2 + ' worker list', function() {
        workerService.verifyWorkorderInList(data.workers.WORKER2, data.workorders.UPDATE2);
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
        workorderService.create(workorderService.clone(data.workorders.CANCEL, workflow2Id));
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
      step('press [edstep] button', function() {
        workorderService.pressEdstepButton();
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
        workorderService.create(workorderService.clone(data.workorders.SEARCH, workflow1Id));
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
        workorderService.create(workorderService.clone(data.workorders.DELETE, workflow1Id));
      });
      step('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
        workorderService.remove(data.workorders.DELETE);
      });
      step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
        workorderService.expectNotInTheList(data.workorders.DELETE);
      });
      step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
        workerService.verifyWorkorderNotInList(data.workers.WORKER1, data.workorders.DELETE);
      });
      xstep('mobile App workorder in list', function() {
        // TODO
      });
    });
    after('remove workers', function() {
      workerService.remove(data.workers.WORKER1);
      workerService.remove(data.workers.WORKER2);
    });
    after('remove workflows', function() {
      workflowService.remove(data.workflows.WORKFLOW1);
      workflowService.remove(data.workflows.WORKFLOW2);
    });
  });
});
