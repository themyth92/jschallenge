(function wrapper(angular) {
  angular.module('mock.services.appData', [])
    .factory('appData', appData);

  function appData() {
    var service = {
      processCarParkArr : jasmine.createSpy('service.processCarParkArr'),
      findCarPark : jasmine.createSpy('service.findCarPark'),
      model : []
    };

    return service;
  }
})(angular);
