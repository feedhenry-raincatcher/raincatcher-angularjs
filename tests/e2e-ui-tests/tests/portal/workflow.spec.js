var WorkflowService = require('../../services/portal/workflow.so');
var workflowService = new WorkflowService();

var data = require('../../data/workflows.do');

var constants = require('../../data/page_constants');
var AuthService = require('../../services/portal/auth.so');
var authService = new AuthService();

describe('Workflow E2E', function() {

  before('login', function() {
    authService.openPortalApp();
    authService.loginToPortalApp(constants.auth.usernames.DAISY,
      constants.auth.DEFAULT_PASSWORD);
    authService.verifySuccessfulLogin();
  });

  after('LOGOUT', function() {
    authService.logoutOfPortalApp();
  });

  context('CREATE', function() {
    step('create an empty{} workflow', function() {
      workflowService.create({}, true);
    });
    step('required field warinigs shown', function() {
      workflowService.expectWarningsPresent();
    });
    step('create ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.create(data.workflows.CREATE);
    });
    step('open ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
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
      workflowService.remove(data.workflows.CREATE);
    });
  });

  context('UPDATE', function() {
    before('create ' + data.params.WORKFLOW_TUPDATE1 + ' workflow', function() {
      workflowService.create(data.workflows.UPDATE1);
    });
    step('update ' + data.params.WORKFLOW_TUPDATE1 + ' workflow details', function() {
      workflowService.update(data.workflows.UPDATE1, data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE2 + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE1 + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.UPDATE1);
    });
    after('remove ' + data.params.WORKFLOW_TUPDATE2 + ' workflow', function() {
      workflowService.remove(data.workflows.UPDATE2);
    });
  });

  context('CANCEL', function() {
    before('create ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
      workflowService.create(data.workflows.CANCEL);
    });
    step('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
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
    step('press [edstep] button', function() {
      workflowService.pressEdstepButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressNewCancelButton();
    });
    step('RAINCATCH-839: check ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CANCEL);
    });
    after('remove ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
      workflowService.remove(data.workflows.CANCEL);
    });
  });

  context('SEARCH', function() {
    var searched;
    before('create ' + data.params.WORKFLOW_TSEARCH + ' workflow', function() {
      workflowService.create(data.workflows.SEARCH);
    });
    step('search field is visible and ' + data.params.WORKFLOW_TSEARCH + 'is searched', function() {
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
      workflowService.remove(data.workflows.SEARCH);
    });
  });

  context('DELETE', function() {
    before('create ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowService.create(data.workflows.DELETE);
    });
    step('remove ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowService.remove(data.workflows.DELETE);
    });
    step('RAINCATCH-839: check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.DELETE);
    });
    xstep('check ' + data.params.WORKFLOW_TDELETE + ' not in workorder form', function() {
      // TODO
    });
  });
});
