var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
Promise.all([
    d3.csv("COVID-19_Data_by_ZIP_Code.csv"),
    d3.csv("KCPD_Crime_Data_2020.csv"),
    ]).then(function(KCPD_Crime_Data_2020)
    {
      var p1 = new Promise((resolve, reject) => { 
        setTimeout(() => resolve('p1_delayed_resolution'), 1000); 
      }); 
      var p2 = new Promise((resolve, reject) => {
        reject(new Error('p2_immediate_rejection'));
      });
      Promise.all([
        p1.catch(error => { return error }),
        p2.catch(error => { return error }),
      ]).then(values => { 
        console.log(values[0]) // "p1_delayed_resolution"
        console.error(values[1]) // "Error: p2_immediate_rejection"
      })