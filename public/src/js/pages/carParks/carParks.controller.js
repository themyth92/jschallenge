(function wrapper(angular){
  'use strict';
  angular.module('pages.carParks')
    .controller('CarParksController', CarParksController);

  function CarParksController($scope) {
    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  }

  CarParksController.$inject = ['$scope'];
})(angular);
