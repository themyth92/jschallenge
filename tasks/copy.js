'use strict';
module.exports = function copy() {
  return {
    build : {
      files : [
        {expand : true, cwd : 'public/src/assets/', src : ['**'], dest : 'public/build/assets/'},
      ]
    }
  }
}
