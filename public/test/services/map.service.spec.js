'use strict';
describe('[ Unit services/map ]', function desc() {
  var map;

  // mock data
  var data = {

    // carPark list from server
    carParkArr : [{
      id : '1',
      cars_available : 1,
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
      }
    }, {
      id : '2',
      cars_available : 1,
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
      }
    }]
  };

  beforeEach(module('services.map'));
  beforeEach(inject(function inject(_map_) {
    map = _map_;
  }));

  it('should be defined', function test() {
    expect(map).toBeDefined();
  });

  it('should return a marker array when method `buildMarkerArr` is executed', function test() {
    var markerArr;
    var expectedData = [{
      latitude : '0',
      longitude : '1',
      id : '1'
    }, {
      latitude : '0',
      longitude : '1',
      id : '2'
    }];

    markerArr = map.buildMarkerArr(data.carParkArr);
    expect(markerArr).toEqual(expectedData);
  });

  it('should return default map options object when method `buildMap` is executed', function test() {
    var expectedData = {center : {latitude : 45, longitude : -73}, zoom : 16};
    var mapOption = map.buildMap();

    expect(mapOption).toEqual(mapOption);
  });
});
