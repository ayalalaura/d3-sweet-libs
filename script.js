//for some reason, jquery has been breaking everything... so vanilla JS is back in black😎
// $(document).ready(function(){
console.log('script loaded')

// function that takes the supplied data and plots the info onto the graph
function InitChart() {

// array of objects that hold a line key, unit value, and fun value
// each unique line value represents a different color line on the graph
// separating data into pairs for the onclick comparing fun level across units (Mulder v. Skully, Mufasa v. Scar, etc.)
var data_section = [
    {"line": "mulder", unit:1, fun:7.4},
    {"line": "mulder", unit:2, fun:6.7},
    {"line": "mulder", unit:3, fun:5},
    {"line": "mulder", unit:4, fun:4.1},
    {"line": "skully", unit:1, fun:7.5},
    {"line": "skully", unit:2, fun:7.3},
    {"line": "skully", unit:3, fun:6},
    {"line": "skully", unit:4, fun:5.5},

    {"line":"mufasa", unit:1, fun:7.7},
    {"line":"mufasa", unit:2, fun:7.3},
    {"line":"mufasa", unit:3, fun:5.7},
    {"line":"mufasa", unit:4, fun:4.9},
    {"line":"scar", unit:1, fun:6.8},
    {"line":"scar", unit:2, fun:6.3},
    {"line":"scar", unit:3, fun:5.5},
    {"line":"scar", unit:4, fun:5.3},

    {"line":"tenDays", unit:1, fun:7.9},
    {"line":"tenDays", unit:2, fun:7.8},
    {"line":"tenDays", unit:3, fun:6.4},
    {"line":"tenDays", unit:4, fun:5.3},
    {"line":"wedPlan", unit:1, fun:6.9},
    {"line":"wedPlan", unit:2, fun:6.1},
    {"line":"wedPlan", unit:3, fun:4.6},
    {"line":"wedPlan", unit:4, fun:4.6},

    {"line":"nsync", unit:1, fun:7.6},
    {"line":"nsync", unit:2, fun:7.6},
    {"line":"nsync", unit:3, fun:5.6},
    {"line":"nsync", unit:4, fun:4.4},
    {"line":"bsb", unit:1, fun:7},
    {"line":"bsb", unit:2, fun:5.6},
    {"line":"bsb", unit:3, fun:5.6},
    {"line":"bsb", unit:4, fun:6.8},

    {"line":"leo", unit:1, fun:7.5},
    {"line":"leo", unit:2, fun:7.1},
    {"line":"leo",  unit:3, fun:5.6},
    {"line":"leo",  unit:4, fun:5}

    ]; // end of data array of objects

// var grouping data for all the above objects
var allGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_section);

    console.log(JSON.stringify(allGroup));
    // this is grouping the entire data array

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//trying to plot line label to corresponding line next to u:4 fun value on y-axis. capturing u:4 fun:val for each line and setting to variable
// console.log(getObjects(data_section, '', 4));
var unitFour = getObjects(data_section, '', 4);
// console.log(unitFour);
// console.log(unitFour[1].fun) // returns all u4 fun scores
var mulder = (unitFour[0].fun) //4.1
var skully = (unitFour[1].fun) //5.5
var mufasa = (unitFour[2].fun) //4.9
var scar = (unitFour[3].fun) //5.3
var tenDays = (unitFour[4].fun) //5.3
var wedPlan = (unitFour[5].fun) //4.6
var nsync = (unitFour[6].fun) //4.4
var bsb = (unitFour[7].fun) //6.8
var leo = (unitFour[8].fun) //5

// var holding the WDI sections data
var data_wdi = [
    {"line": "mulder", unit:1, fun:7.4},
    {"line": "mulder", unit:2, fun:6.7},
    {"line": "mulder", unit:3, fun:5},
    {"line": "mulder", unit:4, fun:4.1},
    {"line": "skully", unit:1, fun:7.5},
    {"line": "skully", unit:2, fun:7.3},
    {"line": "skully", unit:3, fun:6},
    {"line": "skully", unit:4, fun:5.5}
];

// var grouping the wdi data
var wdiGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_wdi);


// var holding the data for the lions (Mufasa v. Scar)
var data_lion = [
    {"line":"mufasa", unit:1, fun:7.7},
    {"line":"mufasa", unit:2, fun:7.3},
    {"line":"mufasa", unit:3, fun:5.7},
    {"line":"mufasa", unit:4, fun:4.9},
    {"line":"scar", unit:1, fun:6.8},
    {"line":"scar", unit:2, fun:6.3},
    {"line":"scar", unit:3, fun:5.5},
    {"line":"scar", unit:4, fun:5.3}
  ];

// var grouping the lion data
var lionGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_lion);

// var holding the data for the Matts (tenDays v. wedPlan)
var data_matt=[
    {"line":"tenDays", unit:1, fun:7.9},
    {"line":"tenDays", unit:2, fun:7.8},
    {"line":"tenDays", unit:3, fun:6.4},
    {"line":"tenDays", unit:4, fun:5.3},
    {"line":"wedPlan", unit:1, fun:6.9},
    {"line":"wedPlan", unit:2, fun:6.1},
    {"line":"wedPlan", unit:3, fun:4.6},
    {"line":"wedPlan", unit:4, fun:4.6}
  ];

// var grouping the matt data
var mattGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_matt);

// var holding the boy band data
var data_band=[
    {"line":"nsync", unit:1, fun:7.6},
    {"line":"nsync", unit:2, fun:7.6},
    {"line":"nsync", unit:3, fun:5.6},
    {"line":"nsync", unit:4, fun:4.4},
    {"line":"bsb", unit:1, fun:7},
    {"line":"bsb", unit:2, fun:5.6},
    {"line":"bsb", unit:3, fun:5.6},
    {"line":"bsb", unit:4, fun:6.8}
  ];

// var grouping the boy band data
var bandGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_band);

// var holding the leo data
var data_leo=[
    {"line":"leo", unit:1, fun:7.5},
    {"line":"leo", unit:2, fun:7.1},
    {"line":"leo",  unit:3, fun:5.6},
    {"line":"leo",  unit:4, fun:5}
];

// var grouping the leo data
var leoGroup = d3.nest()
    .key(function(d) {return d.line;})
    .entries(data_leo);

var sec = d3.select("#section"),
    WIDTH = 900,
    HEIGHT = 500,
    MARGINS = {
        top: 30,
        right: 50, //20
        bottom: 30,
        left: 20
  };

//defining space below x axis based on data.length in order to make legends display
lSpace = WIDTH/allGroup.length;

//scaling x & y axis to match Fun 1-10 scale y-axis and Units 1-4 x-axis
  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 4])

  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10])

//customizing ticks
  xAxis = d3.svg.axis()
  .scale(xScale)
  .ticks(2)
  .tickFormat(function(d){
    return d
  })
  .tickSize(4, 4)
  .ticks(3),

  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(2)
  .tickFormat(function(d){
    return d;
  })
  .tickSize(1, 2)
  .ticks(5);

//appending x and y axis
  sec.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
  sec.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

// making lineGen variable (in order to call later with corresponding object)
  var lineGen = d3.svg.line()
      .x(function(d) {
          return xScale(d.unit);
      })
      .y(function(d) {
          return yScale(d.fun);
      })
      .interpolate("basis");

// this is graphing all the lines at once - default
// allGroup.forEach(function(d, i) {
//   sec.append('svg:path')
//       .attr('d', lineGen(d.values))
//       .attr('stroke', function(d, j) {
//          return "hsl(" + Math.random() * 360 + ",100%,50%)";
//         })
//         .attr('stroke-width', 2)
//         .attr('id', 'line_' + d.key)
//         .attr('fill', 'none');
// });

  function updateWDI() {

    sec.selectAll('').remove();

    wdiGroup.forEach(function(d, i) {

      sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

      sec.append("text")
        .attr("x", 900) // .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", mulder) // .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend")
        .attr("text-anchor", "start")
        .text(d.key);

        // onclick for each line
        // .on('click',function(){
        //     var active   = d.active ? false : true;
        //     var opacity = active ? 0 : 1;
        //     d3.select("#line_" + d.key).style("opacity", opacity);

        //     d.active = active;
        // })
    });
  }

  function updateLion() {
    lionGroup.forEach(function(d, i) {

      // var active   = d.active ? false : true;
      // var opacity = active ? 0 : 1;
      // d3.select("#line_" + d.key).style("opacity", opacity);

      // d.active = active;

      sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

      sec.append("text")
        .attr("x", 900) // .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", mulder) // .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend")
        .attr("text-anchor", "start")
        .text(d.key);

        // onclick for each line
        // .on('click',function(){
        //     var active   = d.active ? false : true;
        //     var opacity = active ? 0 : 1;
        //     d3.select("#line_" + d.key).style("opacity", opacity);

        //     d.active = active;
        // })
    });
  }

  function updateMatt() {
    mattGroup.forEach(function(d, i) {
      sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

      sec.append("text")
        .attr("x", 900) // .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", mulder) // .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend")
        .attr("text-anchor", "start")
        .text(d.key);

        // onclick for each line
        // .on('click',function(){
      // var active   = d.active ? false : true;
      // var opacity = active ? 0 : 1;
      // d3.select("#line_" + d.key).style("opacity", opacity);

      // d.active = active;
        // })
    });
  }

    function updateBand() {
    bandGroup.forEach(function(d, i) {
      sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

      sec.append("text")
        .attr("x", 900) // .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", mulder) // .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend")
        .attr("text-anchor", "start")
        .text(d.key);

        // onclick for each line
        // .on('click',function(){
      // var active   = d.active ? false : true;
      // var opacity = active ? 0 : 1;
      // d3.select("#line_" + d.key).style("opacity", opacity);

      // d.active = active;
        // })
    });
  }

  function updateLeo() {
    leoGroup.forEach(function(d, i) {
      sec.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d, j) {
         return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_' + d.key)
        .attr('fill', 'none');

       sec.append("text")
        .attr("x", 900) // .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", mulder) // .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend")
        .attr("text-anchor", "start")
        .text(d.key);

        // onclick for each line
        // .on('click',function(){
        //     var active   = d.active ? false : true;
        //     var opacity = active ? 0 : 1;
        //     d3.select("#line_" + d.key).style("opacity", opacity);

        //     d.active = active;
        // })
    });
  }


  // appending text for the x-axis "WDI Unit"
  sec.append("text")
      // where we want the text
      .attr("transform", "translate(850, 465)")
      // how it looks (positioning)
      .style("text-anchor", "middle")
      // what we want it to say
      .text("WDI Unit");

  // appending text for the y-axis "Fun"
  sec.append("text")
      // where we want the text
      .attr("transform", "translate(50, -36)")
      .attr("y", 6)
      .attr("dy", "3.85em")
      .style("text-anchor", "end")
      // what we want it to say
      .text("Fun");

  // adding event listeners
  var wdi = document.getElementById("wdi");
  var lion = document.getElementById("lion");
  var matt = document.getElementById("matt");
  var band = document.getElementById("band");
  var leo = document.getElementById("leo");

  wdi.addEventListener("click", updateWDI, false);
  lion.addEventListener("click", updateLion, false);
  matt.addEventListener("click", updateMatt, false);
  band.addEventListener("click", updateBand, false);
  leo.addEventListener("click", updateLeo, false);

} // end of InitChart function

InitChart(); // calling the function
