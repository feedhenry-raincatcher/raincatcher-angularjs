# Feedhenry RainCatcher Angularjs

Reference mobile and website implementation for RainCatcher

## About RainCatcher Angularjs

RainCatcher Angularjs is reference mobile and website implementation for [Raincatcher Core Framework](https://github.com/feedhenry-raincatcher/raincatcher-core).

## Dependencies

Node v4 - https://nodejs.org
Grunt - https://gruntjs.com/getting-started
MongoDB - https://www.mongodb.com/download-center#community
Redis - https://redis.io/download
Lerna - https://lernajs.io/

## Quick start

Install all dependencies

    npm run bootstrap

Start demo applications

    npm run start

Note: Core repository will be automatically fetched using git command.
If you wish to work with different branch of the core repository please switch manually.

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

 `npm run bootstrap` - install required dependencies for modules

 `npm run start` - run demo applications
