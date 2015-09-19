'use strict';
module.exports = function grunt(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    jshint : require('./tasks/jshint')(),
    sass : require('./tasks/sass')()
  });

  grunt.registerTask('css', ['sass:src']);
  grunt.registerTask('jshint', ['jshint']);
};
