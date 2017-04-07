import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class ScatterPlot extends React.Component{

  render(){
		const settings = ScatterPlot.settings;

    return(
      <div>
      <Col md={6}>
        <div className='cust'>
          YEA!
        </div>
      </Col>
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
      label: 'Shape',
      takesSingleDimension: true,
      assignedDimensions:[]
    },{
      label: 'Label',
      takesSingleDimension: true,
      assignedDimensions:[]
    }
  ];
  static settings = {
    color: d3.schemeCategory10,
  }
	setSettings(newSettings){
		ScatterPlot.settings = {...ScatterPlot.settings, ...newSettings};
		console.log(ScatterPlot.settings);
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
                              .range(d3.symbols);

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

  }
}
