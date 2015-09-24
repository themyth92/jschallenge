'use strict';
describe('[ Unit pages/bookingEdit ]', function desc() {
  var $timeout;
  var $rootScope;
  var $state;
  var $stateParams;
  var $modal;
  var appData;
  var vm;
  var util;
  var scope;
  var data;

  beforeEach(function beforeEach() {
    data = {
      params : {carParkID : '1'},
      isoStartDate : '2015-01-01T00:00:00.000Z',
      isoEndDate : '2015-01-01T12:00:00.000Z',
      altISOStartDate : '2015-01-01T01:00:00.000Z',
      altISOEndDate : '2015-01-01T15:00:00.000Z',
      startDate : new Date('2015-01-01T00:00:00.000Z'),
      endDate : new Date('2015-01-01T12:00:00.000Z'),
      altStartDate : new Date('2015-01-01T01:00:00.000Z'),
      altEndDate : new Date('2015-01-01T15:00:00.000Z'),
      price : 120,
      altPrice : 140,
      carPark : {
        id : '1',
        cars_available : 1,
        parking_shortname : 'Shortname 1',
        description : 'Desc 1',
        latitude : '0',
        longitude : '1',
        pricePerHour : 10,
        booking : {
          startDate : '2015-01-01T00:00:00.000Z',
          endDate : '2015-01-01T12:00:00.000Z'
        }
      }
    };
  });

  beforeEach(function beforeEach() {
    module('test.template');
    module('pages.bookingEdit');
    module('mock.services.appData');
    module('mock.services.modal');
    module('mock.services.state');
  });

  beforeEach(inject(function inject(_$compile_, _$rootScope_, _$timeout_, _$modal_, _$state_, _$stateParams_, _$controller_, _appData_, _util_) {
    var $compile = _$compile_;
    var $controller = _$controller_;

    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $modal = _$modal_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    appData = _appData_;
    util = _util_;

    // mock service
    $stateParams.carParkID = data.params.carParkID;
    appData.findCarPark.and.returnValue(data.carPark);
    scope = $rootScope.$new();
    $controller('BookingEditController as BookingEditController', 
                {$scope : scope});

    vm = scope.BookingEditController;
  }));

  it('should be defined', function test() {
    expect(vm).toBeDefined();
    expect(vm.view.isSubmitting).toBeFalsy();
    expect(appData.findCarPark).toHaveBeenCalledWith(data.params.carParkID);
    expect(vm.data.booking.startDate).toEqual(data.startDate);
    expect(vm.data.booking.endDate).toEqual(data.endDate);
    expect(vm.data.booking.price).toEqual(data.price);
    expect(vm.data.modalInstance).toBe(null);
    expect(vm.model).toEqual(data.carPark);
  });

  describe('{ method:cancel }', function desc() {
    it('should go to booking state', function test() {
      vm.cancel();
      expect($state.go).toHaveBeenCalledWith('base.bookings');
    });
  });

  describe('{ method:remove }', function desc() {
    it('should change view but keep data when cancel is selected from modal', function test() {
      vm.remove();
      vm.data.modalInstance.dismiss();
      expect(vm.model).toEqual(data.carPark);
      expect(vm.view.isSubmitting).toBeFalsy();
      expect(vm.data.booking.startDate).toEqual(data.startDate);
      expect(vm.data.booking.endDate).toEqual(data.endDate);
      expect(vm.data.booking.price).toBe(data.price);
    });

    it('should change view and data when confirm is selected from modal', function test() {
      var expectedModel = {
        id : '1',

        // cars available originally is 1
        // when client remove the booking, it should add 1 -> 2
        cars_available : 2,
        parking_shortname : 'Shortname 1',
        description : 'Desc 1',
        latitude : '0',
        longitude : '1',
        pricePerHour : 10,
        booking : {
          startDate : null,
          endDate : null
        }
      };

      vm.remove();
      vm.data.modalInstance.close();
      expect(vm.model).toEqual(expectedModel);
      expect(vm.view.isSubmitting).toBeFalsy();
      expect($state.go).toHaveBeenCalledWith('base.bookings', {}, {reload: true});
    });
  });

  describe('{ method:confirm }', function desc() {
    afterEach(function() {
      $timeout.verifyNoPendingTasks();
    });

    it('should not allow confirm change booking hour when startDate or endDate is not in correct format', function test() {

      // startDate is not a correct date format
      vm.data.booking.startDate = null;

      // must set price and end data to be in correct format
      vm.data.booking.endDate = data.endDate;
      vm.data.booking.price = 10;
      vm.confirm();
      
      // it should not disabled btn
      expect(vm.view.isSubmitting).toBeFalsy();
    });

    it('should not allow confirm change booking hour when price is 0', function test() {
      vm.data.booking.startDate = new Date(data.isoStartDate);
      vm.data.booking.endDate = new Date(data.isoEndDate);

      // price is set to 0
      vm.data.booking.price = 0;
      vm.confirm();

      // it should not disabled btn
      expect(vm.view.isSubmitting).toBeFalsy();
    });

    it('should change view and data when confirm is executed', function test() {
      vm.data.booking.startDate = data.altStartDate;
      vm.data.booking.endDate = data.altEndDate;
      vm.data.booking.price = data.altPrice;
      vm.confirm();

      expect(vm.view.isSubmitting).toBeTruthy();
      $timeout.flush();
    });

    it('should change view and data when confirm is success', function test() {
      var expectedModel = {
        id : '1',

        // cars available should be remained
        cars_available : 1,
        parking_shortname : 'Shortname 1',
        description : 'Desc 1',
        latitude : '0',
        longitude : '1',
        pricePerHour : 10,
        booking : {
          startDate : data.altISOStartDate,
          endDate : data.altISOEndDate
        }
      };

      vm.data.booking.startDate = data.altStartDate;
      vm.data.booking.endDate = data.altEndDate;
      vm.data.booking.price = data.altPrice;

      vm.confirm().then(function then() {
        expect(vm.model).toEqual(expectedModel);

        // view and data should be reset
        expect(vm.view.isSubmitting).toBeFalsy();
        expect(vm.data.booking.startDate).toEqual(data.altStartDate);
        expect(vm.data.booking.endDate).toEqual(data.altEndDate);
        expect(vm.data.booking.price).toBe(data.altPrice);
      });

      $timeout.flush();
    });
  });
});
