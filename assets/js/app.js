// Set up scatter 
var width = parseInt(d3.select("#scatter").style("width"));
var height = width-width/3.9;
var margin = 25;
var labelArea = 100;
var paddingLeft = 50;
var paddingBottom= 50;

// Create the actual canvas for the graph
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var dotRadius = 10;

// set up x axis 
// We create a group element to nest our bottom axes labels.
svg.append("g").attr("class", "xText");
// xText will allows us to select the group without excess code.
var xText = d3.select(".xText");
xText
    .append("text")
    .attr("y",0)
    .attr("data-name","income")
    .attr("data-axis","x")
    .text("Household Income")

// set up Y axis
var leftTextX = margin + paddingLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;
// We add a second label group, this time for the axis left of the chart.
svg.append("g").attr("class", "yText");
// yText will allows us to select the group without excess code.
var yText = d3.select(".yText");
yText
    .append("text")
    .attr("x",0)
    .attr("data-name","obesity")
    .attr("data-axis","x")
    .text("Obesity %")

// Import our CSV data with d3's .csv import method.
d3.csv("assets/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);
});

// Visualize function 
function visualize(vdata){
  var currentx = "income";
  var currenty = "obesity";

  var xmin;
  var xmax;
  var ymin;
  var ymax;
  // This function allows us to set up tooltip rules (see d3-tip.js).
  var toolTip = d3
  .tip()
  .attr("class", "d3-tip")
  .offset([40, -60])
  .html(function(d) {
    // x key
    var theX;
    // Grab the state name.
    var theState = "<div>" + d.state + "</div>";
    // Snatch the y value's key and value.
    var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
    // If the x key is poverty
    if (curX === "poverty") {
      // Grab the x key and a version of the value formatted to show percentage
      theX = "<div>" + curX + ": " + d[curX] + "%</div>";
    }
    else {
      // Otherwise
      // Grab the x key and a version of the value formatted to include commas after every third digit.
      theX = "<div>" +
        curX +
        ": " +
        parseFloat(d[curX]).toLocaleString("en") +
        "</div>";
    }
    // Display what we capture.
    return theState + theX + theY;
  });
  // Call the toolTip function.
  svg.call(toolTip);

  // a. change the min and max for x
  function xMinMax() {
    // min will grab the smallest datum from the selected column.
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });
    // .max will grab the largest datum from the selected column.
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }
  // b. change the min and max for y
  function yMinMax() {
    // min will grab the smallest datum from the selected column.
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });
    // .max will grab the largest datum from the selected column.
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }
  // c. change the classes (and appearance) of label text when clicked.
  function labelChange(axis, clickedText) {
    // Switch the currently active to inactive.
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);
    // Switch the text just clicked to active.
    clickedText.classed("inactive", false).classed("active", true);
  }}
  // set up scatter plot
  xMinMax();
  yMinMax();
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    // Height is inverses due to how d3 calc's y-axis placement
    .range([height - margin - labelArea, margin]);
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
});