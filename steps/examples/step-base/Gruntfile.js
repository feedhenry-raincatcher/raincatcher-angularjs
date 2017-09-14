module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    eslint: {
      src: ["lib/**/*.js"]
    },
    wfmTemplate: {
      module: "wfm.step.base",
      templateDir: "lib/angular/template",
      outputDir: "dist"
    }
  });

  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('default', ['eslint']);
};
