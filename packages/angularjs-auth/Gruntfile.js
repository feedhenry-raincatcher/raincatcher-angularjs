'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var appConfig = require('./lib/constants')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      src: ["lib/**/*.js"]
    },

    mochaTest: {
      test: {
        src: ['lib/**/*-spec.js'],
        options: {
          reporter: 'Spec',
          logErrors: true,
          timeout: 10000,
          run: true
        }
      }
    },
    wfmTemplate: {
      module: appConfig.AUTH_DIRECTIVE_MODULE,
      templateDir: "lib/template",
      outputDir: "./dist"
    }
  });

  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('unit', ['eslint', 'mocha']);
  grunt.registerTask('default', ['unit']);

};
