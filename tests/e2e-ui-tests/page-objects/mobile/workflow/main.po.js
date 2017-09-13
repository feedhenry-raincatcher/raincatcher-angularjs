var WorkflowPage = function() {
  var locators = {
    buttons: {
      back: element(by.css('button[ng-click="ctrl.back($event)"]')),
      continue: element(by.css('button[ng-click="ctrl.done($event)"]'))
    },
    slider: element(by.css('div.md-track.ticks canvas')),
    radioButtons: {
      lights: {
        fail: element(by.model('ctrl.model.lights')).element(by.css('[aria-label="Fail"]')),
        pass: element(by.model('ctrl.model.lights')).element(by.css('[aria-label="Pass"]'))
      },
      tires: {
        fail: element(by.model('ctrl.model.tires')).element(by.css('[aria-label="Fail"]')),
        pass: element(by.model('ctrl.model.tires')).element(by.css('[aria-label="Pass"]'))
      }
    }
  };

  var commands = {
    click: {
      button: {
        back: function() {
          locators.buttons.back.click();
        },
        continue: function() {
          locators.buttons.continue.click();
        }
      },
      lights: {
        failButton: function() {
          locators.radioButtons.lights.fail.click();
        },
        passButton: function() {
          locators.radioButtons.lights.pass.click();
        }
      },
      tires: {
        failButton: function() {
          locators.radioButtons.tires.fail.click();
        },
        passButton: function() {
          locators.radioButtons.tires.pass.click();
        }
      }
    },
    dragSlider: function(percentage) {
      var value = null;
      switch (percentage) {
      case percentage < 13:
        value = 0;
        break;
      case percentage < 38:
        value = 25;
        break;
      case percentage < 63:
        value = 50;
        break;
      case percentage < 88:
        value = 75;
        break;
      default:
        value = 100;
      }
      //TODO - finish slider implementation
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = WorkflowPage();