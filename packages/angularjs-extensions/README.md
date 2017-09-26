# RainCatcher Angular.js Extensions

Set of angularjs directives to extend existing UI components.
Module contains example directives that we used for the demo purposes.
This module can be used as template to extend existing RainCatcher user interface.

## Extending workorders

RainCatcher by default provides minimal metadata for workorders.
Depending on business developers can add additional data like gps location, address, description. This data can be used for preview and informational purposes or even for route optimalization and scheduling workorders.

Extending workorders data is possible by providing implementation for 2 angular directives:

 - `workorder-data`: Data directive, should implement static fields that displays data.

 - `workorder-data-edit`: Data-edit directive, should implement fields that allow to change/edit data.

Directives should operate on existing field outside workorder to avoid name conflicts:
`workorder.data.yourcustomfield`

## User interface

If your user interface requires additional styles or libraries they need to be included in top level application.
Standard bootstrap and angular material directives are available in top level mobile and portal applications.

https://material.angularjs.org/latest/api

## Development

Module using grunt to build angular templates that are in `dist` folder.
To build templates use

    grunt wfmTemplate:build
    
You can also rebuild templates on every save

    grunt wfmTemplate:watch

## Integration

Entry file exposes new angular module implementation that can be mounted into root application module.
Npm module should be integrated with both mobile and portal applications in order to present additional workorder data to users.

> Note: Demo application already contains `@raincatcher-examples/angularjs-extensions` module. When adding custom module demo module should be removed to avoid collisions

## Publishing

In order to consume module it's needs to be published to public or private npm registry.

> Note: Change template package name and authors in order to publish it as your own custom module.

> Note: If you do not want to publish your module into your npm registry you can also include all directives directly in the demo application.
