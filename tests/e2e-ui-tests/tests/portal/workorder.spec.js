var WorkorderService = require('../../services/portal/workorder.so');
var workorderService = new WorkorderService();

var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();

var data = require('../../data/workorders.do');

var authData = require('../../data/auth.do');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

var core = require('../../utils/api');

const prefix = 'test-';
data.workflows.WORKFLOW1.title = prefix + data.workflows.WORKFLOW1.title;
data.workflows.WORKFLOW2.title = prefix + data.workflows.WORKFLOW2.title;
data.workorders.CREATE.title = prefix + data.workorders.CREATE.title;
data.workorders.CREATE.workflow = prefix + data.workorders.CREATE.workflow;
data.workorders.UPDATE1.title = prefix + data.workorders.UPDATE1.title;
data.workorders.UPDATE2.title = prefix + data.workorders.UPDATE2.title;
data.workorders.UPDATE2.workflow = prefix + data.workorders.UPDATE2.workflow;
data.workorders.CANCEL.title = prefix + data.workorders.CANCEL.title;
data.workorders.CANCEL.workflow = prefix + data.workorders.CANCEL.workflow;
data.workorders.SEARCH.title = prefix + data.workorders.SEARCH.title;
data.workorders.DELETE.title = prefix + data.workorders.DELETE.title;

describe('Workorder E2E', function() {
  before('LOGIN', function() {
    browser.ignoreSynchronization = true;
    authService.openPortalApp();
    authService.loginToPortalApp(authData.users.DAISY.username,
      authData.password.DEFAULT_PASSWORD);
    authService.verifySuccessfulLogin();
    return core.auth.login(authData.users.DAISY.username, authData.password.DEFAULT_PASSWORD);
  });

  after('LOGOUT', function() {
    authService.logoutOfPortalApp();
  });

  context('RUN TEST', function() {
    before('create workflows', function() {
      browser.ignoreSynchronization = false;
      return core.workflows.create(data.workflows.WORKFLOW1.title)
        .then(() => core.workflows.create(data.workflows.WORKFLOW2.title));
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
        return core.workorders.removeByName(data.workorders.CREATE.title);
      });
    });

    context('UPDATE', function() {
      before('create ' + data.params.WORKORDER_TUPDATE1 + ' workorder', function() {
        const wo = workorderService.clone(data.workorders.UPDATE1, data.workflows.WORKFLOW1.title);
        return core.workorders.createByName(wo.title, undefined, wo.workflow);
      });
      step('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
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
        return core.workorders.removeByName(data.workorders.UPDATE2.title);
      });

    });

    context('CANCEL', function() {
      before('create ' + data.params.WORKORDER_TCANCEL + ' workorder', function() {
        const wo = workorderService.clone(data.workorders.CANCEL, data.workflows.WORKFLOW1.title);
        return core.workorders.createByName(wo.title, authData.users.TREVER.username, wo.workflow);
      });
      step('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
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
        return core.workorders.removeByName(data.workorders.CANCEL.title);
      });
    });

    context('SEARCH', function() {
      var searched;
      before('create ' + data.params.WORKORDER_TSEARCH + ' workorder', function() {
        const wo = workorderService.clone(data.workorders.SEARCH, data.workflows.WORKFLOW1.title);
        return core.workorders.createByName(wo.title, authData.users.TREVER.username, wo.workflow);
      });
      step('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
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
        return core.workorders.removeByName(data.workorders.SEARCH.title);
      });
    });

    context('DELETE', function() {
      before('create ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
        const wo = workorderService.clone(data.workorders.DELETE, data.workflows.WORKFLOW1.title);
        return core.workorders.createByName(wo.title, authData.users.TREVER.username, wo.workflow);
      });
      step('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
        browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
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
      return core.workflows.removeByName(data.workflows.WORKFLOW1.title)
        .then(() => core.workflows.removeByName(data.workflows.WORKFLOW2.title));
    });
  });
});
