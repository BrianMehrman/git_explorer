"use strict";

describe("d3 Service", function () {
  var $document, $q, $rootScope, d3Service;

  beforeEach(module("mainApp"));

  beforeEach(function(){
    module('mainApp.directives');

    inject(function (_d3Service_, _$document_, _$rootScope_, _$q_) {
      $document = _$document_;
      $rootScope = _$rootScope_;
      d3Service = _d3Service_;
      $q = _$q_;
    });
  });

  it("should have d3 method", function () {
    expect(d3Service.d3).toEqual(jasmine.any(Function));
  });

});
