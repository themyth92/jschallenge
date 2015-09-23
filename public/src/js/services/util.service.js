(function wrapper(angular) {
  'use strict';
  angular.module('services.util', [])
    .factory('util', util);

  function util() {
    var service = {
      getDefaultTomorrow : getDefaultTomorrow,
      toISOString : toISOString
    };

    return service;

    //----------------------
    function getDefaultTomorrow() {
      var tomorrow = new Date();
      
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0);
      tomorrow.setMinutes(0);
      tomorrow.setSeconds(0);
      tomorrow.setMilliseconds(0);
      return tomorrow;
    }    

    function toISOString(date) {
      return date.toISOString();
    }
  }
})(angular);
