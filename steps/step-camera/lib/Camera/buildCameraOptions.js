/**
 * Default options for the cordova camera plugin
 * @param cordovaCamera Apache Cordova's Camera object
 */
function buildCameraOptions(cordovaCamera) {
  var options = {
    // Some common settings are 20, 50, and 100
    "quality": 20,
    "destinationType": cordovaCamera.DestinationType.FILE_URI,
    // In this app, dynamically set the picture source, Camera or photo gallery
    "sourceType": cordovaCamera.PictureSourceType.CAMERA,
    "encodingType": cordovaCamera.EncodingType.JPEG,
    "mediaType": cordovaCamera.MediaType.PICTURE,
    "allowEdit": true,
    "correctOrientation": true,  // corrects Android orientation quirks

    // Mostly for browser testing, These should be removed/altered on device
    "targetWidth": 100,
    "targetHeight": 100
  };

  return options;
}

module.exports = buildCameraOptions;
