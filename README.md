# FeedHenry RainCatcher AngularJS

Reference mobile and portal implementation for RainCatcher.

## About RainCatcher AngularJS

RainCatcher AngularJS is reference mobile and website implementation for [RainCatcher Core](https://github.com/feedhenry-raincatcher/raincatcher-core). For more information about RainCatcher please refer to core repository.

This repository extends core framework with AngularJS based user interface. Repository contains set of the modules that implements AngularJS based services and directives. Modules are used in two  demo applications:

- `Demo mobile` application which is used by field engineers to operate and execute items in workflows
- `Demo portal` application which is used by administrators to create workorders and workflows that can be consumed by field engineers.

Both demo applications require server demo application, which is located in the [RainCatcher Core](https://github.com/feedhenry-raincatcher/raincatcher-core) repository.

## Requirements

- node/npm (tested on Node v6.x (LTS))
- git

## Quick start

1. Install all dependencies for angular repository

        git clone git@github.com:feedhenry-raincatcher/raincatcher-angularjs.git
        cd raincatcher-angularjs
        npm install
        npm run bootstrap

> Note: Core repository will be automatically cloned using git command.
If you wish to work with different branch of the core repository please switch manually.

2. Install all dependencies for core repository

        cd ./core
        npm install
        npm run bootstrap

3. Start core node.js server

        npm run start

> Note: Core server requires mongodb and redis to be running on machine.
Please refer to Core documentation for more details about how to configure non standard connection urls
to this services.

4. Start demo mobile and portal applications
Change directory to angular repository

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
