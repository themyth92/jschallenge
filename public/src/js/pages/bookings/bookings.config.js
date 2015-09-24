(function wrapper() {
  'use strict';
  angular.module('pages.bookings')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('base.bookings', {
      url : '/bookings',
      templateUrl : '/js/pages/bookings/bookings.tpl.html',
      controller : 'BookingsController',
      controllerAs : 'BookingsController'
    });
  }

  config.$inject = ['$stateProvider'];
})(angular);
