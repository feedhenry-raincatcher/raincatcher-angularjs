var dragAndDropUtil = require('html-dnd').code;

module.exports = {
  check: require('./check'),
  date: require('./date'),
  expect: require('./expect'),
  promise: require('./promise'),
  object: require('./object'),
  ui: require('./ui'),
  wait: require('./wait'),
  /**
   * Used to return the text value associated with a particular item from a list
   *
   * @param listLocator - the locator associated with the list
   * @param index - the index of the list item to find
   * @param expectedValue - the expected text value
   */
  getAndCheckListItemTextValue: function(listLocator, index, expectedValue) {
    expect(listLocator.get(index).getText()).eventually.to.equal(expectedValue);
  },

  /**
   * Used to provide a utility for drag and drop functionality using the "HTML dnd"
   * library
   *
   * @param elementToMove
   * @param targetElement
   */
  dragAndDrop: function(elementToMove, targetElement) {
    browser.executeScript(dragAndDropUtil, elementToMove, targetElement);
  },

  /**
   * Utility to alow the use of a dropdown selector
   * @param  params - array of used values.
   * params[0] - dropdown locator
   * params[1] - option text value
   * params[2] - the panel that pops up ontaining the possible values
   * params[3] - locator to the selected value thats been selected
   */
  useDropdownSelector: function(params) {
    params[0].sendKeys(params[1]);
    this.wait.until(params[2]);
    params[3].click();
  }
};