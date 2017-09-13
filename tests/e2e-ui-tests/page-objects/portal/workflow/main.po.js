var consts = require('../../../data/page_constants');
var utils = require('../../../utils');

var MainWorkflowPage = function() {
  var locators = {
    header: element(by.xpath('//h3/span[text()="Workflows"]')),

    emptyTitle: element(by.css('h2.md-title')),
    emptyBody: element(by.css('div p.md-body-1')),

    newButton: element(by.css('a[aria-label="New Workflow"]')),
    deleteButton: element(by.css('button[aria-label="Delete"]')),
    proceedButton: element(by.css('button[aria-label="Proceed"]')),
    editButton: element(by.css('a[aria-label="Edit"]')),
    cancelButton: element(by.css('button[aria-label="Cancel"]')),

    search : element(by.css('form>input[id="search"]')), // missing workflow-list> and name attribute
    workflows: element.all(by.repeater('workflow in ctrl.workflows')),
    workflow: {
      title: by.css('div>div>p')
    },

    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Workflows"]')),
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workflows.URL);
    },
    sideClick: function() {
      utils.ui.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getCurrentUrl().then(function(result) {
        expect(result).to.include(consts.workflows.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expect.resultIsEqualTo(result, consts.workflows.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expect.resultIsEqualTo(result, consts.workflows.DEFAULT_BODY);
        return locators.newButton.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.search.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
      });
    },
    search: function(text) {
      return locators.search.clear().then(function() {
        locators.search.sendKeys(text);
      });
    },
    count: function() {
      return locators.workflows.count();
    },
    first: function() {
      return locators.workflows.first();
    },
    getTitle: function(elem) {
      return elem.element(locators.workflow.title).getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = MainWorkflowPage();