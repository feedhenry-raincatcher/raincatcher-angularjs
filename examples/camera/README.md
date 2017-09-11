# FeedHenry WFM Camera [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-camera.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-camera)

This module provides client services :
- A promise based wrapper around the `window.navigator.camera.getPicture`
- A desktop and a mobile Angular Service to use the camera module
- An Angular Directive

## Client-side usage

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-camera')
...
])
```

#### Integration

##### Angular service


```javascript
controller('FileListCtrl', function($window, mobileCamera, desktopCamera) {

  var captureThenUpload = function() {
    if ($window.cordova) {
      return mobileCamera.capture()
      .then(function(capture) {
        console.log(capture.fileURI);
        console.log(capture.filename);
      })
    } else {
      return desktopCamera.capture()
      .then(function(dataUrl) {
        //do stuff
      })
    }
  }
}
```

For a more complete example, please check the [demo mobile app](https://github.com/feedhenry-staff/wfm-mobile/blob/master/src/app/file/file.js).


#### Directives

| Name | Attributes |
| ---- | ----------- |
| camera | model, autostart |
