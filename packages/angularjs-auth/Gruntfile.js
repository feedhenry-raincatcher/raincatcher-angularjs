'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var appConfig = require('./lib/constants');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      src: ["lib/**/*.js"]
    },
    wfmTemplate: {
      module: appConfig.AUTH_DIRECTIVE_MODULE,
      templateDir: "lib/template",
      outputDir: "./dist"
    }
  });

  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('unit', ['eslint']);
  grunt.registerTask('default', ['unit']);

};
