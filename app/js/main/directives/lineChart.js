'use strict';

angular.module('mainApp.directives')
   //camel cased directive name
  .directive('d3Lines', ['d3Service','d3Chart', function(d3Service,d3Chart) {
    return {
      restrict: 'EA',
      scope: {
          data: "=",
          label: "@"
          // onClick: "&"
        },
      link: function(scope, elem, attrs) {
        d3Service.d3().then(function(d3) {
          var chart     = d3.select(elem[0]),
              margin    = {top: 30, right: 50, bottom: 20, left: 40};
          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };
          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);
          scope.render = function(data) {
            var svg = d3Chart.render(d3,elem[0],data,chart,margin);
          }
        });
      }};
   }]);
