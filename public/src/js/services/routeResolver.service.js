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

      // prevent calling server when app already request data
      if(!appData.data.appLoaded) {
        return $http

          // call localhost. From there it will call your api
          // There is some problem with your response CORS header so I need to call it this way
          .get('/api/v1/carparks')
          .success(function then(carParkArr) {
            appData.data.appLoaded = true;
            appData.processCarParkArr(carParkArr);
            return;
          })
          .error(function error(err) {

            // unhandled error
            console.log(err);
          });
      }
    }
  }

  routeResolver.$inject = ['$http', 'appData'];
})(angular);
