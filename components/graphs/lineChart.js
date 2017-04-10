import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class LineChart extends React.Component{

  render(){
		const settings = LineChart.settings;

    return(
      <div>
      <Col md={6}>
        <div className='cust'>
          <CustButtonGroup
						label='Graph type'
            buttons={[
              [{label:'Straight', active:!settings.isCurved, onClick: () => {this.setSettings({isCurved:false})} },
              {label:'Curved', active:settings.isCurved, onClick: () => {this.setSettings({isCurved:true})} }],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Line', active:!settings.isArea, onClick: () => {alert('Not yet implemented');this.setSettings({isArea:false})} },
              {label:'Area', active:settings.isArea, onClick: () => {alert('Not yet implemented');this.setSettings({isArea:true})} }],
            ]}
          />
        </div>
      </Col>


      </div>

    )
  }
  static graphName = 'LineChart';
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
        takesSingleDimension: false,
        assignedDimensions:[]
    }
  ];
  static settings = {
		isCurved:false,
    isArea:false,
  }
	setSettings(newSettings){
		LineChart.settings = {...LineChart.settings, ...newSettings};
		// console.log(LineChart.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    const hasXDimension = this.variables[0].assignedDimensions.length != 0;
    const hasYDimension = this.variables[1].assignedDimensions.length != 0;

    const canDraw = hasXDimension && hasYDimension;
    if(canDraw) {
			this.drawChart(canvas, svgSize, wholeDataset, hasXDimension, hasYDimension);
		}
  }

  static drawChart(canvas, svgSize, wholeDataset, hasXDimension, hasYDimension){
    const settings = LineChart.settings;
		// GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // GET LABEL DIMENSION
    const xAxisDimension = this.variables[0].assignedDimensions[0].dimension;

    // GET BARS DIMENSIONS
    const yAxisDimensions = [];
    this.variables[1].assignedDimensions.map(dimension => {
      yAxisDimensions.push(dimension.dimension);
    })

    //sort dataset
    const sortedDataset = wholeDataset.map(row => {
        const newRow = {};
        newRow[xAxisDimension] = row[xAxisDimension];
        yAxisDimensions.forEach(yAxisDimension => {
          newRow[yAxisDimension] = row[yAxisDimension];
        })
        return newRow;
      });

    sortedDataset.sort((a, b) => {
      return d3.ascending(a[xAxisDimension], b[xAxisDimension]);
    });

    const lineData = yAxisDimensions.map(dimension => {
      const array = [];
      sortedDataset.map(row => {
        array.push(row[dimension]);
      })
      return array;
    });

    const x = d3.scaleLinear()
              .range([0,width])
              .domain(d3.extent(sortedDataset, d => { return d[xAxisDimension]; }))
              .nice();

    const xAxis = d3.axisBottom(x)
										.tickSizeOuter(0);

		const xAxisGroup = canvas.append('g')
			.attr('class', 'x axis')
			.attr('transform', `translate(0,${height})`);

		xAxisGroup.append('g').call(xAxis);

    const y = d3.scaleLinear()
              .range([height, 0])
              .domain([
                d3.min(lineData, (column) => {return d3.min(column, (d,i) => {return column[i];})}),
                d3.max(lineData, (column) => {return d3.max(column, (d,i) => {return column[i];})}),
              ])
              .nice();

    const yAxis = d3.axisLeft(y)
										.tickSizeOuter(0);

		const yAxisGroup = canvas.append('g')
			.attr('class', 'y axis')
			.attr('transform', `translate(0,0)`);

		yAxisGroup.append('g').call(yAxis);


    const lineGenerator = d3.line()
                  .x((d,i) => {return x(sortedDataset[i][xAxisDimension]);})
                  .y(d => {return y(d);})
                  .curve(settings.isCurved ? d3.curveMonotoneX : d3.curveLinear);

    const line = canvas.selectAll('.line')
                        .data(lineData, d => {
                          return d;
                        })
                        .enter()
                        .append('g')
                        .attr('class', 'line')
                        .append('path')
                        .attr('d', lineGenerator)
                        .style('fill', 'none')
                        .style('stroke', 'black')
                        .style('stroke-width', '1.5px');

  }
}
