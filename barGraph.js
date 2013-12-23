
var colorMap = {"Java":"mediumpurple", "Python":"dodgerblue", "C++":"steelblue", "Ruby":"firebrick", "PHP":"goldenrod", "Go":"chocolate", "Perl":"seagreen", "Cash":"lightgray"};

var width = 1000,
    barHeight = 30;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

d3.tsv("langData.tsv", type, function(error, data) {
  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.attr("height", barHeight * data.length);
	
  var bar = chart.selectAll("g")
      .data(data)
      .enter()
		.append("g")
      	.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1)
      .style("fill",  function(d, i) { 
          if (!(d.name in colorMap)) {
            var r = Math.floor((Math.random()*255)+20);
            var b = Math.floor((Math.random()*255)+20);
            var g = Math.floor((Math.random()*255)+20);
            var rgb = "rgb(red, blue,green)";
            rgb = rgb.replace("red", r); rgb = rgb.replace("blue", b); rgb = rgb.replace("green", g);
            colorMap[d.name] = rgb;
          }
          return colorMap[d.name]; 
        });
  bar.append("text")
     .attr("x", function(d) { return x(d.value) - 3; })
     .attr("y", barHeight / 2)
     .attr("dy", ".35em")
     .text(function(d) { return d.name; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}