# RainCatcher Angular.js Extensions

Set of angularjs directives to extend existing UI components.
Module contains example directives that we used for the demo purposes.
This module can be used as template to extend existing RainCatcher user interface.

## Extending workorders

Extending wororders data is possible by providing implementation for 2 directives:

 - workorder-data
 - workorder-data-edit

 `Data directive` should implement static fields that displays data.
 `Data-edit directive` should implement fields that allow to change/edit data.

Directives should operate on existing field outside workorder to avoid name conflicts:
`workorder.data.yourcustomfield`

## User interface

If your user interface requires additional styles or libraries they need to be included in top level application.
Standard bootstrap and angular material directives are available in top level mobile and portal applications.

## Development

Module using grunt to build angular templates that are in `dist` folder.
To build templates use

    grunt wfmTemplate:build

## Integration

Entry file exposes new angular module implementation that can be mounted into root application module.
Npm module should be integrated with both mobile and portal applications in order to present additional workorder data to users.
