var utils = require('../../../utils');
var _ = require('lodash');

var SelectedWorkorderPage = function() {
  var locators = {
    detailsListItems: element.all(by.css('workorder md-list md-list-item')),
    workSummaryDetails: element(by.css('workorder .md-subheader p')),
    beginWorkflowButton: element(by.css('button[aria-label="Begin Workflow"]')),
    workFlowResultSection: element(by.css('workorder-submission-result'))
  };

  var getListItemChildText = function(index) {
    return locators.detailsListItems.get(index).element(by.css('h3')).getText();
  };

  var commands = {
    get: {
      id: _.partial(getListItemChildText, 0),
      workorderName: _.partial(getListItemChildText, 1),
      status: _.partial(getListItemChildText, 2),
      coordinates: _.partial(getListItemChildText, 3),
      startDate: _.partial(getListItemChildText, 4),
      startTime: _.partial(getListItemChildText, 5),
      finishDate: _.partial(getListItemChildText, 6),
      finishTime: _.partial(getListItemChildText, 7),
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
  };
};

module.exports = SelectedWorkorderPage();