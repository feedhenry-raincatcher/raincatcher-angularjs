const conf = require('./conf');

conf.config.mochaOpts.reporter = 'mocha-jenkins-reporter';
conf.config.mochaOpts.bail = false;
conf.config.mochaOpts.watch = false;

exports.config = conf.config;