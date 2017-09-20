var utils = require('../../../utils');

var SelectedWorkflowPage = function() {

  var stepFormSelector = 'form[name="workflowStepForm"]';
  var locators = {

    workflowHeader: element(by.css('#content > div.ng-scope.flex > workflow-detail > md-toolbar > div > h3')),
    workflowSteps: element.all(by.repeater('step in ctrl.workflow.steps')), // get all steps but not [Add Step]
    workflowEditLink: element(by.css('#content > div.ng-scope.flex > workflow-detail > md-toolbar > div > a')),

    stepForm: {
      self: element(by.css(stepFormSelector)),
      fields: {
        code: element(by.css(stepFormSelector + ' #code')),
        name: element(by.css(stepFormSelector + ' #name')),
        form: element(by.css(stepFormSelector + ' #form')),
        view: element(by.css(stepFormSelector + ' #view')),
      },
      dropdowns: {
        formId: element(by.css(stepFormSelector + ' #formId')),
      },
      buttons: {
        add: element(by.css(stepFormSelector + ' button[aria-label="Add step"]')), // BUG shoudl be Add step
        update: element(by.css(stepFormSelector + ' button[aria-label="Update step"]')),
      },
      warnings: {
        code: element(by.css(stepFormSelector + ' #code[aria-invalid="true"]')),
        name: element(by.css(stepFormSelector + ' #name[aria-invalid="true"]'))
      }
    }
  };
  var commands = {
    selfCheck: function(header) {
      return locators.workflowHeader.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.workflowHeader.getText();
      }).then(function(result) {
        utils.expect.resultIsNotEquelTo(result, header);
      });
    },
    getWorkflowEditLink: function() {
      return locators.workflowEditLink.getAttribute('href').then(function(value) {
        return value;
      });
    },
    getStepsDetails: function() {
      return locators.workflowSteps.map(function(stepUiDetail) {
        var stepUi = stepUiDetail.element(by.css('md-card-content>workflow-step-detail'));
        var h2 = stepUi.element(by.css('h2')).getText();
        var listItems = stepUi.element(by.css('md-list')).all(by.css('md-list-item'));
        var data = listItems.map(function(listItem) {
          var icon = listItem.element(by.css('md-icon')).getText();
          var h3 = listItem.element(by.css('div>h3')).getText();
          var p = listItem.element(by.css('div>p')).getText();
          return { icon, h3, p };
        });
        return { h2, data };
      });
    },
    getStepCode: function(details, idx) {
      var stepCode = details[idx].data.find(function(it) {
        return it.p === 'Step code';
      });
      return stepCode;
    },
    getViewTemplate: function(details, idx) {
      var viewTemplate = details[idx].data.find(function(it) {
        return it.p === 'View template';
      });
      return viewTemplate;
    },
    getFormId: function(details, idx) {
      var formTemplate = details[idx].data.find(function(it) {
        return it.p === 'FormId';
      });
      return formTemplate;
    },
    getFormTemplate: function(details, idx) {
      var formTemplate = details[idx].data.find(function(it) {
        return it.p === 'Form template';
      });
      return formTemplate;
    }
  };

  return {
    locators, commands
  };
};

module.exports = SelectedWorkflowPage();