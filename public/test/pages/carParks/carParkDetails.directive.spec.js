'use strict';
describe('[ Unit pages/carParkDetails ]', function desc() {
  var $timeout;
  var $rootScope;
  var $modal;
  var appData;
  var util;
  var element;
  var scope;
  var data = {
    tomorrow : TestHelper.createNewDate(),
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
        startDate : null,
        endDate : null
      }
    }
  };

  beforeEach(function beforeEach() {
    module('test.template');
    module('pages.carParks');
    module('mock.services.appData');
    module('mock.services.modal');
  });

  beforeEach(inject(function inject(_$compile_, _$rootScope_, _$timeout_, _$modal_, _appData_, _util_) {
    var $compile = _$compile_;

    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $modal = _$modal_;
    appData = _appData_;
    util = _util_;

    // mock service
    spyOn(util, 'getDefaultTomorrow').and.returnValue(data.tomorrow);

    scope = $rootScope.$new();
    scope.$apply(function apply() {
      element = $compile('<car-park-details></car-park-details>')(scope);
    });
  }));

  it('should be defined', function test() {
    expect(scope).toBeDefined();
    expect(scope.model).toEqual({});
    expect(scope.view.showPanel).toBeFalsy();
    expect(scope.view.showBookingTimer).toBeFalsy();
    expect(scope.view.showBookingPanel).toBeFalsy();
    expect(scope.view.isBookingSubmit).toBeFalsy();
    expect(scope.data.tomorrow).toBe(data.tomorrow);
    expect(scope.data.booking.startDate).toBe(null);
    expect(scope.data.booking.endDate).toBe(null);
    expect(scope.data.booking.price).toBe(null);
    expect(scope.data.modalInstance).toBe(null);
  });

  it('should open booking timer correctly', function test() {
    scope.openBookingTimer();
    expect(scope.view.showBookingTimer).toBeTruthy();
  });

  it('should close panel correctly', function test() {

    // reset model, data and view
    scope.close();
    expect(scope.model).toEqual({});
    expect(scope.view.showPanel).toBeFalsy();
    expect(scope.view.showBookingTimer).toBeFalsy();
    expect(scope.view.showBookingPanel).toBeFalsy();
    expect(scope.view.isBookingSubmit).toBeFalsy();
    expect(scope.data.tomorrow).toBe(data.tomorrow);
    expect(scope.data.booking.startDate).toBe(null);
    expect(scope.data.booking.endDate).toBe(null);
    expect(scope.data.booking.price).toBe(null);
    expect(scope.data.modalInstance).toBe(null);
  });

  describe('{ method:onCarParkSelect for already booked user }', function desc() {
    beforeEach(function beforeEach() {

      // must change startData and endDate in booking model
      data.carPark.booking.startDate = data.isoStartDate;
      data.carPark.booking.endDate = data.isoEndDate;

      appData.findCarPark.and.returnValue(data.carPark);
      $rootScope.$broadcast('event::carParkSelect', data.params);
    });

    it('should change controller value correctly when new carPark is selected', function test() {
      expect(appData.findCarPark).toHaveBeenCalledWith(data.params.carParkID);
      expect(scope.model).toEqual(data.carPark);
      expect(scope.view.showPanel).toBeTruthy();
      expect(scope.view.showBookingTimer).toBeFalsy();
      expect(scope.view.showBookingPanel).toBeFalsy();
      expect(scope.view.isBookingSubmit).toBeFalsy();
      expect(scope.data.tomorrow).toBe(data.tomorrow);
      expect(scope.data.booking.startDate).toEqual(data.startDate);
      expect(scope.data.booking.endDate).toEqual(data.endDate);
      expect(scope.data.booking.price).toBe(data.price);
      expect(scope.data.modalInstance).toBe(null);
    });

    it('should cancel booking correctly', function test() {

      // change booking startDate and endDate
      scope.data.booking.startDate = data.altStartDate;
      scope.data.booking.endDate = data.altEndDate;
      scope.data.booking.price = data.altPrice;

      // execute
      scope.cancel();
      expect(scope.model).toEqual(data.carPark);
      expect(scope.view.showPanel).toBeTruthy();
      expect(scope.view.showBookingTimer).toBeFalsy();
      expect(scope.view.showBookingPanel).toBeFalsy();
      expect(scope.view.isBookingSubmit).toBeFalsy();
      expect(scope.data.tomorrow).toBe(data.tomorrow);
      expect(scope.data.booking.startDate).toEqual(data.startDate);
      expect(scope.data.booking.endDate).toEqual(data.endDate);
      expect(scope.data.booking.price).toBe(data.price);
      expect(scope.data.modalInstance).toBe(null);
    });
    
    describe('{ method:confirm }', function desc() {
      afterEach(function() {
        $timeout.verifyNoPendingTasks();
      });

      it('should not allow confirm change booking hour when startDate or endDate is not in correct format', function test() {

        // startDate is not a correct date format
        scope.data.booking.startDate = null;

        // must set price and end data to be in correct format
        scope.data.booking.endDate = data.endDate;
        scope.data.booking.price = 10;
        scope.confirm();
        
        // it should not disabled btn
        expect(scope.view.isBookingSubmit).toBeFalsy();
      });

      it('should not allow confirm change booking hour when price is 0', function test() {
        scope.data.booking.startDate = new Date(data.isoStartDate);
        scope.data.booking.endDate = new Date(data.isoEndDate);

        // price is set to 0
        scope.data.booking.price = 0;
        scope.confirm();

        // it should not disabled btn
        expect(scope.view.isBookingSubmit).toBeFalsy();
      });

      it('should change view and data when confirm is executed', function test() {
        scope.data.booking.startDate = data.altStartDate;
        scope.data.booking.endDate = data.altEndDate;
        scope.data.booking.price = data.altPrice;
        scope.confirm();

        expect(scope.view.isBookingSubmit).toBeTruthy();
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

        scope.data.booking.startDate = data.altStartDate;
        scope.data.booking.endDate = data.altEndDate;
        scope.data.booking.price = data.altPrice;

        scope.confirm().then(function then() {
          expect(scope.model).toEqual(expectedModel);

          // view and data should be reset
          expect(scope.view.showPanel).toBeTruthy();
          expect(scope.view.showBookingTimer).toBeFalsy();
          expect(scope.view.showBookingPanel).toBeFalsy();
          expect(scope.view.isBookingSubmit).toBeFalsy();
          expect(scope.data.tomorrow).toBe(data.tomorrow);
          expect(scope.data.booking.startDate).toEqual(data.altStartDate);
          expect(scope.data.booking.endDate).toEqual(data.altEndDate);
          expect(scope.data.booking.price).toBe(data.altPrice);
          expect(scope.data.modalInstance).toBe(null);
        });

        $timeout.flush();
      });
    });

    describe('{ method:remove }', function desc() {
      it('should change view but keep data when cancel is selected from modal', function test() {
        scope.remove();
        scope.data.modalInstance.dismiss();
        expect(scope.model).toEqual(data.carPark);
        expect(scope.view.showPanel).toBeTruthy();
        expect(scope.view.showBookingTimer).toBeFalsy();
        expect(scope.view.showBookingPanel).toBeFalsy();
        expect(scope.view.isBookingSubmit).toBeFalsy();
        expect(scope.data.tomorrow).toBe(data.tomorrow);
        expect(scope.data.booking.startDate).toEqual(data.startDate);
        expect(scope.data.booking.endDate).toEqual(data.endDate);
        expect(scope.data.booking.price).toBe(data.price);
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

        scope.remove();
        scope.data.modalInstance.close();
        expect(scope.model).toEqual(expectedModel);
        expect(scope.view.showPanel).toBeTruthy();
        expect(scope.view.showBookingTimer).toBeFalsy();
        expect(scope.view.showBookingPanel).toBeTruthy();
        expect(scope.view.isBookingSubmit).toBeFalsy();
        expect(scope.data.tomorrow).toBe(data.tomorrow);
        expect(scope.data.booking.startDate).toEqual(data.tomorrow);
        expect(scope.data.booking.endDate).toEqual(data.tomorrow);
        expect(scope.data.booking.price).toBe(0);
      });
    });
  });

  describe('{ method:onCarParkSelect for new booking user }', function desc() {
    beforeEach(function beforeEach() {

      // must change startData and endDate in booking model
      data.carPark.booking.startDate = null;
      data.carPark.booking.endDate = null;

      appData.findCarPark.and.returnValue(data.carPark);
      $rootScope.$broadcast('event::carParkSelect', data.params);
    });

    it('should change controller value correctly when new carPark is selected', function test() {
      expect(appData.findCarPark).toHaveBeenCalledWith(data.params.carParkID);
      expect(scope.model).toEqual(data.carPark);
      expect(scope.view.showPanel).toBeTruthy();
      expect(scope.view.showBookingTimer).toBeFalsy();
      expect(scope.view.showBookingPanel).toBeTruthy();
      expect(scope.view.isBookingSubmit).toBeFalsy();
      expect(scope.data.tomorrow).toBe(data.tomorrow);
      expect(scope.data.booking.startDate).toBe(data.tomorrow);
      expect(scope.data.booking.endDate).toBe(data.tomorrow);
      expect(scope.data.booking.price).toBe(0);
      expect(scope.data.modalInstance).toBe(null);
    });

    it('should cancel booking correctly', function test() {

      // set data booking startDate, endDate and price 
      scope.data.booking.startDate = data.startDate;
      scope.data.booking.endDate = data.endDate;
      scope.data.booking.price = data.price;
      scope.cancel();
      expect(scope.model).toEqual(data.carPark);
      expect(scope.view.showPanel).toBeTruthy();
      expect(scope.view.showBookingTimer).toBeFalsy();
      expect(scope.view.showBookingPanel).toBeTruthy();
      expect(scope.view.isBookingSubmit).toBeFalsy();
      expect(scope.data.tomorrow).toBe(data.tomorrow);
      expect(scope.data.booking.startDate).toBe(data.tomorrow);
      expect(scope.data.booking.endDate).toBe(data.tomorrow);
      expect(scope.data.booking.price).toBe(0);
      expect(scope.data.modalInstance).toBe(null);
    });

    describe('{ method:confirm }', function desc() {
      afterEach(function() {
        $timeout.verifyNoPendingTasks();
      });

      it('should not allow confirm change booking hour when startDate or endDate is not in correct format', function test() {

        // startDate is not a correct date format
        scope.data.booking.startDate = null;

        // must set price and end data to be in correct format
        scope.data.booking.endDate = data.endDate;
        scope.data.booking.price = 10;
        scope.confirm();
        
        // it should not disabled btn
        expect(scope.view.isBookingSubmit).toBeFalsy();
      });

      it('should not allow confirm change booking hour when price is 0', function test() {
        scope.data.booking.startDate = new Date(data.isoStartDate);
        scope.data.booking.endDate = new Date(data.isoEndDate);

        // price is set to 0
        scope.data.booking.price = 0;
        scope.confirm();

        // it should not disabled btn
        expect(scope.view.isBookingSubmit).toBeFalsy();
      });

      it('should change view and data when confirm is executed', function test() {
        scope.data.booking.startDate = data.startDate;
        scope.data.booking.endDate = data.endDate;
        scope.data.booking.price = data.price;
        scope.confirm();

        expect(scope.view.isBookingSubmit).toBeTruthy();
        $timeout.flush();
      });

      it('should change view and data when confirm is success', function test() {
        var expectedModel = {
          id : '1',

          // cars available should be - 1
          cars_available : 0,
          parking_shortname : 'Shortname 1',
          description : 'Desc 1',
          latitude : '0',
          longitude : '1',
          pricePerHour : 10,
          booking : {
            startDate : data.isoStartDate,
            endDate : data.isoEndDate
          }
        };

        scope.data.booking.startDate = data.startDate;
        scope.data.booking.endDate = data.endDate;
        scope.data.booking.price = data.price;

        scope.confirm().then(function then() {
          expect(scope.model).toEqual(expectedModel);

          // view and data should be reset
          expect(scope.view.showPanel).toBeTruthy();
          expect(scope.view.showBookingTimer).toBeFalsy();
          expect(scope.view.showBookingPanel).toBeFalsy();
          expect(scope.view.isBookingSubmit).toBeFalsy();
          expect(scope.data.tomorrow).toBe(data.tomorrow);
          expect(scope.data.booking.startDate).toEqual(data.startDate);
          expect(scope.data.booking.endDate).toEqual(data.endDate);
          expect(scope.data.booking.price).toBe(data.price);
          expect(scope.data.modalInstance).toBe(null);
        });

        $timeout.flush();
      });
    });
  }); 
});
