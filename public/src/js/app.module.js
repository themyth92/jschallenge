(function wrapper(angular) {
  'use strict';
  angular.module('app', [
    'app.core',

    // layouts
    'layouts.topnav'
  ]);
})(angular); 

// expose this function to global scope due to google map callback
function onMapReady() {
  angular.bootstrap(document, ['app']);
}
