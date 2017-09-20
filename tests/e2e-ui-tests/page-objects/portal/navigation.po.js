var utils = require('../../utils');

var NavigationTab = function() {
  var locators = {
    toggleNavButton: element(by.css('button[ng-click*="toggleSidenav"]')),
    navList: element(by.css('md-sidenav md-list')),
    navListItems: element(by.css('md-sidenav md-list')).all(by.css('md-list-item'))
  };

  var navigateTo = {
    workordersPage: function() {
      utils.ui.navigateToSection(locators.navListItems.get(0));
    },
    workflowsPage: function() {
      utils.ui.navigateToSection(locators.navListItems.get(1));
    },
    logoutPage: function() {
      utils.ui.navigateToSection(locators.navListItems.last());
    }
  };

  return {
    locators, navigateTo
  };
};


module.exports = NavigationTab();
