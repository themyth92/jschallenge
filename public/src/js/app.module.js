(function wrapper(angular) {
  'use strict';
  angular.module('app', [
    'app.core',

    // components
    'components.spinner',

    // layouts
    'layouts.topnav',
    'layouts.pageSwitcher',

    // pages
    'pages.base',
    'pages.carParks'
  ]);
})(angular); 

// expose this function to global scope due to google map callback
function onMapReady() {
  angular.bootstrap(document, ['app'], {strictDi : true});
}
