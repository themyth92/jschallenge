(function wrapper(angular){
  'use strict';
  angular.module('pages.carParks')
    .controller('CarParksController', CarParksController);

  function CarParksController($scope, appData, map) {
    var vm = this;

    // fix model data from service
    vm.model = appData.model;

    // temporary data for controller
    vm.data = {
      markerArr : map.buildMarkerArr(appData.model),
      map : map.buildMap()
    };

    // methods
    vm.selectCarPark = selectCarPark;

    //--------------------------
    function selectCarPark(instance, evt, marker) {
      var carParkID = marker.id;

      // broadcast event to carParkDetails directive
      $scope.$broadcast('event::carParkSelect', {carParkID : carParkID});
    }
  }

  CarParksController.$inject = ['$scope', 'appData', 'map'];
})(angular);
