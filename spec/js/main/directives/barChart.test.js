'use strict';

describe('Directive: d3-bar', function () {
  var element,
    scope;
  // load the directive's module
  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $compile, $q) {
    scope = $rootScope.$new();
    element =
      '<d3-bar class="large-12 columns chart lines" data="chartData" label="title"></d3-lines>';

    scope.chartData = [
      {name:'PushEvent',amount:3},
      {name:'CreateEvent',amount:2},
    ];

    element = $compile(element)(scope);

    scope.$digest();
  }));

  describe('with the first given value', function() {
    it("should contain a svg tag with proper size", function() {
      scope.$apply();
      expect(element.text()).toBe('');
    });
  });
});
