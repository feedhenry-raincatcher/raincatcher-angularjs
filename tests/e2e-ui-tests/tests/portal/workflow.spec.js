var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();

var data = require('../../data/workflows.do');

var authData = require('../../data/auth.do');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

var core = require('../../utils/api');

const prefix = 'test-';
data.workflows.CREATE.title = prefix + data.workflows.CREATE.title;
data.workflows.UPDATE1.title = prefix + data.workflows.UPDATE1.title;
data.workflows.UPDATE2.title = prefix + data.workflows.UPDATE2.title;
data.workflows.CANCEL.title = prefix + data.workflows.CANCEL.title;
data.workflows.SEARCH.title = prefix + data.workflows.SEARCH.title;
data.workflows.DELETE.title = prefix + data.workflows.DELETE.title;

describe('Workflow E2E', function() {

  before('login', function() {
    browser.ignoreSynchronization = true;
    authService.openPortalApp();
    authService.loginToPortalApp(authData.users.DAISY.username,
      authData.password.DEFAULT_PASSWORD);
    authService.verifySuccessfulLogin();
    return core.auth.login(authData.users.DAISY.username, authData.password.DEFAULT_PASSWORD)
      .then(() => core.cleanup(prefix));
  });

  after('LOGOUT', function() {
    authService.logoutOfPortalApp();
  });

  context('CREATE', function() {
    step('create an empty{} workflow', function() {
      browser.ignoreSynchronization = false;
      workflowService.create({}, true);
    });
    step('required field warinigs shown', function() {
      workflowService.expectWarningsPresent();
    });
    step('create ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.create(data.workflows.CREATE);
    });
    step('open ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      workflowService.open(data.workflows.CREATE);
    });
    step('check ' + data.params.WORKFLOW_TCREATE + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CREATE);
    });
    step('check ' + data.params.WORKFLOW_TCREATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.CREATE);
    });
    xstep('check ' + data.params.WORKFLOW_TCREATE + ' in workorder form', function() {
      // TODO
    });
    after('remove ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      return core.workflows.removeByName(data.workflows.CREATE.title);
    });
  });

  context('UPDATE', function() {
    before('create ' + data.params.WORKFLOW_TUPDATE1 + ' workflow', function() {
      return core.workflows.create(data.workflows.UPDATE1.title);
    });
    step('update ' + data.params.WORKFLOW_TUPDATE1 + ' workflow details', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      workflowService.update(data.workflows.UPDATE1, data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE2 + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE2 + ' workflow in list', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      workflowService.expectToBeInList(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE1 + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.UPDATE1);
    });
    after('remove ' + data.params.WORKFLOW_TUPDATE2 + ' workflow', function() {
      return core.workflows.removeByName(data.workflows.UPDATE2.title);
    });
  });

  context('CANCEL', function() {
    before('create ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
      return core.workflows.create(data.workflows.CANCEL.title);
    });
    step('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      workflowService.open(data.workflows.CANCEL);
    });
    step('press [delete] button', function() {
      workflowService.pressDeleteButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressCancelButton();
    });
    step('check ' + data.params.WORKFLOW_TCANCEL + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.CANCEL);
    });
    step('press [new] button', function() {
      workflowService.pressNewButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressNewCancelButton();
    });
    step('check [new] button visible', function() {
      workflowService.expectNewButtonIsPresent();
    });
    step('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.open(data.workflows.CANCEL);
    });
    step('press [edit] button', function() {
      workflowService.pressEditButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressNewCancelButton();
    });
    step('RAINCATCH-839: check ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CANCEL);
    });
    after('remove ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
      return core.workflows.removeByName(data.workflows.CANCEL.title);
    });
  });

  context('SEARCH', function() {
    var searched;
    before('create ' + data.params.WORKFLOW_TSEARCH + ' workflow', function() {
      return core.workflows.create(data.workflows.SEARCH.title);
    });
    step('search field is visible and ' + data.params.WORKFLOW_TSEARCH + 'is searched', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      searched = workflowService.search(data.workflows.SEARCH, 1);
    });
    step('check ' + data.params.WORKFLOW_TSEARCH + ' workflow in list', function() {
      workflowService.expectElementDetailsEqualTo(searched, data.workflows.SEARCH);
    });
    step('check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectElementDetailsNotEqualTo(searched, data.workflows.DELETE);
    });
    step('search reset to list all workflows', function() {
      workflowService.searchReset();
    });
    after('remove ' + data.params.WORKFLOW_TSEARCH + ' workflow', function() {
      return core.workflows.removeByName(data.workflows.SEARCH.title);
    });
  });

  context('DELETE', function() {
    before('create ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      return core.workflows.create(data.workflows.DELETE.title);
    });
    step('remove ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
      workflowService.remove(data.workflows.DELETE);
      browser.refresh(); // workaround for https://issues.jboss.org/browse/RAINCATCH-1225
    });
    step('RAINCATCH-839: check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.DELETE);
    });
    xstep('check ' + data.params.WORKFLOW_TDELETE + ' not in workorder form', function() {
      // TODO
    });
  });
});
