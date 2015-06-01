'use strict';

angular.module('mainApp.directives')
   //camel cased directive name
   //in your HTML, this will be named as bars-chart
  .directive('d3Lines', ['d3Service', function(d3Service) {



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
              parseDate = d3.time.format("%Y-%m-%d").parse,
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
            chart.selectAll('*').remove();
            var color = d3.scale.category10();
            // create color scale for different event types
            color.domain(d3.keys(data[0]).filter(function(key) { return key !== "created_at"; }));
            data.forEach(function(d) {
              if (typeof(d.created_at) === 'string'){
                d.created_at = parseDate(d.created_at);
              }
            });
            // map data for line colors
            var events = color.domain().map(function(name) {
              return {
                name: name,
                values: data.map(function(d) {
                  return {created_at: d.created_at, count: (+d[name] ? +d[name] : 0)};
                })
              }
            });

            var height  = chart.node().offsetHeight - margin.top - margin.bottom,
                width   = chart.node().offsetWidth - margin.left - margin.right,
                svg     = d3.select(elem[0]).append("svg")
                            .attr("width", (width + margin.left + margin.right))
                            .attr("height",(height + margin.top + margin.bottom))
                            .append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
                xScale  = d3.time.scale().range([0, width - margin.right]),
                yScale  = d3.scale.linear().range([height - margin.top,0]),
                xAxis   = d3.svg.axis()
                            .scale(xScale)
                            .ticks(6)
                            .orient("bottom"),
                yAxis   = d3.svg.axis()
                            .scale(yScale)
                            .orient("left");

            // data will be represented by a path, we will draw this with a line
            var line = d3.svg.line()
              .interpolate("basis")
              .x(function(d) { return xScale(d.created_at); })
              .y(function(d) { return yScale(d.count); });

            // scale the line to the date the event was created and number of times that event was triggerd in that day
            xScale.domain(d3.extent(data, function(d) { return d.created_at; }));
            yScale.domain([
              d3.min(events, function(e) { return d3.min(e.values, function(v) { return v.count; }); }),
              d3.max(events, function(e) { return d3.max(e.values, function(v) { return v.count; }); })
            ]);
            // draw x and y axis
            svg.append("g")
              .attr("transform", "translate(0," + (height - margin.top) + ")")
              .attr("class","axis")
              .call(xAxis);
            svg.append("g")
                 .attr("class","axis")
                 .call(yAxis)
               .append("text")
                 .attr("transform", "translate(0,-" + margin.top + ")")
                 .attr("y", 6)
                 .attr("dy", ".71em")
                 .style("text-anchor", "end")
                 .text("Count");
            // create svg groups to hold paths
            var event_graph = svg.selectAll(".git-event")
                .data(events)
              .enter().append("g")
                .attr("class", "git-event");
            // draw paths
            event_graph.append("path")
              .attr("class", "line")
              .attr("d", function(d) { return line(d.values); })
              .style("stroke", function(d) { return color(d.name); });
            // draw labels for each line
            event_graph.append("text")
              .datum(function(d) {
                var vals = d.values.filter(function(v){return v.created_at;});
                var i = vals.indexOf(d3.max(vals));
                return {name: d.name, value: d.values[i]};
              })
              .attr("transform", function(d) { return "translate(" + xScale(d.value.created_at) + "," + yScale(d.value.count) + ")"; })
              .attr("x", 1)
              .attr("class","event-label")
              .style("font-size","9px")
              .attr("dy", ".3em")
              .text(function(d) { return d.name; });

          }
        });
      }};
   }]);
