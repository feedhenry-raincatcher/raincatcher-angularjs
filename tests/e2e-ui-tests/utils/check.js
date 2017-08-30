/**
 *
 * @param locator - locator used to select an element
 * @param expectedValue - expected value to be retrieved by the locator
 */
module.exports.elementVisibilityAndValue = function(locator, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getText()).eventually.to.equal(expectedValue);
};

/**
 * Used to check visibility of a locator and also check that a particular
 * attribute of the element matches an expected value
 *
 * @param locator - locator used to select an element
 * @param selectedAttribute - the name of the attribute to check
 * @param expectedValue - expected value to be retrieved by the locator
 */
module.exports.elementVisibilityAndAttributeValue = function(locator, selectedAttribute, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getAttribute(selectedAttribute)).eventually.to.equal(expectedValue);
};

/**
 *
 * @param locators - array of selectors to test visibility of elements
 */
module.exports.elementsArePresent = function(locators) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].isPresent()).eventually.to.be.true;
  }
};

/**
 *
 * @param locators - array of selectors to get values from
 * @param expectedValues - the expected values to retrieve from the selectors
 */
module.exports.valuesAreCorrect = function(locators, expectedValues) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].getText()).eventually.to.equal(expectedValues[i]);
  }
};

/**
 *
 * @param locators - selector calling a list of items
 * @param expectedSize - expected size of the list
 */
module.exports.listSize = function(locators, expectedSize) {
  expect(locators.count()).eventually.to.equal(expectedSize);
};

