(function wrapper(angular, _) {
  'use strict';
  angular.module('services.map', [])
    .factory('map', map);

  function map() {
    var service = {
      buildMarkerArr : buildMarkerArr,
      buildMap : buildMap
    };

    return service;

    //------------------
    function buildMarkerArr(carParkArr) {
      var markerArr = [];

      // extract 
      _.map(carParkArr, function map(carPark) {
        var latitude = carPark.latitude;
        var longitude = carPark.longitude;
        var id = carPark.id;

        markerArr.push({id : id, latitude : latitude, longitude : longitude});
      });

      return markerArr;
    }

    function buildMap() {

      // some random place in US
      return {center : {latitude : 45, longitude : -73}, zoom : 16};
    }
  }
})(angular, _);
