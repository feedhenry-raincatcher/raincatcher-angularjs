module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      src: ["lib/**/*.js"]
    },
    wfmTemplate: {
      module: "wfm.workflow.directives",
      templateDir: "lib/template",
      outputDir: "dist"
    }
  });
  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('default', ['test']);
};