'use strict';
angular.module('d3')
  .factory("d3Chart", function() {

    var D3Chart = function(d3){
      var d3 = d3;
    }

    D3Chart.prototype.colorDomain = function(data){
      return function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {created_at: d.created_at, count: (+d[name] ? +d[name] : 0)};
          })
        }
      }
    }

    D3Chart.prototype.cleanDate = function(data){
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      data.forEach(function(d) {
        if (typeof(d.created_at) === 'string'){
          d.created_at = parseDate(d.created_at);
        }
      });
    }
    D3Chart.prototype.basisLine = function(svg,x,y){

      return svg.line()
        .interpolate("basis")
          .x(function(d) { return x(d.created_at); })
          .y(function(d) { return y(d.count); });
    }

    D3Chart.prototype.createAxis = function(svg,x,y,height,margin){
      // create xAxis
      svg.append("g")
          .attr("transform", "translate(0," + (height - margin.top) + ")")
          .attr("class","axis")
          .call(x);

      // create yAxis
      svg.append("g")
           .attr("class","axis")
           .call(y)
         .append("text")
           .attr("transform", "translate(0,-" + margin.top + ")")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Count");
    }

    D3Chart.prototype.addGraph = function(svg,events){
      return svg.selectAll(".git-event")
          .data(events)
        .enter().append("g")
          .attr("class", "git-event");
    }

    D3Chart.prototype.addPath = function(graph,line,color){
      graph.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });
    }

    D3Chart.prototype.addText = function(graph,x,y){
      graph.append("text")
          .datum(function(d) {
            var vals = d.values.filter(function(v){return v.created_at;});
            var i = vals.indexOf(d3.max(vals));
            return {name: d.name, value: d.values[i]};
          })
          .attr("transform", function(d) { return "translate(" + x(d.value.created_at) + "," + y(d.value.count) + ")"; })
          .attr("x", 1)
          .attr("class","event-label")
          .style("font-size","9px")
          .attr("dy", ".3em")
          .text(function(d) { return d.name; });
    }

    D3Chart.prototype.getUniqueKeys = function(data){
      var u=[];//unique list of keys
      var b = ["created_at"]; // black list
      data.forEach(function(d){
        u = u.concat(d3.keys(d).filter(function(key){return b.indexOf(key) === -1 && u.indexOf(key) === -1; }));
      });
      return u;
    }

    var renderGraph = function(d3,elem,data,chart,margin) {
        var graph = new D3Chart(d3);
        chart.selectAll('*').remove(); // clear chart

        var color = d3.scale.category10();
        // create color scale for different event types
        color.domain(graph.getUniqueKeys(data));
        graph.cleanDate(data);

        var events  = color.domain().map(graph.colorDomain(data)),                        // map data for line colors
            height  = chart.node().offsetHeight - margin.top - margin.bottom, // cal height
            width   = chart.node().offsetWidth - margin.left - margin.right,  // cal width
            svg     = d3.select(elem).append("svg")                           // create svg
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
        // scale the line to the date the event was created and number of times that event was triggerd in that day
        xScale.domain(d3.extent(data, function(d) { return d.created_at; }));
        yScale.domain([
          d3.min(events, function(e) { return d3.min(e.values, function(v) { return v.count; }); }),
          d3.max(events, function(e) { return d3.max(e.values, function(v) { return v.count; }); })
        ]);

        var line = graph.basisLine(d3.svg,xScale,yScale);

        // draw x and y axis
        graph.createAxis(svg,xAxis,yAxis,height,margin);
        // create svg groups to hold paths
        var event_graph = graph.addGraph(svg,events);
          // draw paths
          graph.addPath(event_graph,line,color);
        // draw labels for each line
        graph.addText(event_graph,xScale,yScale);

        return {
          svg: svg,
          graph: graph
        };
      }

    return {
      render: renderGraph
    };
  });
