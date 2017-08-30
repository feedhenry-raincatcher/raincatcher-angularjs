var CompletedWorkflowPage = function() {

  var locators = {
    workflowHeader: element(by.css('vehicle-inspection div div div')),
    completedWorkflowListItems: element.all(by.css('workorder-submission-result md-list-item'))
  };

  var getListItemChildText = function(index) {
    completedWorkflowListItems.get(index).element(by.css('h3')).getText();
  };

  var commands = {
    get: {
      fuelValue: function() {
        getListItemChildText(0)
      },
      tiresValue: function() {
        getListItemChildText(1)
      },
      lightsValue: function() {
        getListItemChildText(2)
      }
    },
    count: function() {
      completedWorkflowList.count()
    }
  };

  return {
    locators,
    commands
  };

};

module.exports = CompletedWorkflowPage();