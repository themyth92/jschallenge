'use strict';
module.exports = function uglify() {
  return {
    build : {
      files : {
        'public/build/js/bundle.min.js' : ['public/temp/js/build.js']
      }
    },

    lib : {
      files : {
        'public/build/js/lib.min.js' : ['public/src/libs/angular-simple-logger/angular-simple-logger.min.js']
      }
    }
  }
}
