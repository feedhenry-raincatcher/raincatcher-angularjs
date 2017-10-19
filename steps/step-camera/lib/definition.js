/* global Camera */
var definition = {
  "code": "camera-form",
  "name": "camera Form",
  "description": "Camera Step for RainCatcher",
  "templates": {
    "form": "<camera-form></camera-form>",
    "view": "<camera></camera>"
  },
  "cameraOptions":  {
    // Some common settings are 20, 50, and 100
    "quality": 20,
    "destinationType": Camera.DestinationType.FILE_URI,
    // In this app, dynamically set the picture source, Camera or photo gallery
    "sourceType": Camera.PictureSourceType.CAMERA,
    "encodingType": Camera.EncodingType.JPEG,
    "mediaType": Camera.MediaType.PICTURE,
    "allowEdit": true,
    "correctOrientation": true,  // corrects Android orientation quirks

    // Mostly for browser testing, These should be removed/altered on device
    "targetWidth": 100,
    "targetHeight": 100

  }
};

module.exports = definition;
