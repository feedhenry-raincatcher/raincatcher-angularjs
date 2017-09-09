# FeedHenry RainCatcher vehicle-inspection

A vehicle-inspection module for FeedHenry RainCatcher providing a set of directives.
The following items of a car can be checked with this module :
- Fuel
- Tires
- Lights

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.
The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('@raincatcher/vehicle-inspection').ngModule
...
])
```

##### Angular service
#### Directives

| Name | Attributes |
| ---- | ----------- |
| vehicle-inspection-form | |
| vehicle-inspection | vehicle-inspection|
