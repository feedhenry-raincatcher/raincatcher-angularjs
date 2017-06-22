# RainCatcher
Feedhenry RainCatcher Angularjs Repository
Default UI implementation for Raincatcher

## About RainCatcher angularjs

Raincatcher angularjs is default UI implementation for [Raincatcher Core Framework](https://github.com/feedhenry-raincatcher/raincatcher-core).
For more information about RainCatcher please refer to main repository.

## Repository folder structure

This repository contains many subpackages managed through [Lerna](https://lernajs.io/), and they're
contained in the following directories:

<dl>
  <dt>angularjs/</dt>
  <dd>Packages implementing angularjs directives and other ui components used in demo applications</dd>

  <dt>demo/</dt>
  <dd>Full-fledged demo applications, showcasing the usage of multiple modules</dd>

  <dt>templates/</dt>
  <dd>Templates and examples for other packages in the repository</dd>
</dl>

## Creating a new package

In order to create a new package, we recommend duplicating
[`examples/base`](./examples/base/README.md), which is a sample base that contains the skeleton
expected of a new package. Refer to the linked README for more details.

### Using modules from JavaScript

We recommend users to write their code in TypeScript, especially if their new RainCatcher-based solution is a greenfield project, however JavaScript usage is partially supported by editor plugins that will still offer suggestions based on the TypeScript interfaces and access to jsdoc annotations:

See the example on [examples/js]() for more information also for reusing the unit test suites from JavaScript code.

### Publishing modules

Before publishing the typescript modules, do a manual compilation step via `npm run build` on the root of the repository.

### Repository commands

 `npm run test` - run unit tests

 `npm run bootstrap` - perform boostrap for all modules

 `npm run start` - run demo applications
