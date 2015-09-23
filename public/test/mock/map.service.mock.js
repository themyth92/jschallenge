(function wrapper(angular) {
  angular.module('mock.services.map', [])
    .factory('map', map);

  function map() {
    var service = {
      buildMarkerArr : jasmine.createSpy('service.buildMarkerArr'),
      buildMap : jasmine.createSpy('service.buildMap')
    };

    return service;
  }
})(angular);
