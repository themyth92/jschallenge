module.exports = function jshint() {
  'use strict';
  return {
    all : ['Gruntfile.js', 
           'components/**/*.js', 
           'controllers/**/*.js', 
           'config/**/*.js',
           'middlewares/**/*.js',
           'models/**/*.js',
           'tests/**/*.js',
           'public/src/js/**/*.js'],
    options : {
      '-W027' : true,
      '-W043' : true,
      '-W020' : true,
      '-W097' : true,
      globals : {
        module : true,
        require : true,
        process : true,
        expect : true,
        it : true,
        describe : true,
        beforeEach : true,
        afterEach : true,
        __dirname : true,
        jasmine : true,
        xdescribe : true,
        jQuery : true,
        window : true,
        document : true
      }
    }
  }
} 
 
