export const graphConfig = {
  name: 'Grouped Vertical Bar Chart',
  icon: 'name of SVG icon here',

  /*
    informace pro vygenerovani potrebnych promennych k mapovani
    @label: string - text, ktery se objevi u promenne
    @desc: string - popisek pod labelem
    @isRequired: bool - redner method of graph won't be called unless at least one is assigned
    @takesSingleDimension: bool - preomenna bere pouye jednu promennou
    @mustBeNumeric: bool - promenna bere pouze numericke dimenze
  */
  graphVariables:[
      {
          label: 'Label',
          desc: 'labels on x axis',
          isRequired: true,
          takesSingleDimension: true
      },{
          label: 'Bars',
          desc: 'place number variables here',
          isRequired: true,
          mustBeNumeric: true
      }
  ],
  defaultSettings:{
      graphLabel:'Grouped Vertical Bar Chart',
      xAxisLabel:'X Axis',
      yAxisLabel:'Y Axis',

      graphLavelVisible:true,
      xAxisLabelVisible:true,
      xAxisVisible:true,
      yAxisLabelVisible:true,
      yAxisVisible:true,
      legendVisible:true,
      guidelinesVisible:true,

      xAxisPosition:'left',

      yPadding:0,
      x0Padding:0,
      x1Padding:0
  },
  graphSettings:{

  },

  /*
    informace o tom jake customizacni techniky verenderovat
    width x height a margins se nemusi spefikovat, jsou tam vzdy
    @label: stirng - text, ktery se objevi nad customizatorem
    !! objekt muze obsahovat pouze jednu velicinu, form nebo slider, pokud by měl obě, app se pokusí vyrenderovat form
    @form: array of objects - specifikuje jaka ma form vypadat a co ovlivnuje
        objekt obsahuje:
        @type: btn, btn-group, btn-vis, addon, addon-empty, input
        @text: pro btn, btn-group, addon specifikuje obsah, pro input specifikuje placeholder, muze byt i <i>
    @slider: slider input - specifikuje hodnoty jakych muze nabyvat a co ovlivnuje
  */
  graphCustomization:[
    /*
    {
      type: 'form group' / 'btn group' / 'slider' / 'color picker' / 'dropdown',
      label: 'TEXT DISPLAYED ABOVE',
      // form group
      items: [
        {
          type: 'btn' / 'btn-vis' / 'addon' / 'addon-empty' / 'input'
          // btn
          label: '',
          active: '',
          onChange: '',
          // btn-vis
          active: '',
          onChange: '',
          // addon
          label: '',
          // addon-empty
          // nic
          // input
          placeholder: '',
          value: '',
          onChange: '',
        },{
          // other parts
        }
      ],
      // btn group
      buttons: [
        // TODO doplnit
      ]
      // slider
      min: '',
      max: '',
      step: '',
      value: '',
      displayedValue: '',
      onChange: '',
      // color picker
      color: '',// from color picker API
      onChange: '',
      onChangeComplete: '',
      type: '',
      // dropdown
      items:[
        // TODO doplnit
      ],
      onChange: '',
    }*/
    {
      type: 'form group',
      label: 'TEST FORM GROUP 1',
      items: [
        {
          type: 'btn',
          label: 'B',
          active: true,
          onChange: ''
        },{
          type: 'input',
          placeholder: 'empty field',
          value: 'filled field',
          onChange: 'TO IMPLEMENT'
        },{
          type: 'addon',
          label: 'A'
        }
      ]
    },{
      type: 'form group',
      label: 'TEST FORM GROUP 2',
      items: [
        {
          type: 'btn-vis',
          active: true,
          onChange: 'TO IMPLEMENT'
        },
        {
          type: 'input',
          placeholder: 'FIELD EMPTY',
          value: 'NON EMPTY FIELD',
          onChange: 'TO IMPLEMENT',
        }
      ]
    },{
      type: 'slider',
      label: 'TEST SLIDER',
      min: 0,
      max: 100,
      step: 1,
      value: 10,
      displayedValue: 10,
      onChange: 'TO IMPLEMENT',
    }
  ]
}

export default class barChart extends React.Component {

  render() {
    console.log('test bar chart');

    return <div></div>
  }
}
//
// function barChart_group_vertical() {
//     var dimensionLabel;
//     var dimensionNames = [];
//     var dimensionValues;
//
//     var x0, x1, y, color, xAxis, yAxis, dimesnsionNames, outerBand, innerBand, legend;
//     var labelChart, labelXAxis, labelYAxis;
//
//     var xAxisVis = true,
//         yAxisVis = true,
//         guidelinesVis = true,
//         legendVis = true;
//         titleVis = true;
//
//     // redraws whole chart
//     this.drawChart = function() {
//
//         $('#canvas').empty(); // removes current bar chart before drawing new
//         dimensionLabel = '';
//         dimensionNames = [];
//
//         // read mapping for values
//         $("#dimension-label").children("li").each(function() {
//             dimensionLabel = this.innerText;
//         });
//
//         // read mapping for values
//         $("#dimension-values").children("li").each(function() {
//             dimensionNames.push(this.innerText);
//         });
//
//
//         dataset.forEach(function(d) {
//             d.dimensions = dimensionNames.map(function(name) {
//                 return {
//                     name: name,
//                     value: +d[name]
//                 };
//             });
//         });
//
//         x0 = d3.scaleBand()
//             .range([0, canvasWidth()])
//             // .domain(dataset.map(function(d) {
//             //     return d[dimensionLabel];
//             // }))
//             .domain(d3.range(dataset.length))
//             .padding(0.2)
//             .align(0.5);
//
//         x1 = d3.scaleBand()
//             .domain(dimensionNames)
//             .range([0, x0.bandwidth()])
//             .padding(0.2);
//
//         y = d3.scaleLinear()
//             .range([canvasHeight(), 0])
//             .domain([0, d3.max(dataset, function(d) {
//                 return d3.max(d.dimensions, function(d) {
//                     return d.value;
//                 });
//             })]);
//
//         color = d3.scaleOrdinal()
//             .range(d3.schemeCategory10);
//         //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//         xAxis = d3.axisBottom(x0)
//             .tickSizeOuter(0);
//
//         yAxis = d3.axisLeft(y)
//             .tickSizeOuter(0);
//
//         guidelines = d3.axisRight(y)
//             .tickSizeInner(canvasWidth())
//             .tickSizeOuter(0)
//             .tickFormat("");
//
//         // DRAW CHART
//         // draw legend
//         drawLegend();
//
//         // draw chart name
//         drawChartName();
//
//         // draw guidelines
//         drawGuidelines();
//
//         // draw bars
//         drawBars();
//         drawBarLabels();
//
//         // draw x axis and label
//         drawXAxis();
//
//         // draw y axis and label
//         drawYAxis();
//
//         drawTitle();
//
//     }
//
//     //////////////////////////////////////////////////////////////////////////////////////////
//     // DRAWING CHART METHODS
//     //////////////////////////////////////////////////////////////////////////////////////////
//     function drawChartName() {
//         svg.append("text")
//             .attr("class", "chart-name")
//             .attr("x", (canvasWidth() / 2))
//             .attr("y", 0 - (margin.top / 2))
//             .attr("text-anchor", "middle")
//             .style("font-size", "16px")
//             .text(labelChart);
//     }
//
//     function drawXAxis() {
//
//         svg.append("g")
//             .attr("class", "x axis bottom")
//             .attr("transform", "translate(0," + canvasHeight() + ")")
//             .call(xAxis)
//             // draw label
//             .append("text")
//             .attr("class", "x-axis-name")
//             .attr("text-anchor", "middle")
//             .attr("alignment-baseline", "middle")
//             .attr("x", (canvasWidth() / 2))
//             .attr("y", margin.bottom / 2)
//             .attr("fill", "#000")
//             .style("font-size", "16px")
//             .text(labelXAxis);
//
//             renameLabelsOnXAxis();
//
//         if (!xAxisVis) {
//             $(".x.axis").css("display", "none");
//         }
//     }
//
//     function renameLabelsOnXAxis() {
//         var tickNames = dataset.map(function(d){
//                 return d[dimensionLabel];
//         });
//
//         d3.select(".x.axis").selectAll("g.tick").selectAll("text")
//             .each(function(d) {
//                 d3.select(this).text(tickNames[d])
//             });
//
//
//         // remove this
//         rotateLabelsOnXAxis(-45);
//     }
//
//     function wrapLabelsOnXAxis(){}
//
//     function rotateLabelsOnXAxis(angle){
//         var axis = d3.select(".x.axis").selectAll("g.tick").selectAll("text")
//             .attr("text-anchor", "end")
//             .attr("alignment-baseline", "baseline")
//             .attr("transform", "rotate(" + angle + ")")
//             .attr("dx", "-9")
//             .attr("dy", "-.35em");
//
//
//     }
//
//     function drawYAxis() {
//         svg.append("g")
//             .attr("class", "y axis left")
//             .call(yAxis)
//             // draw label
//             .append("text")
//             .attr("class", "y-axis-name")
//             .attr("text-anchor", "right")
//             .attr("alignment-baseline", "middle")
//             .attr("transform", "rotate(-90)")
//             .attr("x", -(canvasHeight() / 2))
//             .attr("y", -(margin.left / 2))
//             .attr("fill", "#000")
//             .style("font-size", "16px")
//             .text(labelYAxis);
//
//         if (!yAxisVis) {
//             $(".y.axis").css("display", "none");
//         }
//     }
//
//     function drawGuidelines() {
//         svg.append("g")
//             .attr("class", "guidelines")
//             .call(guidelines);
//     }
//
//     function drawBars() {
//         outerBand = svg.selectAll(".outerBand")
//             .data(dataset)
//             .enter()
//             .append("g")
//             .attr("class", "outerBand")
//             // .attr("transform", function(d) {
//             //     return "translate(" + x0(d[dimensionLabel]) + ",0)";
//             // });
//             .attr("transform", function(d, i) {
//                 return "translate(" + x0(i) + ",0)";
//             });
//
//
//         innerBand = outerBand.selectAll("g")
//             .data(function(d) {
//                 return d.dimensions;
//             })
//             .enter()
//             .append("g")
//             .attr("class", "innerBand")
//             .attr("transform", function(d) {
//                 return "translate(" + x1(d.name) + ",0)";
//             });
//
//         innerBand.append("rect")
//             .attr("class", "bar")
//             .attr("y", function(d) {
//                 return y(d.value);
//             })
//             .attr("width", x1.bandwidth())
//             .attr("height", function(d) {
//                 return canvasHeight() - y(d.value);
//             })
//             .style("fill", function(d) {
//                 return color(d.name);
//             });
//     }
//
//     function drawBarLabels() {
//         innerBand.append("text")
//             .attr("class", "label")
//             .attr("x", x1.bandwidth() / 2)
//             .attr("y", function(d) {
//                 return y(d.value) + 16;
//             })
//             .attr("text-anchor", "middle")
//             .attr("fill", "white")
//             .style("font-size", "12px")
//             .style("font-weight", "normal")
//             .text(function(d) {
//                 return d.value;
//             });
//     }
//
//     function drawLegend() {
//         legend = svg.append("g")
//             .attr("class", "legend container")
//             .attr("transform", "translate(" + canvasWidth() + ",0)")
//             .selectAll(".legend.row")
//             .data(dimensionNames.slice().reverse())
//             .enter()
//             .append("g")
//             .attr("class", "legend row")
//             .attr("transform", function(d, i) {
//                 return "translate(9," + i * 20 + ")";
//             });
//
//         legend.append("rect")
//             .attr("x", 0)
//             .attr("width", 18)
//             .attr("height", 18)
//             .style("fill", color);
//
//         legend.append("text")
//             .attr("x", 27)
//             .attr("y", 9)
//             .attr("dy", ".35em")
//             .style("text-anchor", "start")
//             .text(function(d) {
//                 return d;
//             });
//     }
//
//     function drawTitle() {
//         svg.append("text")
//             .attr("class", "chart-title")
//             .attr("x", 0 )
//             .attr("y", - (margin.top / 2) )
//             .style("text-anchor", "start");
//     }
//
//     function swapXAxis() {
//
//         if (svg.select(".x.axis").classed("bottom")) {
//
//             xAxis = d3.axisTop(x0)
//                 .tickSizeOuter(0);
//
//             svg.select(".x.axis")
//                 .classed("bottom", false)
//                 .classed("top", true)
//                 .attr("transform", "translate(0,0)")
//                 .call(xAxis)
//                 // move label
//                 .select(".x-axis-name")
//                 .attr("y", -margin.top / 2);
//         } else {
//             xAxis = d3.axisBottom(x0)
//                 .tickSizeOuter(0);
//
//             svg.select(".x.axis")
//                 .classed("top", false)
//                 .classed("bottom", true)
//                 .attr("transform", "translate(0," + canvasHeight() + ")")
//                 .call(xAxis)
//                 // move label
//                 .select(".x-axis-name")
//                 .attr("y", margin.bottom / 2);
//         }
//     }
//
//     function swapYAxis() {
//
//         if (svg.select(".y.axis").classed("left")) {
//
//             yAxis = d3.axisRight(y)
//                 .tickSizeOuter(0);
//
//             svg.select(".y.axis")
//                 .classed("left", false)
//                 .classed("right", true)
//                 .attr("transform", "translate(" + canvasWidth() + ",0)")
//                 .call(yAxis)
//                 // move label
//                 .select(".y-axis-name")
//                 .attr("transform", "rotate(90)")
//                 .attr("x", canvasHeight() / 2)
//                 .attr("y", -(margin.right / 2));
//         } else {
//             yAxis = d3.axisLeft(y)
//                 .tickSizeOuter(0);
//
//             svg.select(".y.axis")
//                 .classed("right", false)
//                 .classed("left", true)
//                 .attr("transform", "translate(0,0)")
//                 .call(yAxis)
//                 // move label
//                 .select(".y-axis-name")
//                 .attr("transform", "rotate(-90)")
//                 .attr("x", -(canvasHeight() / 2))
//                 .attr("y", -(margin.left / 2));
//         }
//     }
//
//
//     function generateChartTitleHTML() {
//         var html = '<!--chart title, visibility, alignment--> \
//                         <div class="row">\
//                             <div class="form-group col-md-12">\
//                                 <label class="control-label">Title</label>\
//                                 <div class="input-group">\
//                                     <span class="input-group-btn" data-toggle="buttons">\
//                                         <!--chart title visibility-->\
//                                         <button class="btn btn-default active id="btn-cus-title-vis">\
//                                             <input type="checkbox" autocomplete="off" checked>\
//                                                 <i class="fa fa-eye"></i>\
//                                             </input>\
//                                         </button>\
//                                     </span>\
//                                     <!--chart title -->\
//                                     <input type="text" class="form-control" placeholder="Chart title" id="inp-cus-title">\
//                                     <!--chart title alignmet-->\
//                                     <span class="input-group-btn" data-toggle="buttons" id="btn-cus-title-align">\
//                                         <button class="btn btn-default active">\
//                                             <input type="radio" name="radio-cus-title-align" value="cus-title-align-left" autocomplete="off">\
//                                                 <i class="glyphicon glyphicon-object-align-left" title="Align Left"></i>\
//                                             </input>\
//                                         </button>\
//                                         <button class="btn btn-default">\
//                                             <input type="radio" name="radio-cus-title-align" value="cus-title-align-center" autocomplete="off">\
//                                                 <i class="glyphicon glyphicon-object-align-vertical" title="Align Center"></i>\
//                                             </input>\
//                                         </button>\
//                                         <button class="btn btn-default">\
//                                             <input type="radio" name="radio-cus-title-align" value="cus-title-align-right" autocomplete="off">\
//                                                 <i class="glyphicon glyphicon-object-align-right" title="Align Right"></i>\
//                                             </input>\
//                                         </button>\
//                                     </span>\
//                                 </div>\
//                             </div>\
//                         </div>';
//         return html;
//     }
//
//
//
//
// }
