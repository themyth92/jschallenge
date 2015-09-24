'use strict';
module.exports = function clean() {
  return {
    temp : {
      src : ['public/temp', 'views/temp']
    },

    build : {
      src : ['public/build', 'views/build']
    }
  }
}