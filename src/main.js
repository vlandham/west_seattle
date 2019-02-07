require("../index.html");
require("./style");
var queue = require("queue-async");
var d3 = require("d3");
var createMap = require("./map");

var map = createMap();

function plotData(selector, data, plot) {
  d3.select(selector)
    .datum(data)
    .call(plot);
}

function display(error, data) {
  plotData("#vis", data, map);
}

queue()
  .defer(d3.json, "data/ws_topo.json")
  .await(display);

d3.select("#search").on("input", function() {
  var value = this.value.toLowerCase();
  console.log(value);
  map.highlight(value);
});

d3.selectAll(".example-link").on("click", function() {
  console.log(this.dataset.regex);
  var regex = this.dataset.regex;
  d3.select("#search").property("value", regex);
  map.highlight(regex);
});
