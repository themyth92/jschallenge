(function wrapper(angular) {
  'use strict';
  angular.module('app', [
    'app.core',

    // components
    'components.spinner',

    // layouts
    'layouts.topnav',
    'layouts.pageSwitcher',
    'layouts.pageWrapperAdjust',

    // pages
    'pages.base',
    'pages.carParks',
    'pages.bookings',
    'pages.bookingEdit'
  ])
    .config(config);

  function config(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.20'
    });
  }

  config.$inject = ['uiGmapGoogleMapApiProvider'];

  // create nice loading effect although it is not neccessary
  setTimeout(function setTimeout() {
    angular.bootstrap(document, ['app'], {strictDi : true});
  }, 1000);
})(angular); 
