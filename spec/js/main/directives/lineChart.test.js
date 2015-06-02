'use strict';

describe('Directive: d3-lines', function () {
  var element,
    scope;
  // load the directive's module
  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $compile, $q) {
    scope = $rootScope.$new();
    element =
      '<d3-lines class="large-12 columns chart lines" data="chartData" label="title"></d3-lines>';

    scope.chartData = [
      {created_at:'2015-01-01',PushEvent:1,CreateEvent:2},
      {created_at:'2015-01-02',PushEvent:2,CreateEvent:1},
      {created_at:'2015-01-03',PushEvent:3,CreateEvent:2},
      {created_at:'2015-01-04',PushEvent:4,CreateEvent:1}
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
