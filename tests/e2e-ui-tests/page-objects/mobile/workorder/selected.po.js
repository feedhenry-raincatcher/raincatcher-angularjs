var utils = require('../../utils');

var SelectedWorkorderPage = function() {
  var locators = {
    detailsListItems: element.all(by.css('workorder md-list')),
    workSummaryDetails: element(by.css('workorder .md-subheader p')),
    beginWorkflowButton: element(by.css('[ng-click="ctrl.begin"]')),
    workFlowResultSection: element(by.css('workorder-submission-result'))
  };

  var getListItemChildTdetailsListItems.count()ext = function(index) {
    locators.detailsListItems.get(index).element(by.css('h3')).getText();
  };

  var commands = {
    get: {
      id: getListItemChildText(0),
      status: getListItemChildText(1),
      coordinates: getListItemChildText(2),
      workorderName: getListItemChildText(3),
      startDate: getListItemChildText(4),
      startTime: getListItemChildText(5),
      finishDate: getListItemChildText(6),
      finishTime: getListItemChildText(7)
    },
    beginWorkflow: function() {
      locators.beginWorkflowButton.click();
    },
    count: function() {
      locators.detailsListItems.count();
    }
  };

  return {
    locators,
    commands
  }
};

module.exports = SelectedWorkorderPage();