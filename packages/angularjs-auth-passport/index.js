module.exports = {
  MobileAuthService: require('./lib/mobileAuthService'),
  WebAuthService: require('./lib/webAuthService'),
  cookieInterceptor: require('./lib/cookieInterceptor'),
  tokenInterceptor: require('./lib/tokenInterceptor'),
  init: require('./lib/initApp')
};
