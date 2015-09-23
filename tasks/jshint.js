'use strict';
module.exports = function jshint() {
  return {
    all : ['Gruntfile.js', 
           'app.js',
           'public/src/js/**/*.js',
           'public/test/**/*js'],
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
        window : true,
        document : true,
        console : true,
        TestHelper : true,
        _ : true,
        inject : true,
        spyOn : true
      }
    }
  }
} 
 