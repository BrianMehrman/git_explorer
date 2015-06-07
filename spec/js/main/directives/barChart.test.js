'use strict';

describe('Directive: d3-bar', function () {
  var $compile, $rootScope, $window, $q, mockd3Service, html, element, data;
  // load the directive's module
  var testData = [
      {name:'PushEvent',amount:3},
      {name:'CreateEvent',amount:2},
    ];
  // load the directive's module
  beforeEach(module('mainApp'));

  beforeEach(function(){
    mockd3Service = {};
    module('mainApp.directives');

    module(function($provide){
      $provide.value('d3Service', mockd3Service);
    });

    inject(function ( _$compile_, _$rootScope_, _$window_, _$q_) {
      $window = _$window_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    mockd3Service.d3 = function() {
      var deferred = $q.defer();
      deferred.resolve($window.d3)
      return deferred.promise;
    }

  });

  describe('with the first given value', function() {
    beforeEach(function(){
      html   =
        '<d3-bar class="large-12 columns chart bar" data="chartData" label="title"></d3-bar>';
        element = angular.element(html);
        element = $compile(html)($rootScope);
        $rootScope.chartData = testData;
        $rootScope.$digest();
    });

    it("should contain data.", function() {
      expect(element.scope().chartData).toBe(testData);
    });

    it("should return a promise.", function(){
      expect(element.find('svg')[0]).not.toBeNull();
    });
  });
});
