'use strict';
module.exports = function cssmin() {
  return {
    options: {
      shorthandCompacting: false,
      roundingPrecision: -1
    },

    build : {
      files : {
        'public/build/css/bundle.min.css' : ['public/src/css/style.css']
      }
    }  
  }
}
