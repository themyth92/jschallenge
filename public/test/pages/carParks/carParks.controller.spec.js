'use strict';
describe('[ Unit pages/carParks.controller ]', function desc() {
  var scope;
  var vm;
  var appData;
  var map;

  // mock data
  var data = {
    model : [{
      id : '1',
      cars_available : '1',
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
      cars_available : '1',
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1',
      booking : {
        startDate : null, endDate : null
      },

      pricePerHour : 10
    }],

    markerArr : [{
      latitude : '0',
      longitude : '1',
      id : '1'
    }, {
      latitude : '0',
      longitude : '1',
      id : '2'
    }],

    mapOption : {center : {latitude : 45, longitude : -73}, zoom : 16},

    marker : {
      id : '1'
    }
  };

  beforeEach(function beforeEach() {
    module('test.template');
    module('pages.carParks');
    module('mock.services.appData');
    module('mock.services.map');
  });

  beforeEach(inject(function inject(_$rootScope_, _$controller_, _appData_, _map_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;

    appData = _appData_;
    map = _map_;

    // mock services
    appData.model = data.model;
    map.buildMarkerArr.and.returnValue(data.markerArr);
    map.buildMap.and.returnValue(data.mapOption);

    scope = $rootScope.$new();
    $controller('CarParksController as CarParksController', 
                {$scope : scope});

    vm = scope.CarParksController;

    // create spy for scope.$broadcast
    spyOn(scope, '$broadcast');
  }));

  it('should be defined', function test() {
    expect(vm).toBeDefined();
    expect(vm.model).toEqual(data.model);
    expect(vm.data.markerArr).toEqual(data.markerArr);
    expect(vm.data.map).toEqual(data.mapOption);
  });

  it('should broadcast `event::carParkSelect` when marker is selected', function test() {
    var broadcastParams = {
      carParkID : data.marker.id
    };  

    vm.selectCarPark(null, null, data.marker);
    expect(scope.$broadcast).toHaveBeenCalledWith('event::carParkSelect', broadcastParams);
  });
});
