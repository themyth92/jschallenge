'use strict';
module.exports = function gr(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    jshint : require('./tasks/jshint')(),
    sass : require('./tasks/sass')(),
    karma : require('./tasks/karma')(),
    ngtemplates : require('./tasks/ngtemplates')(),
    cssmin : require('./tasks/cssmin')(),
    clean : require('./tasks/clean')(),
    concat : require('./tasks/concat')(),
    uglify : require('./tasks/uglify')(),
    htmlmin : require('./tasks/htmlmin')(),
    copy : require('./tasks/copy')(),
    processhtml : require('./tasks/processhtml')()
  });

  grunt.registerTask('css', ['sass:src']);
  grunt.registerTask('quality', ['jshint:all']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['test', 'quality']);
  grunt.registerTask('build', ['clean:build', 'sass', 'cssmin', 'copy', 'ngtemplates', 'concat', 'uglify', 'processhtml', 'htmlmin', 'clean:temp']);
};
