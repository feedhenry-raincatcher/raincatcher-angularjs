var consts = require('../../../data/page_constants');
var utils = require('../../../utils');

var MainWorkorderPage = function() {
  var locators = {
    header: element(by.css('#content > div.ng-scope.flex > div > h2')),

    emptyTitle: element(by.css('h2.md-title')),
    emptyBody: element(by.css('div p.md-body-1')),

    newButton: element(by.css('a[aria-label="New Workorder"]')),
    deleteButton: element(by.css('button[aria-label="Delete"]')),
    proceedButton: element(by.css('button[aria-label="Proceed"]')),
    editButton: element(by.css('a[aria-label="Edit"]')),
    cancelButton: element(by.css('button[aria-label="Cancel"]')),

    summaryInfo: element(by.css('workorder>md-list')),
    search : element(by.css('workorder-list>form>input[name="search"]')),
    workorders: element.all(by.repeater('workorder in ctrl.workorders')),
    workorder: {
      title: by.css('div>div>h3'),
      address: by.css('div>div>p')
    },
    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Workorders"]')),
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL);
    },
    sideClick: function() {
      utils.ui.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getCurrentUrl().then(function(result) {
        expect(result).to.include(consts.workorders.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expect.resultIsEqualTo(result, consts.workorders.portal.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expect.resultIsEqualTo(result, consts.workorders.portal.DEFAULT_BODY);
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
      return locators.workorders.count();
    },
    first: function() {
      return locators.workorders.first();
    },
    getTitle: function(elem) {
      return elem.element(locators.workorder.title).getText();
    },
    getAddress: function(elem) {
      return elem.element(locators.workorder.address).getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = MainWorkorderPage();