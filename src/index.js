// import geocoder from "geocoder-geojson";
// import * as d3 from "d3";

// // array of locations -- or CSV with addresses.
// let locations = [
//   { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
//   { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
//   { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
//   { address: "1600 Amphitheatre Parkway, Mountain View, CA" }
// ];
// // we just want to add the results to the features array below, to keep the geoJson model.
// let locationsModel = [{ features: [], type: "FeatureCollection" }];

// // we loop through the locations and apply geocoder to each one, then we push each result as a new item in the features array.
// locations.forEach((x, i) => {
//   geocoder.google(x.address).then(geojson => {
//     locationsModel[0].features.push(geojson.features);
//   });
// });

// // locationsModel containes all the lat/long + geoJson data based on the adddres provided.
// console.log(locationsModel);

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
D3 JS -- DO NOT USE WEBPACK -- JUST COPY PASTE THIS TO YOUR PROJECTS
*/

var diameter = 500, //max size of the bubbles
  color = d3.scaleOrdinal(d3.schemeCategory10); //color category

// Create the Buuble Layout
var bubble = d3
  .pack()
  .size([diameter, diameter])
  .padding(1.5);

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

d3.csv("./src/data.csv", function(error, data) {
  // get the hierarchy. we need to format data in a specific parent -> children model.
  // create an array with the model below
  // leave the children array blank, we'll be adding our data here!
  let nuData = [
    {
      name: "Father",
      children: []
    }
  ];

  // loop through the original data and add the items as children:
  data.forEach((x, i) => {
    // x will be each item
    // i is the index
    // we push only to the children array. We push a new object that works for us.
    nuData[0].children.push({ name: x.fruit, value: x.amount });
  });

  console.log(nuData[0]); // we need to target the index[0] so we get the data from the root.

  /* ~~~~~~~~~ MODEL
{
  "name": "Eve",
  "children": [
    {
      "name": "Cain",
      "value": "40"
    },
    {
      "name": "Seth",
      "value": "10"
    },
    {
      "name": "Abel",
      "value": "20"
    },
    {
      "name": "Awan",
      "value": "1"
    },
    {
      "name": "Azura",
      "value": "50"
    }
  ]
}
*/

  // Boilerplate to create a hierarchy. We pass our new data[0]
  var root = d3
    .hierarchy(nuData[0])
    .sum(function(d) {
      return d.value;
    })
    .sort(function(a, b) {
      return b.value - a.value;
    });

  // pass the root to our bubble() function layout.
  bubble(root);

  //setup the chart
  var bubbles = svg
    .append("g")
    .attr("transform", "translate(0,0)")
    .selectAll(".bubble")
    .data(root.children)
    .enter();

  //create the bubbles
  bubbles
    .append("circle")
    .attr("r", function(d) {
      return d.r;
    })
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .style("fill", function(d) {
      return color(d.value);
    });

  //format the text for each bubble
  bubbles
    .append("text")
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y + 5;
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      console.log(d);
      return d.data.name;
    })
    .style({
      fill: "white",
      "font-family": "Helvetica Neue, Helvetica, Arial, san-serif",
      "font-size": "12px"
    });
});
