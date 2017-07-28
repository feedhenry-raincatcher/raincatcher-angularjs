# FeedHenry RainCatcher Portal

This is a reference/demo implementation of the Portal Client application of a RainCatcher project.

This repository should be used in conjunction with these following repos:

## Local Setup

`npm install`

## Running on a browser
After installing all dependencies, run these commands to test this application on a local browser:

`npm start`

or

`grunt serve:local --url=http://localhost:8001`

The `url` parameter should be the root of the API server application running the [`fh-sync`](https://github.com/feedhenry/fh-sync) endpoints required by the running mobile demo application. See the (demo-server)[https://github.com/feedhenry-raincatcher/raincatcher-core/blob/master/demo/server/] for an implementation of the server that is expected to be available.

## Repository structure

### `src/app`
Main folder containing the logic for the application. The app is mainly concerned in providing the setup and configuration values for the RainCatcher and angularjs modules that are used by it as well as for the [FeedHenry JavaScript SDK](https://github.com/feedhenry/fh-js-sdk).

#### `src/app/services`
Contains angularjs services that are utilized by the RainCatcher modules to retrieve data. The app has the opportunity to provide an implementation that utilizes any technoligy for data retrieval, including static fixtures for testing.

This demo application utilizes an [`fh-sync`](https://github.com/feedhenry/fh-sync)-based service, which would allow the client to work offline for extended amounts of time, syncronizing with the server whenever a data connection becomes available again.

#### `src/app/home`
Has a small angularjs controller for displaying a temporary template before data is loaded from the backend server.

#### `src/app/sass`
Contains app-wide [Sass](http://sass-lang.com/) files that are compiled by the build pipeline.

### `www/`
Generated directory containing the output files of the local build process.

This directory's contents are what is served by the local development web server.

## Running The Demo Solution Locally

The [Running The Demo Raincatcher Solution Locally](https://github.com/feedhenry-raincatcher/raincatcher-documentation/blob/master/running-locally.adoc) guide explains how to get the Raincatcher demo solution running on your local development machine. This is targeted at developers that wish to extend the existing functionality of Raincatcher modules and demo apps.
