'use strict';

angular.module('mainApp.directives')
   //camel cased directive name
   //in your HTML, this will be named as bars-chart
  .directive('d3Bars', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
          data: "=",
          label: "@"
          // onClick: "&"
        },
      link: function(scope, elem, attrs) {
        d3Service.d3().then(function(d3) {

          var svg   = d3.select(elem[0])
                            .append('svg')
                            .style('width', '100%'),
              margin  = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 26,
              barPadding = parseInt(attrs.barPadding) || 5,
              width   = d3.select(elem[0]).node().offsetWidth - margin;

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
            // our custom d3 code
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            // setup variables
            var width = d3.select(elem[0]).node().offsetWidth - margin,
                // calculate the height
                height = scope.data.length * (barHeight + barPadding),
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.amount;
                  })])
                  .range([0, width]);

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll('rect')
              .data(data).enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin/2))
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) { return color(d.amount); })
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return xScale(d.amount);
                  });

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("y", function(d, i){ return i * (barHeight + barPadding) + 20})
                .attr("x", 15)
                .text(function(d){return d.name});
          }
        });
      }};
   }]);
