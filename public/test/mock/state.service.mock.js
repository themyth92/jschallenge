(function wrapper(angular) {
  'use strict';
  angular.module('mock.services.state', [])
    .factory('$state', state)
    .factory('$stateParams', stateParams);

  function state() {
    var service = {
      go : jasmine.createSpy('service.go')
    };

    return service;
  }

  function stateParams() {
    var service = {};

    return service;
  }
})(angular);
