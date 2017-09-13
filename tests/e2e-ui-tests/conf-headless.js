const conf = require('./conf');

conf.config.capabilities.chromeOptions.args.push('--headless');

conf.config.onPrepare = conf.setupExpect;

exports.config = conf.config;