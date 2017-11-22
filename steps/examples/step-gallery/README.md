# Example Gallery Step

This step exemplifies the utilization of the  `@raincatcher/camera` and `@raincatcher/filestorage-client` modules in a custom step that can take multiple pictures as part of its execution flow.

## Specifiying camera options

In order to supply options for the underlying [cordova camera plugin](https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions), supply a function that edits the default options and returns the updated version of the intended configuration:

```javascript
var galleryStep = require('@raincatcher/step-gallery');
// add thestep as a dependency of the mobile app
angular.module('wfm-mobile', [
  //...
  galleryStep.ngModule($fh, function buildOptions(camera) {
    return  {
      'quality': 20,
      // camera is the cordova plugin Camera object
      'destinationType': camera.DestinationType.FILE_URI,
      'sourceType': camera.PictureSourceType.CAMERA,
      'encodingType': camera.EncodingType.JPEG,
      'mediaType': camera.MediaType.PICTURE,
      'allowEdit': false,
      'correctOrientation': true
    };
  }, "user");
]);
```

The returned options are merged with the default ones in `@raincatcher/camera`, and the above values display the defaults.
