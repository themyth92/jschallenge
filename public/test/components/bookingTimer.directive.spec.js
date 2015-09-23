'use strict';
describe('[ Unit components/bookingTimer.directive ]', function desc() {
  var scope;
  var element;
  var isolateScope;
  var data = {
    hour : 10,
    price : 10
  };

  var scopeData = {
    price : data.price,
    disabled : false,
    booking : {
      startDate : TestHelper.createNewDate(),
      endDate : TestHelper.createNewDate(),
      price : 0
    }
  };

  beforeEach(function beforeEach() {
    module('test.template');
    module('components.bookingTimer');
  });

  beforeEach(inject(function inject(_$compile_, _$rootScope_) {
    var $compile = _$compile_;
    var $rootScope = _$rootScope_;

    scope = $rootScope.$new();

    // original scope data
    _.extend(scope, scopeData);
    element = $compile('<booking-timer booking="booking" disabled="disabled" price="{{price}}"></booking-timer>')(scope);
    scope.$digest();
    isolateScope = element.isolateScope();
  }));

  it('should be defined', function test() {
    expect(isolateScope).toBeDefined();
    expect(isolateScope.booking).toEqual(scope.booking);
    expect(_.parseInt(isolateScope.price)).toBe(scope.price);
    expect(isolateScope.disabled).toBe(scope.disabled);
  });

  describe('{ method:changeBookingStart }', function desc() {
    beforeEach(function beforeEach() {
      isolateScope.booking.startDate = TestHelper.createNewDate(0);
      isolateScope.booking.endDate = TestHelper.createNewDate(0);
    });
    
    it('should change `booking.endDate` to reach `booking.startDate` when `booking.startDate` reaches higher that `booking.endDate`', function test() {

      // set startDate is 10
      // endDate hour is currently 0
      isolateScope.booking.startDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingStart();

      // endDate should set its hour to be startDate (10)
      expect(isolateScope.booking.endDate.getHours()).toBe(data.hour);
    });

    it('should not change `booking.endDate` if `booking.startDate` still does not reach `booking.endDate`', function test() {

      // set startDate is 3
      // set endDate is 10
      isolateScope.booking.startDate = TestHelper.createNewDate(3);
      isolateScope.booking.endDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingStart();

      // end date should remain
      expect(isolateScope.booking.endDate.getHours()).toBe(data.hour);
    });

    it('should calculate booking price correctly when `booking.startDate` does not reach `booking.endDate`', function test() {

      // startDate is 3
      // endDate is 10
      isolateScope.booking.startDate = TestHelper.createNewDate(3);
      isolateScope.booking.endDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingStart();

      // price should be (10-3)*10
      expect(isolateScope.booking.price).toBe(70);
    });

    it('should calculate booking price correctly when `booking.startDate` is higher that `booking.endDate`', function test() {
      isolateScope.booking.startDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingStart();

      // price should always be 0
      expect(isolateScope.booking.price).toBe(0);
    });
  });

  describe('{ method:changeBookingEnd }', function desc() {
    beforeEach(function beforeEach() {
      isolateScope.booking.startDate = TestHelper.createNewDate(0);
      isolateScope.booking.endDate = TestHelper.createNewDate(0);
    });

    it('should change `booking.startDate` to reach `booking.endDate` when `booking.endDate` is lower than `booking.startDate`', function test() {

      // set startDate is 10
      // endDate hour is currently 0
      isolateScope.booking.startDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingEnd();

      // startDate should set its hour to be endDate (0)
      expect(isolateScope.booking.startDate.getHours()).toBe(0);
    });

    it('should not change `booking.startDate` if `booking.endDate` does not lower than `booking.startDate`', function test() {

      // set startDate is 3
      // set endDate is 10
      isolateScope.booking.startDate = TestHelper.createNewDate(3);
      isolateScope.booking.endDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingEnd();

      // start date should remain
      expect(isolateScope.booking.startDate.getHours()).toBe(3);
    });

    it('should calculate booking price correctly when `booking.startDate` does not reach `booking.endDate`', function test() {

      // startDate is 3
      // endDate is 10
      isolateScope.booking.startDate = TestHelper.createNewDate(3);
      isolateScope.booking.endDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingEnd();

      // price should be (10-3)*10
      expect(isolateScope.booking.price).toBe(70);
    });

    it('should calculate booking price correctly when `booking.startDate` is higher that `booking.endDate`', function test() {
      isolateScope.booking.startDate = TestHelper.createNewDate(data.hour);
      isolateScope.changeBookingEnd();

      // price should always be 0
      expect(isolateScope.booking.price).toBe(0);
    });
  });
});
