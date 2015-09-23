'use strict';
module.exports = function gr(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    jshint : require('./tasks/jshint')(),
    sass : require('./tasks/sass')(),
    karma : require('./tasks/karma')()
  });

  grunt.registerTask('css', ['sass:src']);
  grunt.registerTask('quality', ['jshint:all']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['test', 'quality']);
};
