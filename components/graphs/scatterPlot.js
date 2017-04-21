import * as d3_core from 'd3';
import * as d3_symbol from 'd3-symbol-extra';
const d3 = {...d3_core, ...d3_symbol};
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';

export default class ScatterPlot extends React.Component{

  render(){
		const settings = ScatterPlot.settings;

    return(
      <div>
          <UI.Size svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>
          <UI.LabelChart
            settings={settings}
            onChange={newSettings => {this.setSettings(newSettings)}}
          />

          <UI.Wrapper>
            <UI.LabelAxis
              label='X Axis'
              axisSettings={settings.xAxis}
              onChange={newSettings => {this.setSettings(newSettings)}}
            />
            <UI.LabelAxis
              label='Y Axis'
              axisSettings={settings.yAxis}
              onChange={newSettings => {this.setSettings(newSettings)}}
            />
            
          </UI.Wrapper>

          <UI.Wrapper>
            <UI.BtnGroup label="General">
              <UI.BtnGroupDropdownColor
                active={settings.color}
                onChange={value => {this.setSettings({color:value})}}
              />
            </UI.BtnGroup>
          </UI.Wrapper>
      </div>

    )
  }
  static graphName = 'ScatterPlot';
  static variables = [
    {
      label: 'X axis',
      desc: 'X coordinate of a point.',
      isRequired: true,
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Y axis',
      desc: 'Y coordinate of a point.',
      isRequired: true,
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Size',
      desc: "Maps dimesnion on symbol's volume",
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Color',
      desc: "Maps dimesnion on symbol's color",
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Shape',
      desc: "Maps dimesnion on symbol's color (max. 8 uniques).",
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Label',
      desc: "Labels points. If left empty, coordinates are used.",
      takesSingleDimension: true,
      assignedDimensions:[]
    }
  ];
  static settings = {
    chartLabel:{
      value: 'Line Chart',
      align: 'middle',
      isBold: true,
    },
		fontFamily:'Helvetica',
		fontSize:'14px',

    color: d3.schemeCategory10,

    // block 4
    xAxis:{
      visible:true,
			value: 'Label on X Axis',
			align:'middle',
	    rotation:0,
		},

		// block 5
		yAxis:{
      visible:true,
			value:'Label on Y Axis',
			align:'middle',
			guidelines:false,
			position:'left',
		},
  }
	setSettings(newSettings){
		ScatterPlot.settings = {...ScatterPlot.settings, ...newSettings};
		// console.log(ScatterPlot.settings);
		this.props.updateSVG();
	}

  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const hasXDimension = this.variables[0].assignedDimensions.length != 0;
    const hasYDimension = this.variables[1].assignedDimensions.length != 0;

    const canDraw = hasXDimension && hasYDimension;
    if(canDraw) {
			this.drawChart(canvas, svgSize, wholeDataset);
		}
  }

  static drawChart(canvas, svgSize, wholeDataset){
    const settings = ScatterPlot.settings;
    // GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // GET DIMENSIONS
    const xAxisDimension = this.variables[0].assignedDimensions[0].dimension;
    const yAxisDimension = this.variables[1].assignedDimensions[0].dimension;
    const sizeDimension = (this.variables[2].assignedDimensions.length != 0) ? this.variables[2].assignedDimensions[0].dimension : null;
    const colorDimension = (this.variables[3].assignedDimensions.length != 0) ? this.variables[3].assignedDimensions[0].dimension : null;
    const symbolDimension = (this.variables[4].assignedDimensions.length != 0) ? this.variables[4].assignedDimensions[0].dimension : null;
    const labelDimension = (this.variables[5].assignedDimensions.length != 0) ? this.variables[5].assignedDimensions[0].dimension : null;

    // CREATE REDUCED DATASET
    const dataset = wholeDataset.map(row => {
      const newRow = {};
      newRow[xAxisDimension] = row[xAxisDimension];
      newRow[yAxisDimension] = row[yAxisDimension];
      if(sizeDimension !== null) newRow[sizeDimension] = row[sizeDimension];
      if(colorDimension !== null) newRow[colorDimension] = row[colorDimension];
      if(symbolDimension !== null) newRow[symbolDimension] = row[symbolDimension];
      if(labelDimension !== null) newRow[labelDimension] = row[labelDimension];

      return newRow;
    });

    // X AXIS
    const x = d3.scaleLinear()
              .range([0,width])
              .domain(d3.extent(dataset, d => { return d[xAxisDimension]; }))
              .nice();

    const xAxis = d3.axisBottom(x)
										.tickSizeOuter(0);

		const xAxisGroup = canvas.append('g')
			.attr('class', 'x axis')
			.attr('transform', `translate(0,${height})`);

		xAxisGroup.append('g').call(xAxis);

    // Y AXIS
    const y = d3.scaleLinear()
              .range([height, 0])
              .domain(d3.extent(dataset, d => { return d[yAxisDimension]; }))
              .nice();

    const yAxis = d3.axisLeft(y)
										.tickSizeOuter(0);

		const yAxisGroup = canvas.append('g')
			.attr('class', 'y axis')
			.attr('transform', `translate(0,0)`);

		yAxisGroup.append('g').call(yAxis);

    const sizeGenerator = d3.scaleLinear()
                            .range([30,500])
                            .domain(d3.extent(dataset, d => { return d[sizeDimension]; }));

    const colorGenerator = d3.scaleOrdinal()
                            .range(settings.color);

    const symbolGenerator = d3.scaleOrdinal()
                              .range([d3.symbolCircle, d3.symbolSquare, d3.symbolTriangle, d3.symbolCross, d3.symbolDiamondSquare, d3.symbolTriangleDown, d3.symbolX, d3.symbolWye ]);

    const symbol = d3.symbol()
                  .size((sizeDimension === null) ? 100 : d => {return sizeGenerator(d[sizeDimension])})
                  .type(d => {return symbolGenerator(d[symbolDimension])});

    const dotGroup = canvas.append('g')
                      .attr('class','dots')

    const dots = dotGroup.selectAll('.dot')
                  .data(dataset)
                  .enter()
                  .append('g')
                  .attr('class', 'dot')
                  .attr('transform', d => {return `translate(${x(d[xAxisDimension])},${y(d[yAxisDimension])})`});

    dots.append('path')
        .attr('d', d => {return symbol(d)})
        .style('stroke-width','0')
        .style('fill', d => {return colorGenerator(d[colorDimension])})

    if(labelDimension !== null){
      dots.append('text')
          .attr('dx', 10)
          //.attr('font-family', 'Helvetica')
      		//.attr('font-size', '14px')
          //.attr('fill','black')
          .attr('alignment-baseline','middle')
          .text(d => {return d[labelDimension]});
    }


    ChartModel.drawChartLabel(canvas, settings, width);

  }


}
