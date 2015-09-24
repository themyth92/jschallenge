(function wrapper(angular, _) {
  'use strict';
  angular.module('pages.bookings')
    .controller('BookingsController', BookingsController);

  function BookingsController(appData) {
    var vm = this;

    vm.data = {
      bookArr : getBookingList()
    };

    //------------------
    function getBookingList() {
      return _.reduce(appData.model, function reduce(bookingList, carPark, key) {
        if(carPark.booking.startDate !== null && carPark.booking.endDate !== null) {
          bookingList.push(carPark);
        }

        return bookingList;
      }, []);
    }
  }

  BookingsController.$inject = ['appData'];
})(angular, _);
