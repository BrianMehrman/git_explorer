"use strict";

describe("d3 Chart", function () {
  var d3Chart;

  beforeEach(module("d3"));

  beforeEach(function(){

    inject(function (_d3Chart_) {
     d3Chart = _d3Chart_;
    });
  });

  it("should have a render method", function () {
    expect(d3Chart.render).toEqual(jasmine.any(Function));
  });

});
