(function wrapper() {
  'use strict';
  angular.module('pages.bookingEdit')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('base.bookings.edit', {
      url : '/:carParkID/edit',
      templateUrl : '/js/pages/bookingEdit/bookingEdit.tpl.html',
      controller : 'BookingEditController',
      controllerAs : 'BookingEditController'
    });
  }

  config.$inject = ['$stateProvider'];
})(angular);
