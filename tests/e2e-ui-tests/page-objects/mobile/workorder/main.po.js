var utils = require('../../utils');

var WorkorderPage = function {
  var locators = {
    heading: element(by.css('workorder-list .md-toolbar-tools h3 span')),
    searchBox: element(by.css('label[for="search"] input')),
    workordersList: element(by.css('workorder-list md-list')),
    workordersListItems: element.all(by.css('workorder-list md-list md-list-items')),
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
    }
  };

  return {
    locators,
    commands
  }
};

module.exports = WorkorderPage();