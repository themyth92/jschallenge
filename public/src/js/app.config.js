(function wrapper(angular) {
  'use strict';
  angular.module('app')
    .config(config);

  function config($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  } 

  config.$inject = ['$urlRouterProvider', '$locationProvider'];
})(angular);
