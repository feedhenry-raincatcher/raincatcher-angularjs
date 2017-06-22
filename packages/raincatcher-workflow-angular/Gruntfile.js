module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      src: ["lib/**/*.js"]
    },
    mochaTest: {
      test: {
        src: ['lib/**/*-spec.js'],
        options: {
          reporter: 'Spec',
          logErrors: true,
          timeout: 1000,
          run: true
        }
      }
    },
    wfmTemplate: {
      module: "wfm.workflow.directives",
      templateDir: "lib/template",
      outputDir: "dist"
    }
  });
  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.registerTask('test', ['eslint', 'mochaTest']);
  grunt.registerTask('default', ['test']);
};