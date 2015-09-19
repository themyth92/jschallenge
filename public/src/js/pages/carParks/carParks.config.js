(function wrapper(angular) {
  'use strict';
  angular.module('pages.carParks')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('base.carParks', {
      url : '/',
      templateUrl : '/js/pages/carParks/carParks.tpl.html',
      controller : 'CarParksController',
      controllerAs : 'CarParksController'
    });
  }

  config.$inject = ['$stateProvider'];
})(angular);
