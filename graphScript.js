
// var colorMap = {"Java":"mediumpurple", "Python":"dodgerblue", "C++":"steelblue", "Ruby":"firebrick", "PHP":"goldenrod", "Go":"chocolate", "Perl":"seagreen", "Cash":"lightgray"};

// var width = 1000,
//     barHeight = 30;

// var x = d3.scale.linear()
//     .range([0, width]);

// var chart = d3.select(".chart")
//     .attr("width", width);

// d3.tsv("langData.tsv", type, function(error, data) {
//   x.domain([0, d3.max(data, function(d) { return d.value; })]);

//   chart.attr("height", barHeight * data.length);
	
//   var bar = chart.selectAll("g")
//       .data(data)
//       .enter()
// 		.append("g")
//       	.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

//   bar.append("rect")
//       .attr("width", function(d) { return x(d.value); })
//       .attr("height", barHeight - 1)
//       .style("fill",  function(d, i) { 
//           if (!(d.name in colorMap)) {
//             var r = Math.floor((Math.random()*255)+20);
//             var b = Math.floor((Math.random()*255)+20);
//             var g = Math.floor((Math.random()*255)+20);
//             var rgb = "rgb(red, blue,green)";
//             rgb = rgb.replace("red", r); rgb = rgb.replace("blue", b); rgb = rgb.replace("green", g);
//             colorMap[d.name] = rgb;
//           }
//           return colorMap[d.name]; 
//         });
//   bar.append("text")
//      .attr("x", function(d) { return x(d.value) - 3; })
//      .attr("y", barHeight / 2)
//      .attr("dy", ".35em")
//      .text(function(d) { return d.name; });
// });

// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }

var r = 270;

var colorMap = {"Java":"mediumpurple", "Python":"dodgerblue", "C++":"steelblue", "Ruby":"firebrick", "PHP":"goldenrod", "Go":"chocolate", "Perl":"seagreen", "Cash":"lightgray"};


var color = d3.scale.ordinal()
  .range(["mediumpurple", "dodgerblue", "firebrick", "goldenrod", "darkgreen", "lightgray", "chocolate"]);

var canvas = d3.select("body").append("svg")
  .attr("width", 1500)
  .attr("height", 1500);

var group = canvas.append("g")
  .attr("transform", "translate(300, 300)");

var arc = d3.svg.arc()
  .innerRadius(190)
  .outerRadius(r);


/*
Animation Methods
*/
var arcBack = d3.svg.arc() 
        .outerRadius(r).innerRadius(r-80); 
var arcOver = d3.svg.arc()
        .outerRadius(r + 10).innerRadius(r-100);

/*
Data Binding
*/
d3.tsv("langData.tsv", type, function(error, data) {
  var pie = d3.layout.pie()
    .value(function (d) { return d.value; });
  
  var arcs = group.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "src")
    .on("mouseover", function(d) {
      d3.select(this).select("path").transition()
        .duration(900)
        .attr("d", arcOver);
    })
    .on("mouseout", function(d) {
      d3.select(this).select("path").transition()
        .duration(600)
        .attr("d", arcBack);
    });

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", function (d) { return color(d.value); });

  arcs.append("text")
    .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .attr("font-size", "0.9em")
    .text(function (d) { return d.data.name + " " + d.value.toFixed(2) + "%"; });


});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
