var utils = require('../../../utils');

var WorkorderPage = function() {
  var locators = {
    heading: element(by.css('workorder-list .md-toolbar-tools h3 span')),
    searchBox: element(by.css('input[name="search"]')),
    workordersList: element(by.css('workorder-list md-list')),
    workordersListItems: element.all(by.css('workorder-list md-list md-list-item')),
  };

  var commands = {
    get: {
      workordersListItemDetails: function(index) {
        locators.workordersListItems.get(index)
          .element(by.css('button')).getAttribute('aria-label');
      },
      workordersListItemIcon: function(index) {
        locators.workordersListItems.get(index)
          .element(by.css('workorder-status md-icon')).getText();  //assignment_turned_in, new_releases, radio_button_unchecked
      }
    },
    search: function(workorderName) {
      locators.searchBox.clear().sendKeys(workorderName);
    },
    select: function(workorderName) {
      locators.workordersList.element(by.cssContainingText('md-list-item', workorderName)).click();
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = WorkorderPage();