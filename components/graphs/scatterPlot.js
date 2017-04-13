import * as d3_core from 'd3';
import * as d3_symbol from 'd3-symbol-extra';
const d3 = {...d3_core, ...d3_symbol};
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';
import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class ScatterPlot extends React.Component{

  render(){
		const settings = ScatterPlot.settings;

    return(
      <div>
        <UI.Wrapper>
          <CustFormGroup
  					label='Graph Label'
  					items={[
  						{type : 'btn',
               label: <FontAwesome name='bold'/>,
               active: settings.chartLabel.isBold,
               onChange: () => {this.setSettings({chartLabel:{...settings.chartLabel, isBold:!settings.chartLabel.isBold}})}
              },
              {type : 'input',
               text : 'Graph label',
               value : settings.chartLabel.value,
               onChange: value => {this.setSettings({chartLabel:{...settings.chartLabel, value:value}})}
             },
              {type: 'align',
               value: settings.chartLabel.align,
               onChange: value => {this.setSettings({chartLabel:{...settings.chartLabel, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{type: 'dropdown',
							tamplate: 'fontFamily',
							active:settings.fontFamily,
							onClick: value => {this.setSettings({fontFamily:value})} },],

              [{type: 'dropdown',
							tamplate: 'fontSize',
							active:settings.fontSize,
							onClick: value => {this.setSettings({fontSize:value})} },],
            ]}
          />

        </UI.Wrapper>

        <UI.Wrapper>
          <CustButtonGroup
						label='General'
            buttons={[
              [{type:'dropdown',
							tamplate:'color',
							active:settings.color,
							onClick: value => {this.setSettings({color:value})} },]
            ]}
          />
        </UI.Wrapper>
      </div>

    )
  }
  static graphName = 'ScatterPlot';
  static variables = [
    {
      label: 'X axis',
      isRequired: true,
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Y axis',
      isRequired: true,
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Size',
      mustBeNumeric: true,
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Color',
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Shape (max. 8 uniques)',
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Label',
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
  }
	setSettings(newSettings){
		ScatterPlot.settings = {...ScatterPlot.settings, ...newSettings};
		// console.log(ScatterPlot.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
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
