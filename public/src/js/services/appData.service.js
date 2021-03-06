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

    // temp data used through out the app
    service.data = {

      // indicate whether serverData has been resolved or not when change route
      appLoaded : false
    };

    return service;

    //--------------------
    function processCarParkArr(carParkArr) {

      // add booking object to store which hours user has booked this car park
      _.map(carParkArr, function map(carPark) {
        carPark.booking = {startDate : null, endDate : null};

        // add default price for each hour
        carPark.pricePerHour = 10; // default 10SGD / hour

        // convert cars_available from string to int
        carPark.cars_available = _.parseInt(carPark.cars_available);
      });

      service.model = carParkArr;
    }

    function findCarPark(carParkID) {
      return _.find(service.model, function find(carPark) {
        return carPark.id.toString() === carParkID.toString();
      });
    }
  }
})(angular, _);
