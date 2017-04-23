import * as d3 from 'd3';
import { Col, Row, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';
import * as UI from '../graph/graph-customization/CustomizerUI';

export default class LineChart extends React.Component{

  render(){
		const settings = LineChart.settings;

    return(
      <div>
        <UI.Size svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>
        <UI.Wrapper>
            <UI.BtnGroup label="General">
              <ButtonGroup justified style={{paddingRight:'5px'}}>
                <UI.BtnGroupBtn
                  label='Straight'
                  active={!settings.isCurved}
                  onChange={() => {this.setSettings({isCurved:false})}}
                />
                <UI.BtnGroupBtn
                  label='Curved'
                  active={settings.isCurved}
                  onChange={() => {this.setSettings({isCurved:true})}}
                />
              </ButtonGroup>

              <ButtonGroup justified style={{paddingLeft:'5px'}}>
                <UI.BtnGroupBtn
                  label='Line'
                  active={!settings.isArea}
                  onChange={() => {this.setSettings({isArea:false})}}
                />
                <UI.BtnGroupBtn
                  label='Area'
                  active={settings.isArea}
                  onChange={() => {this.setSettings({isArea:true})}}
                />
              </ButtonGroup>
            </UI.BtnGroup>

            <UI.BtnGroup>
              <UI.BtnGroupDropdownColor
                active={settings.color}
                onChange={value => {this.setSettings({color:value})}}
              />
            </UI.BtnGroup>

            <UI.BtnGroup>
              <UI.BtnGroupBtn
                icon={settings.legend? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
                label='Legend'
                active={settings.legend}
                onChange={() => {this.setSettings({legend:!settings.legend})}}
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

          <UI.MinMaxDomain
            label='Domain'
            automaticDomain={settings.automaticDomainX}
            domain={settings.domainX}
            onChange={newDomain => {this.setSettings({domainX:newDomain})}}
            onAuto={() => {this.setSettings({automaticDomainX:!settings.automaticDomainX})}}
          />
        </UI.Wrapper>
        <UI.Wrapper>
          <UI.LabelAxis
            label='Y Axis'
            axisSettings={settings.yAxis}
            onChange={newSettings => {this.setSettings(newSettings)}}
          />
          <UI.BtnGroup>
            <UI.BtnGroupBtn
              label='Left'
              active={settings.yAxis.position === 'left'}
              onChange={() => {this.setSettings({yAxis:{...settings.yAxis, position:'left'}})}}
            />
            <UI.BtnGroupBtn
              label='Right'
              active={settings.yAxis.position === 'right'}
              onChange={() => {this.setSettings({yAxis:{...settings.yAxis, position:'right'}})}}
            />
          </UI.BtnGroup>
          <UI.MinMaxDomain
            label='Domain'
            automaticDomain={settings.automaticDomainY}
            domain={settings.domainY}
            onChange={newDomain => {this.setSettings({domainY:newDomain})}}
            onAuto={() => {this.setSettings({automaticDomainY:!settings.automaticDomainY})}}
          />
        </UI.Wrapper>


      </div>

    )
  }
  static graphName = 'LineChart';
  static variables = [
    {
        label: 'X axis',
        desc: 'Values get sorted first. Then get displayed on axis.',
        isRequired: true,
        mustBeNumeric: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    },{
        label: 'Y axis',
        desc: 'Values displayed on y axis.',
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
        value: 'Title of the graph',
        align: 'middle',
        isBold: true,
      },
  		fontFamily:'Helvetica',
  		fontSize:'14px',

      color: d3.schemeCategory10,
      legend: false,

      xAxis:{
        visible:true,
  			value: 'Label on X Axis',
  			align:'middle',
  	    rotation:0,
  		},

  		yAxis:{
        visible:true,
  			value:'Label on Y Axis',
  			align:'middle',
  			guidelines:false,
  			position:'left',
  		},

      automaticDomainX: true,
      domainX: [0,10],
      automaticDomainY: true,
      domainY: [0,10],
    }
	setSettings(newSettings){
		LineChart.settings = {...LineChart.settings, ...newSettings};
		// console.log(LineChart.settings);
		this.props.updateSVG();
	}

  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const settings = LineChart.settings;
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);


    const x = d3.scaleLinear()
      .range([0,width])
      .domain([+settings.domainX[0],+settings.domainX[1]]);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([+settings.domainY[0],+settings.domainY[1]]);

    const hasXDimension = this.variables[0].assignedDimensions.length != 0;
    const hasYDimension = this.variables[1].assignedDimensions.length != 0;

    if(hasXDimension && hasYDimension) {
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

      // X AXIS DOMAIN
      if(settings.automaticDomainX) {
        const domainX = d3.extent(sortedDataset, d => { return d[xAxisDimension]; });
        x.domain(domainX).nice();
        settings.domainX = x.domain();
      }

      // Y AXIS DOMAIN
      if(settings.automaticDomainY) {
        const domainY = [
          d3.min(lineData, (column) => {return d3.min(column, (d,i) => {return column[i]})}),
          d3.max(lineData, (column) => {return d3.max(column, (d,i) => {return column[i]})}),
        ];
        y.domain(domainY).nice()
        settings.domainY = y.domain();
      }

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

console.log(yAxisDimensions);
      // LEGEND
      if(settings.legend) ChartModel.drawLegend(canvas, settings, width, yAxisDimensions, colorGenerator);


		} // AFTER CAN DRAW


    // APPEND CHART LABEL
    ChartModel.drawChartLabel(canvas, settings, width);

    // APPEND X AXIS
    // create group
    const xAxisGroup = canvas.append('g')
      .attr('class', 'x axis group')
      .attr('transform', `translate(0,${height})`);

    // create axis
    if(settings.xAxis.visible){
      xAxisGroup.append('g')
        .attr('class', 'x axis')
        .call(d3.axisBottom(x));
    }

    // create label
    let labelPos = function(){
      switch (settings.xAxis.align) {
        case 'start': return 0;
        case 'middle': return width/2;
        case 'end': return width;
      }
    }()

    xAxisGroup.append('text')
      .attr('transform', `translate(${labelPos},25)`)
      .attr('text-anchor', settings.xAxis.align)
      .attr('dominant-baseline', 'text-before-edge')
      .attr('font-family', settings.fontFamily)
      .attr('font-size', settings.fontSize)
      .text(settings.xAxis.value);


    /// APPEND Y AXIS
    // create group
    const yAxisGroup = canvas.append('g')
      .attr('class', 'y axis group')
      .attr('transform', `translate(${settings.yAxis.position === 'left' ? 0:width},0)`);

    // create axis
    if(settings.yAxis.visible){
      const yAxis = settings.yAxis.position === 'left' ? d3.axisLeft(y) : d3.axisRight(y);
      yAxisGroup.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    }

    // create label
    labelPos = function(){
      switch (settings.yAxis.align) {
  			case 'start': return height;
  			case 'middle': return height/2;
  			case 'end': return 0;
  		}
    }()

    yAxisGroup.append('text')
      .attr('transform', `translate(${settings.yAxis.position === 'left' ? -25:25},${labelPos}) rotate(-90)`)
      .attr('text-anchor', settings.yAxis.align)
      .attr('dominant-baseline', `${settings.yAxis.position === 'left' ? 'text-after-edge':'text-before-edge'}`)
			.attr('font-family', settings.fontFamily)
			.attr('font-size', settings.fontSize)
      .text(settings.yAxis.value);
  }
}
