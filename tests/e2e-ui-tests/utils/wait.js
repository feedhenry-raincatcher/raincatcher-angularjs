var EC = protractor.ExpectedConditions;
/**
 *
 * @param locator - any locator used to select an element
 * @param EC - expected condition for element
 * EC.elementToBeClickable(locator) || EC.presenceOf(locator)
 * @param time - time in ms to wait (default 2000)
 */
module.exports.until = function(locator, time, condition) {
  time = time || 2000;
  condition = condition || EC.presenceOf;
  var message = "waiting for "  + time + "ms for" + locator.locator().toString() + "to be present";
  browser.wait(condition(locator), time, message);
  expect(locator.isPresent()).eventually.to.be.true;
};

/**
 *
 * @param locator - any locator used to select an element
 * @param EC - expected condition for element
 * EC.elementToBeClickable(locator) || EC.presenceOf(locator)
 * @param time - time in ms to wait (default 2000)
 */
module.exports.untilNot = function(locator, condition, time) {
  time = time || 2000;
  condition = condition || EC.presenceOf;
  var message = "waiting for "  + time + "ms for" + locator.locator().toString() + "to be present";
  browser.wait(EC.not(condition(locator)), time, message);
  expect(locator.isPresent()).eventually.to.be.false;
};