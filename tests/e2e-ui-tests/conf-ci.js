const conf = require('./conf');

conf.config.mochaOpts.reporter = 'mocha-jenkins-reporter';
conf.config.mochaOpts.bail = false;
conf.config.mochaOpts.watch = false;
console.log(conf.config.mochaOpts);

exports.config = conf.config;