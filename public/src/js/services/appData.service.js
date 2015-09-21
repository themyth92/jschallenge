(function wrapper(angular, _) {
  'use strict';
  angular.module('services.appData', [])
    .factory('appData', appData);

  function appData() {
    var service = {
      processCarParkArr : processCarParkArr,
      findCarPark : findCarPark
    };

    // should be carpark list from server
    service.model = [];

    return service;

    //--------------------
    function processCarParkArr(carParkArr) {

      // add booking object to store which hours user has booked this car park
      _.map(carParkArr, function map(carPark) {
        carPark.booking = {from : null, to : null};

        // add default price for each hour
        carPark.pricePerHour = 10; // default 10SGD / hour
      });

      // currently I already trust server data
      service.model = carParkArr;
    }

    function findCarPark(carParkID) {
      return _.find(service.model, function find(carPark) {
        return carPark.id === carParkID;
      });
    }
  }
})(angular, _);