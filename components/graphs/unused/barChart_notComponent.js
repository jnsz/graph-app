import * as d3 from 'd3';

export default class BarChart {

  static graphName = 'BarChart';
  static variables = [
    {
        label: 'Label',
        desc: 'labels on x axis',
        isRequired: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    },{
        label: 'Bars',
        desc: 'place number variables here',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    }
  ];
  static settings = {
    graphLabel:'Grouped Vertical Bar Chart',
    xAxisLabel:'X Axis',
    yAxisLabel:'Y Axis',

    graphLabelVisible:true,
    xAxisLabelVisible:true,
    xAxisVisible:true,
    yAxisLabelVisible:true,
    yAxisVisible:true,
    legendVisible:true,
    guidelinesVisible:true,

    xAxisPosition:'left',

    yPadding:0,
    x0Padding:0,
    x1Padding:0.2,
  };
  static customizations = [
    {
      type: 'slider',
      label: 'Bar padding',
      min: 0,
      max: 1,
      step: 0.01,
      value: BarChart.settings.x1Padding,
      displayedValue: BarChart.settings.x1Padding,
      onChange: value => {BarChart.settings.x1Padding = value;console.log(BarChart.settings.x1Padding);},
    },
    {
      type: 'form group',
      label: 'TEST FORM GROUP 1',
      items: [
        {
          type: 'btn',
          label: 'B',
          active: BarChart.settings.graphLabelVisible,
          onChange: () => {BarChart.settings.graphLabelVisible = !BarChart.settings.graphLabelVisible;BarChart.customizations[1].items[0].active=!BarChart.customizations[1].items[0].active;console.log(BarChart.settings.graphLabelVisible);console.log(BarChart.customizations[1].items[0].active);} ,
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
    },
    {
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
    },
    {
      type: 'slider',
      label: 'TEST SLIDER',
      min: 0,
      max: 100,
      step: 1,
      value: 10,
      displayedValue: 10,
      onChange: 'NOT IMPLEMENTED',
    }
  ];

  //////////////////////////////////////////////////////////////////////////////
  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    const labelHasAssignedDimension = this.variables[0].assignedDimensions.length != 0;
    const barsHasAssignedDimension = this.variables[1].assignedDimensions.length != 0;

    const canDraw = labelHasAssignedDimension && barsHasAssignedDimension;

    if(canDraw) this.drawChart(canvas, svgSize, wholeDataset);
  }

  static drawChart(canvas, svgSize, wholeDataset){

    // GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // GET LABEL DIMENSION
    const labelDimension = this.variables[0].assignedDimensions[0].dimension;

    // GET BARS DIMENSIONS
    const barDimensions = [];
    this.variables[1].assignedDimensions.map(dimension => {
      barDimensions.push(dimension.dimension);
    })

    // simplified dataset
    const dataset = wholeDataset.map(function(d, i) {
      const row = barDimensions.map(function(dimension, index) {
        return d[dimension]
      })
      return row;
    })

    // MAX VALUE OF ALL BAR DIMENSIONS
    const domainMax = d3.max(wholeDataset, function(d){return d3.max(barDimensions, function(barDimension) {return d[barDimension];})});

    // X AXIS
    const x0 = d3.scaleBand()
                .range([0,width])
                .domain(d3.range(dataset.length))
                .padding(this.settings.x0Padding);

    const x1 = d3.scaleBand()
              .domain(d3.range(barDimensions.length))
              .range([0, x0.bandwidth()])
              .padding(this.settings.x1Padding);

    const xAxis = d3.axisBottom(x0)
                    .tickSizeOuter(0);

    canvas.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    const tickNames = wholeDataset.map(function(d){return d[labelDimension];});

    canvas.select(".x.axis").selectAll("g.tick").selectAll("text").each(function(d) {
          d3.select(this).text(tickNames[d])
    });

    // Y AXIS
    const y = d3.scaleLinear()
                .range([height,0])
                .domain([0, domainMax]);

    const yAxis = d3.axisLeft(y)
                    .tickSizeOuter(0);

    canvas.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // GUIDELINES
    const guidelines = d3.axisRight(y)
        .tickSizeInner(width)
        .tickSizeOuter(0)
        .tickFormat('');

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);

    // CREATE BARS
    const outerBand = canvas.selectAll('.outerBand')
                            .data(dataset)
                            .enter()
                            .append('g')
                            .attr('class', 'outerBand')
                            .attr('transform', function(d, i) {
                                return `translate(${x0(i)},0)`;
                            });

    const innerBand = outerBand.selectAll('g')
        .data(function(d, i) {
            return d;
        })
        .enter()
        .append('g')
        .attr('class', 'innerBand')
        .attr('transform', function(d, i) {
            return `translate(${x1(i)},0)`;
        });

    innerBand.append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) {
            return y(d);
        })
        .attr('width', x1.bandwidth())
        .attr('height', function(d) {
            return height - y(d);
        })
        .style('fill', function(d, i) {
            return color(i);
        });

  }
}
