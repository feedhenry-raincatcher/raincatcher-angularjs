var Promise = require("bluebird");

function UserService() {
}

UserService.prototype.readUser = function readUser() {
  return Promise.resolve({
    "id": "rkX1fdSH",
    "username": "trever",
    "name": "Trever Smith",
    "position": "Senior Truck Driver",
    "phone": "2657258272",
    "email": "trever@wfm.com",
    "notes": "Trever doesn't work during the weekends.",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg",
    "banner": "http://web18.streamhoster.com/pentonmedia/beefmagazine.com/TreverStockyards_38371.jpg",
    "password": "sha1:10000:b959c88175571352c29e1e5701e587650117e20387711cd73b66366c321d361e001a51ad1c3f8b996aece681564185749f6a959e21ce7d95970dabde8b1ec82b2ace91ba368d463ebe92d1d7ec96b0d748207bbbed88b460c702131d2765de5b19c607892bd176e218c03095956d98881be5d4fe0630654c5289e7b022b6bb487c5fce0d548ac654b071301c88f2505375c110b516e25f7ccf10bc3df1624049e3008bc68ad15827eb841ae2be17855e53c2f9a6e7d575cc2b7534b10583dca3e11f020e979fd0552c76cd2cbead600abd7fb8a6619da2ecdbfbf81e518adef6c94b5521c5c4a41a14c02b9ed5619bd5fcf75c733c318356ccea74a10f9c6a4a:10c2bb710af17f75b73faf35d33874587b44bd3017e02a87a5bff57621d7a019558a660fc4a9ed476745db9812f27199fa0f8ffc3ea2dc3c5bca08913abd967c"
  });
};


UserService.prototype.getProfile = function(userId) {
  return this.readUser(userId);
};

UserService.prototype.listUsers = function listUsers() {
  return Promise.all(this.readUser());
};


angular.module('wfm.common.apiservices').service("userService", function() {
  return new UserService();
});
