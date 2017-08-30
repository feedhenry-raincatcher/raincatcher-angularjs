var utils = require('../../utils');


var NavigationTab = function() {
  var locators = {
    toggleNavButton: element(by.css('button[ng-click*="toggleSidenav"]')),
    navList: element(by.css('md-sidenav md-list')),
    navListItems: element(by.css('md-sidenav md-list')).all(by.css('md-list-item'))
    userAvatar: element(by.css('md-sidenav .sidenav-header img')),
    userName: element(by.css('md-sidenav .sidenav-header h3')),
    userEmail: element(by.css('md-sidenav .sidenav-header p'))
  };

  var commands = {
    navigateTo: {
      workordersPage: function() {
        utils.ui.navigateTo(locators.navListItems.get(0));
      }
    },
    clickLogoutButton: function() {
      locators.navListItems.last().click();
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = NavigationTab();