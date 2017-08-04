# Feedhenry RainCatcher Angularjs

Reference mobile and portal implementation for RainCatcher.

## About RainCatcher Angularjs

RainCatcher Angularjs is reference mobile and website implementation for [Raincatcher Core Framework](https://github.com/feedhenry-raincatcher/raincatcher-core).

Angular.js repository contains set of the modules that implements angular.js based services and directives.
Modules are used in two different demo applications:

`Demo mobile` application which is used by field engineers to operate and execute items in workflows
`Demo portal` application which is used by administrators to create workorders and workflows that can be consumed by field engineers.

Both applications require server side demo application, which is located in the core repository.

## Requirements

- node/npm
- git

## Quick start

1. Install all dependencies for angular repository

    npm install
    npm run bootstrap

> Note: Core repository will be automatically cloned using git command.
If you wish to work with different branch of the core repository please switch manually.

2. Install all dependencies for core repository

    cd core
    npm install
    npm run bootstrap

3. Start core node.js server

    npm run start

> Note: Core server requires mongodb and redis to be running on machine.
Please refer to Core documentation for more details about how to configure non standard connection urls
to this services.

Start demo mobile and portal applications

    // change directory to angular repository
    cd ..
    npm run start

Both demo mobile and demo portal should start automatically in your browser.

## Repository folder structure

This repository contains many subpackages managed through [Lerna](https://lernajs.io/), and they're
contained in the following directories:

<dl>
  <dt>packages/</dt>
  <dd>Packages implementing angularjs directives and other ui components used in demo applications</dd>

  <dt>demo/</dt>
  <dd>Full-fledged demo applications, showcasing the usage of multiple modules</dd>

  <dt>core/client</dt>
  <dd>Client side modules from core repository</dd>
</dl>

### Repository commands

 `npm run test` - run unit tests

 `npm run bootstrap` - install required dependencies for modules and checkout core repository

 `npm run start` - run demo mobile and portal applications
