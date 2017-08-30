var _ = require('lodash');

/*
 @param element with @attributeName with attribute text to contain @filterText
 @return Promise with filtered elements
 Usage example:
  [ELEMENTS].filter(ui.filter.byElementAttributeContains.bind({
    filterText: "Some text",
    attributeName: "src",
    matchFunc: _.include || _.isEqual
}));
*/
module.exports.byElementAttributeMatch = function(element) {
  return element.getAttribute(this.attributeName).then(function(value) {
    return this.matchFunc(value, this.filterText);
  }.bind({
    filterText: this.filterText,
    matchFunc: this.matchFunc || _.include
  }));
};

/*
 @param element with @attributeName and @childElementLocator with attribute text to contain @filterText
 @return Promise with filtered elements
Usage example:
  [ELEMENTS].filter(ui.filter.byChildElementAttributeContains.bind({
    filterText: "Some text,
    childElementLocator: "by.css('span')",
    attributeName: "src",
    matchFunc: _.include || _.isEqual
  }));
*/
module.exports.byChildElementAttributeContains = function(element) {
  return element.element(this.childElementLocator).getAttribute(this.attributeName).then(function(value) {
    return this.matchFunc(value, this.filterText);
  }.bind({
    filterText: this.filterText,
    matchFunc: this.matchFunc || _.include
  }));
};

/*
 @param element to be scrolled on page
 @return scrolled element
Usage example:
  ui.scroll.scrollElemIntoView(ELEMENT);
*/
module.exports.scrollElemIntoView = function(element) {
  browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
  return element;
};

/*
 @param element to be scrolled on page
 @return Promise of scrolled element
Usage example:
  ui.scroll.scrollElemIntoView(ELEMENT);
*/
module.exports.scrollElemIntoViewPromise = function(element) {
  return browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
};

/*
 @param elements to be fulfilled with data
 @param params to be used for each ui element
 @return Promise chain of fulfilled elements
Usage example:
 ui.sendKeysPromise(ELEMENTS, {
   username: "raincatcher@feedhenry.com",
   name: "Rain",
   surname: "Catcher",
   ...
 });
*/
module.exports.sendKeysPromise = function(elements, params) {
  var sendKeys = function(kvPair) {
    var element = kvPair.element;
    return element.sendKeys(kvPair.value);
  };
  var kvPairs = _.map(elements, function(element, key) {
    return {
      element: element, value: params[key]};
  });

  var promise = _.reduce(_.tail(kvPairs), function(prev, kvPair) {
    return prev.then(function() {
      return sendKeys(kvPair);
    });
  }, sendKeys(_.head(kvPairs)));

  return promise;
};

/*
 @param button to be pressed
 @return Promise of pressed button
Usage example:
  ui.clickButtonPromise(LOGIN_BUTTON);
*/
module.exports.clickButtonPromise = function(button) {
  expect(button.isPresent()).eventually.to.be.true;
  return button.click();
};

/**
 *
 * @param locator - locator within the menu that is used to navigate to
 */
module.exports.navigateToSection = function(locator) {
  locator = locator || undefined;
  var menu = element(by.css("[aria-label*=Menu]"));
  menu.isDisplayed().then(function(isDisplayed) {
    if (isDisplayed) {
      menu.click();
    }
    if (locator) {
      locator.click();
    }
  });
};
