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

        // use startDate and endData in carPark list to indicate whether this carPark has
        // been booked or not
        if(carPark.booking.startDate !== null && carPark.booking.endDate !== null) {
          bookingList.push(carPark);
        }

        return bookingList;
      }, []);
    }
  }

  BookingsController.$inject = ['appData'];
})(angular, _);
