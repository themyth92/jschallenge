'use strict';
describe('[ Unit pages/bookings ]', function desc() {
  var appData;
  var vm;
  var scope;
  var data = {
    model : [{
      id : '1',
      cars_available : 1,
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : '2015-01-01T01:00:00.000Z', endDate : '2015-01-01T15:00:00.000Z'
      },

      pricePerHour : 10
    }, {
      id : '2',
      cars_available : 1,
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : '2015-01-01T00:00:00.000Z', endDate : '2015-01-01T12:00:00.000Z'
      },

      pricePerHour : 10
    }, {
      id : '3',
      cars_available : 1,
      parking_shortname : 'Shortname 3',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
      },

      pricePerHour : 10
    }]
  };

  beforeEach(function beforeEach() {
    module('test.template');
    module('pages.bookings');
    module('mock.services.appData');
  });

  beforeEach(inject(function inject(_$rootScope_, _$controller_, _appData_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;

    appData = _appData_;

    // mock services
    appData.model = data.model;

    scope = $rootScope.$new();
    $controller('BookingsController as BookingsController', 
                {$scope : scope});

    vm = scope.BookingsController;
  }));

  it('should be defined', function test() {
    var expectedData = [{
      id : '1',
      cars_available : 1,
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : '2015-01-01T01:00:00.000Z', endDate : '2015-01-01T15:00:00.000Z'
      },

      pricePerHour : 10
    }, {
      id : '2',
      cars_available : 1,
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : '2015-01-01T00:00:00.000Z', endDate : '2015-01-01T12:00:00.000Z'
      },

      pricePerHour : 10
    }];

    expect(vm).toBeDefined();
    expect(vm.data.bookArr).toEqual(expectedData);
  });
});
