'use strict';
describe('[ Unit services/appData ]', function desc() {
  var appData;

  // mock data
  var data = {

    // carPark list from server
    carParkArr : [{
      id : '1',
      cars_available : '1',
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1'
    }, {
      id : '2',
      cars_available : '1',
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1'
    }]
  };

  beforeEach(module('services.appData'));
  beforeEach(inject(function inject(_appData_) {
    appData = _appData_;
  }));

  it('should be defined', function test() {
    expect(appData).toBeDefined();
    expect(appData.model).toEqual([]);
  });

  it('should added default attributes and convert cars_available datatype to model object when method `processCarParkArr` is executed', function test() {
    var expectedData = [{
      id : '1',
      cars_available : 1,
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
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
        startDate : null, endDate : null
      },

      pricePerHour : 10
    }];

    appData.processCarParkArr(data.carParkArr);
    expect(appData.model).toEqual(expectedData);
  });

  it('should find correct carPark when method `findCarPark` is executed', function test() {
    var carParkID = '2';
    var carPark;
    var expectedData = {
      id : '2',
      cars_available : 1,
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
      },

      pricePerHour : 10
    };

    appData.processCarParkArr(data.carParkArr);
    carPark = appData.findCarPark(carParkID);
    expect(carPark).toEqual(expectedData);
  });

  it('should return `undefined` when no carPark is found', function test() {
    var carParkID = '3';
    var carPark;

    appData.processCarParkArr(data.carParkArr);
    carPark = appData.findCarPark(carParkID);
    expect(carPark).toBeUndefined();
  });
});
