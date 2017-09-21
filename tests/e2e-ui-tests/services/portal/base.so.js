var utils = require('../../utils');
var _ = require('lodash');

function BaseService(pageObject) {
  this.pageObject = pageObject;
}

//################################################################################
//                                CRUDL FUNCTIONS
//################################################################################
/**
 * Create new item
 * @param {*} item to be created
 * @param {*} dummyParams for dummy item creation
 */
BaseService.prototype.create = function(item, dummyParams) {
  var self = this;
  var pageObject = this.pageObject;
  dummyParams = dummyParams || false;

  pageObject.main.commands.sideClick()
  .then(() => utils.ui.clickButtonPromise(pageObject.main.locators.newButton))
  .then(() => pageObject.new.commands.selfCheck())
  .then(() => self.expectFieldsPresent())
  .then( ()  => { // fill dropdown selectors
    if (!dummyParams && pageObject.new.locators.itemForm.dropdowns) {
      return utils.ui.selectPromise(pageObject.new.locators.itemForm.dropdowns, item);
    }
  })
  .then( ()  => { // fill searchInput selectors
    if (!dummyParams && pageObject.new.locators.itemForm.searchInputs) {
      return utils.ui.searchPromise(pageObject.new.locators.itemForm.searchInputs, item);
    }
  })
  .then(() => { // fill date and time fields
    if (!dummyParams && pageObject.new.locators.itemForm.datetime) {
      return utils.ui.sendKeysPromise(pageObject.new.locators.itemForm.datetime, item);
    }
  })
  .then(() => {
    if (!dummyParams) { // fill input fields
      return utils.ui.sendKeysPromise(pageObject.new.locators.itemForm.fields, item);
    }
  })
  .then(() => utils.ui.clickButtonPromise(pageObject.new.locators.itemForm.buttons.create))
  .then(() => {
    if (!dummyParams) {
      self.expectElementInfo(item);
    }
  });
};

/**
 * Update item details with new item
 * @param {*} title of updatee item
 * @param {*} item to be filfilled
 */
BaseService.prototype.update = function(toUpdate, updatee) {
  var self = this;
  var pageObject = this.pageObject;

  return self.open(toUpdate)
  .then(() => utils.ui.clickButtonPromise(pageObject.main.locators.editButton))
  .then(() => self.clearAllFields())
  .then(() => {
    if (pageObject.new.locators.itemForm.datetime) { // fill date and time
      return utils.ui.sendKeysPromise(pageObject.new.locators.itemForm.datetime, updatee);
    }
  })
  .then(() => utils.ui.sendKeysPromise(pageObject.new.locators.itemForm.fields, updatee)) // fill fields
  .then(() => utils.ui.clickButtonPromise(pageObject.new.locators.itemForm.buttons.update));
};

/**
 * Open item details
 * @param {*} item to be openned
 */
BaseService.prototype.open = function(item) {
  return this.search(item, 1)
    .then((found) => found.click());
};

/**
 * Remove item from items list
 * @param {*} item ro be removed
 */
BaseService.prototype.remove = function(item) {
  var pageObject = this.pageObject;
  this.open(item)
  .then(() => pageObject.main.locators.deleteButton.isPresent())
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return pageObject.main.locators.deleteButton.click();
  })
  .then(() => pageObject.main.locators.proceedButton.isPresent())
  .then((result) => utils.expect.resultIsTrue(result))
  .then(() => pageObject.main.locators.proceedButton.click())
  .then(() => pageObject.main.locators.proceedButton.isPresent())
  .then((result) => utils.expect.resultIsFalse(result));
};

//################################################################################
//                                SEARCH FUNCTIONS
//################################################################################
/**
 * Search for specific item
 * @param {*} item to be searched
 * @param {*} count of same items
 */
BaseService.prototype.search = function(item, count) {
  var self = this;
  var pageObject = this.pageObject;

  return pageObject.main.commands.sideClick()
  .then(() => pageObject.main.commands.selfCheck())
  .then(() => self.searchForItem(item, count))
  .then(() => pageObject.main.commands.first());
};

BaseService.prototype.searchReset = function() {
  var pageObject = this.pageObject;
  return pageObject.main.commands.sideClick()
  .then(() => pageObject.main.commands.selfCheck())
  .then(() => pageObject.main.locators.search.clear());
};

//################################################################################
//                                FIELDS FUNCTIONS
//################################################################################
/**
 * Clear all Fields of item Form
 */
BaseService.prototype.clearAllFields = function() {
  var self = this;
  var pageObject = this.pageObject;
  pageObject.new.locators.itemForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(pageObject.new.locators.itemForm.fields, x => x.clear());
  })
  .then((results) => utils.expect.eachResultToBeNull(results)) // clear fields
  .then(() => self.clearOtherFields()); // clear date and time
};

//################################################################################
//                                EXPECT FUNCTIONS
//################################################################################
/**
 * Check all warnings of item Form are present
 */
BaseService.prototype.expectWarningsPresent = function() {
  var pageObject = this.pageObject;
  pageObject.new.locators.itemForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(pageObject.new.locators.itemForm.warnings, x => x.isPresent());
  })
  .then((results) => utils.expect.eachResultToBeTrue(results));
};

/**
 * Check actual element details are equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsEqualTo = function(promise, expected) {
  return this.expectElementDetails(promise, expected, utils.expect.resultIncludes);
};

/**
 * Check actual element details not equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsNotEqualTo = function(promise, expected) {
  return this.expectElementDetails(promise, expected, utils.expect.resultIsNotEqualTo);
};

/**
 * Expect item in items list
 * @param {*} item
 */
BaseService.prototype.expectToBeInList = function(expected) {
  var promise = this.search(expected, 1);
  return this.expectElementDetails(promise, expected, utils.expect.resultIncludes);
};

/**
 * Expect item not in items list
 * @param {*} item
 */
BaseService.prototype.expectNotInTheList = function(expected) {
  return this.search(expected, 0)
    .then((found) => found.isPresent())
    .then((present) => utils.expect.resultIsFalse(present));
};

//################################################################################
//                                BUTTON FUNCTIONS
//################################################################################
/**
 * Press delete button
 * TODO delete button is still present when Pressed
 */
BaseService.prototype.pressDeleteButton = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.deleteButton.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    pageObject.main.locators.deleteButton.click();
  })
  .then(() => pageObject.main.locators.deleteButton.isPresent());
  // .then((result) => utils.expect.resultIsFalse(result));
};

/**
 * Press cancel button
 */
BaseService.prototype.pressCancelButton = function() {
  var pageObject = this.pageObject;
  return utils.ui.clickButtonPromise(pageObject.main.locators.cancelButton);
};

/**
 * Press new button
 */
BaseService.prototype.pressNewButton = function() {
  var pageObject = this.pageObject;
  return utils.ui.clickButtonPromise(pageObject.main.locators.newButton);
};

/**
 * Press Cancel button on new item page
 */
BaseService.prototype.pressNewCancelButton = function() {
  var pageObject = this.pageObject;
  return utils.ui.clickButtonPromise(pageObject.new.locators.itemForm.buttons.cancel);
};

/**
 * Press edit button
 */
BaseService.prototype.pressEditButton = function() {
  var pageObject = this.pageObject;
  return utils.ui.clickButtonPromise(pageObject.main.locators.editButton);
};

/**
 * Expect New button is present on page
 */
BaseService.prototype.expectNewButtonIsPresent = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.newButton.isPresent()
    .then((result) => utils.expect.resultIsTrue(result));
};

//################################################################################
//                                OVERRIDDEN FUNCTIONS
//################################################################################

/**
 * Clear specific fields on Item Form
 */
BaseService.prototype.clearOtherFields = function() {
  throw new Error('Override this method in super class');
};

/**
 * Search item in items list
 * @param {*} item to be searched
 */
BaseService.prototype.searchForItem = function(item, count) {
  _.noop(item, count);
  throw new Error('Override this method in super class');
};

/**
 * Check if all fields of item Form are present
 */
BaseService.prototype.expectFieldsPresent = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual item details with expected
 * @param {*} item to be compared to
 */
BaseService.prototype.expectDetailsToBe = function(item) {
  _.noop(item);
  throw new Error('Override this method in super class');
};

BaseService.prototype.expectElementInfo = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual element details with expected by expect function
 * @param {*} promise element
 * @param {*} expected item details to match
 * @param {*} expectFunc function to be called to compare
 */
BaseService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  _.noop(promise, expected, expectFunc);
  throw new Error('Override this method in super class');
};

module.exports = BaseService;