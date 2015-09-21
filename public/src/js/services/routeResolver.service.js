(function wrapper(angular) {
  'use strict';
  angular.module('services.routeResolver', [
    'services.appData'
  ])
    .factory('routeResolver', routeResolver);

  function routeResolver($http, appData) {
    var service = {
      baseRoute : baseRoute
    };

    return service;
    
    //----------------------------
    function baseRoute() {
      
      // next date
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Query for 24 hours next date
      var start = tomorrow.getTime();
      var end = start + 24*3600*1000;
      var url = 'https://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;

      return $http
        .get(url)
        .success(function then(carParkArr) {
          appData.processCarParkArr(carParkArr);
          return;
        })
        .error(function error(err) {

          // unhandled error
          console.log(err);
        });
    }
  }

  routeResolver.$inject = ['$http', 'appData'];
})(angular);
