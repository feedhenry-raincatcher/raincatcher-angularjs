# FeedHenry RainCatcher AngularJS Protractor Tests

User interface end to end testing for Raincatcher Demo Applications

## About RainCatcher AngularJS Protractor Tests

The Raincatcher AngularJS Protractor Tests are built using the end to end testing
framework protractor. These tests can be used to check the functionality of the
demo mobile and portal applications, and also interactions between them.

## Requirements

The Raincatcher demo applications must be running before the tests can be run. 
Please follow the steps in the root folder of the raincatcher-angularjs repository
and log into the apps to ensure they are running and security is configured correctly 

## Getting Started

For first time setup run:

```
npm install
npm run wdm:update
```

These commands will install any dependencies required and the Selenium web-driver
which is used by the Protractor framework to run the ui tests. 

Be sure to run `npm run wdm:update` every couple of weeks before running tests
to ensure that the latest Selenium driver has been downloaded and installed

Run the following commands in order to run all tests:

```
npm run wdm:start
npm run test:ui
```

To run a single test suite, for example the mobile app test suite run the 
following commands:

```
npm run wdm:start
npm run test:ui -- --suite=mobile
```

Valid test suite values are:

```
mobile
portal
mobile_portal
```

## Repository folder structure

<dl>
  <dt>data/</dt>
  <dd>The data folder contains data objects (*.do.js files) that contain data
    that will be used in our tests and a page_constants.js file which contains 
    static headers and messages related to page object elements</dd>

  <dt>page-objects/</dt>
  <dd>Page objects are a representation of the elements located on a particular 
    page that need to be interacted with during the test run. The page object files
    (*.po.js files) are separated into folders related to the app that they test, and in side 
    these folders are sub-divided into folders that group pages of a simialr type
    together</dd>

  <dt>services/</dt>
  <dd>The service folder contains a collection of service objects (*.so.js files) 
    that provide a layer of abstraction to group calls to page objects and 
    assertion checks into reusable functions that are relative to a user action. 
    Service objects are divided into folders related to the application for which 
    they are used - mobile or portal</dd>
  
  <dt>tests/</dt>
  <dd>Location of test files (*.spec.js files). These files have been grouped 
    into folders relative to the app(s) they test, such as, mobile, portal, or 
    mobile-portal interaction tests.</dd>
  
  <dt>utils/</dt>
  <dd>Set of utility files to provide protractor functionality such as assertions, 
    waits, etc.</dd>
</dl>

## Repository commands

`npm run lint` - run eslint to check code meets configured rules

`npm run wdm:update` - downloads the Selenium web-driver that is used to run the tests

`npm run wdm:start` - used to start the web-driver manager 

`npm run test:ui` - run all ui test suites

`npm run test:ui -- --suite=<TEST_SUITE_NAME>` - run a specific test suite.
