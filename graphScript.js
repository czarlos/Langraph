var r = 270;

var colorMap = {"Java":"mediumpurple", "Python":"dodgerblue", "C++":"steelblue", "Ruby":"firebrick", "PHP":"goldenrod", "Go":"chocolate", "Perl":"seagreen", "Cash":"lightgray"};


var color = d3.scale.ordinal()
  .range(["mediumpurple", "dodgerblue", "firebrick", "goldenrod", "darkgreen", "lightgray", "chocolate"]);

var canvas = d3.select("body").append("svg")
  .attr("width", 1500)
  .attr("height", 1500);

var group = canvas.append("g")
  .attr("transform", "translate(300, 300)");

var centerText = canvas.append("g")
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
    .attr("class", "src");

  function mouseOverEvent (d) {
    
          //d3.select(this).select("path").attr("fill", "#CC66FF");
      centerText.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "1.5em")
        .text(d.data.name + " \r\n" +d.data.value.toFixed(2) + "%");

      d3.select(this).select("path").transition()
        .duration(600)
        .attr("d", arcOver);
  }

  function mouseOutEvent (d) {
      //arcs.select("text").remove();
      //d3.select(this).select("text").remove();
      centerText.selectAll("text").remove();
      d3.select(this).select("path").transition()
        .duration(400)
        .attr("d", arcBack);
  }

  var mouseOver = arcs.on("mouseover", mouseOverEvent);
  var mouseOut = arcs.on("mouseout", mouseOutEvent);


  arcs.append("path")
    .attr("d", arc)
    .attr("fill", function (d) { return color(d.value); });

  arcs.append("text")
    .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .attr("font-size", "0.9em")
    .text(function (d) { return d.data.name });


});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
