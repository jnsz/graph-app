import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';
import * as UI from '../graph/graph-customization/CustomizerUI';

export default class LineChart extends React.Component{

  render(){
		const settings = LineChart.settings;

    return(
      <div>
        <UI.Wrapper>
          <UI.BtnGroup label="Graph type">
            <UI.BBtn
              label='Straight'
              active={!settings.isCurved}
              onChange={() => {this.setSettings({isCurved:false})}}
            />
            <UI.BBtn
              label='Curved'
              active={settings.isCurved}
              onChange={() => {this.setSettings({isCurved:true})}}
            />
          </UI.BtnGroup>

          <UI.BtnGroup label="Graph type">
            <UI.BBtn
              label='Line'
              active={!settings.isArea}
              onChange={() => {this.setSettings({isArea:false})}}
            />
            <UI.BBtn
              label='Area'
              active={settings.isArea}
              onChange={() => {this.setSettings({isArea:true})}}
            />
          </UI.BtnGroup>
        </UI.Wrapper>

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
            <UI.BColorPalette
              active={settings.color}
              onChange={value => {this.setSettings({color:value})}}
            />
          </UI.BtnGroup>
          
          <UI.BtnGroup>
            <UI.BBtn
              icon={settings.legend? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
              label='Legend'
              active={settings.legend}
              onChange={() => {this.setSettings({legend:!settings.legend})}}
            />
          </UI.BtnGroup>
        </UI.Wrapper>
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

    chartLabel:{
      value: 'Line Chart',
      align: 'middle',
      isBold: true,
    },
		fontFamily:'Helvetica',
		fontSize:'14px',

    color: d3.schemeCategory10,
    legend: false,

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

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([
        d3.min(lineData, (column) => {return d3.min(column, (d,i) => {return column[i]})}),
        d3.max(lineData, (column) => {return d3.max(column, (d,i) => {return column[i]})}),
      ])
      .nice();

    const yAxis = d3.axisLeft(y)
										.tickSizeOuter(0);

    // COLOR
    const colorGenerator = d3.scaleOrdinal().range(settings.color);

    const lineGenerator = function(){
      if(settings.isArea){
        return d3.area()
          .x((d,i) => {return x(sortedDataset[i][xAxisDimension])})
          .y0(height)
          .y1(d => {return y(d)});
      }
      else{
        return d3.line()
          .x((d,i) => {return x(sortedDataset[i][xAxisDimension])})
          .y(d => {return y(d)});
        }
    }()

    lineGenerator.curve(settings.isCurved ? d3.curveMonotoneX : d3.curveLinear);

    const line = canvas.selectAll('.line')
      .data(lineData, d => {return d})
      .enter()
      .append('g')
      .attr('class', 'line')
      .append('path')
      .attr('d', lineGenerator)

    if(settings.isArea){
      line.style('fill', (d, i) => {return colorGenerator(i)})
        .style('stroke-width', '0');
    }
    else {
      line.style('stroke', (d, i) => {return colorGenerator(i)})
        .style('fill', 'none')
        .style('stroke-width', '1.5px');
    }

    const xAxisGroup = canvas.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`);

    xAxisGroup.append('g').call(xAxis);

    const yAxisGroup = canvas.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(0,0)`);

    yAxisGroup.append('g').call(yAxis);

    // LEGEND
    if(settings.legend) ChartModel.drawLegend(canvas, width, yAxisDimensions, colorGenerator);

    // CHART LABEL
		ChartModel.drawChartLabel(canvas, settings, width);

  }
}
