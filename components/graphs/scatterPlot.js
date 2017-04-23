import * as d3_core from 'd3';
import * as d3_symbol from 'd3-symbol-extra';
const d3 = {...d3_core, ...d3_symbol};
import { Col, Row, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';

export default class ScatterPlot extends React.Component{

  render(){
		const settings = ScatterPlot.settings;

    return(
      <div>
          <UI.Size svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>
          <UI.Wrapper>
            <UI.BtnGroup label="General">
              <UI.BtnGroupDropdownColor
                active={settings.color}
                onChange={value => {this.setSettings({color:value})}}
              />
            </UI.BtnGroup>
            <UI.BtnGroup>
              <ButtonGroup justified style={{paddingRight:'5px'}}>
                <UI.BtnGroupBtn
                  icon={settings.legend? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
                  label='Legend'
                  active={settings.legend}
                  onChange={() => {this.setSettings({legend:!settings.legend})}}
                />
              </ButtonGroup>

              <ButtonGroup justified style={{paddingLeft:'5px'}}>
                <UI.BtnGroupBtn
                  icon={settings.labels? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
                  label='Labels'
                  active={settings.labels}
                  onChange={() => {this.setSettings({labels:!settings.labels})}}
                />
              </ButtonGroup>
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

          <UI.Wrapper>
            <UI.MinMaxDomain
              label='Size domain'
              domain={settings.domainSize}
              onChange={newDomain => {this.setSettings({domainSize:newDomain})}}
            />
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
      label: 'Size',
      desc: "Maps dimesnion on symbol's volume",
      mustBeNumeric: true,
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
       value: 'Title of the graph',
       align: 'middle',
       isBold: true,
     },
 		fontFamily:'Helvetica',
 		fontSize:'14px',

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

     color: d3.schemeCategory10,
     labels: true,
     legend: false,

     automaticDomainX: true,
     domainX: [0,10],
     automaticDomainY: true,
     domainY: [0,10],
     domainSize: [30,500],
   }
	setSettings(newSettings){
		ScatterPlot.settings = {...ScatterPlot.settings, ...newSettings};
		this.props.updateSVG();
	}

  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const settings = ScatterPlot.settings;
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // X AXIS
    const x = d3.scaleLinear()
      .range([0,width])
      .domain([+settings.domainX[0],+settings.domainX[1]]);

    // Y AXIS
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([+settings.domainY[0],+settings.domainY[1]]);

    const hasXDimension = this.variables[0].assignedDimensions.length != 0;
    const hasYDimension = this.variables[1].assignedDimensions.length != 0;

    ///////////// CAN DRAW ////////////////
    if(hasXDimension && hasYDimension) {
      // GET DIMENSIONS
      const xAxisDimension = this.variables[0].assignedDimensions[0].dimension;
      const yAxisDimension = this.variables[1].assignedDimensions[0].dimension;
      const colorDimension = (this.variables[2].assignedDimensions.length != 0) ? this.variables[2].assignedDimensions[0].dimension : null;
      const symbolDimension = (this.variables[3].assignedDimensions.length != 0) ? this.variables[3].assignedDimensions[0].dimension : null;
      const sizeDimension = (this.variables[4].assignedDimensions.length != 0) ? this.variables[4].assignedDimensions[0].dimension : null;
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

      // X AXIS DOMAIN
      if(settings.automaticDomainX) {
        const domainX = d3.extent(dataset, d => { return d[xAxisDimension]; });
        x.domain(domainX).nice();
        settings.domainX = x.domain();
      }

      // Y AXIS DOMAIN
      if(settings.automaticDomainY) {
        const domainY = d3.extent(dataset, d => { return d[yAxisDimension]; });
        y.domain(domainY).nice();
        settings.domainY = y.domain();
      }

      let colorValues = new Set();
      let symbolValues = new Set();
      let sizeValues = new Set();

      dataset.map(row => {
        colorValues.add(row[colorDimension]);
        symbolValues.add(row[symbolDimension]);
        sizeValues.add(row[sizeDimension]);
      })

      colorValues.delete(undefined);
      symbolValues.delete(undefined);
      sizeValues.delete(undefined);

      colorValues = Array.from(colorValues).sort((x, y) => x - y);
      symbolValues = Array.from(symbolValues).sort((x, y) => x - y);
      sizeValues = Array.from(sizeValues).sort((x, y) => x - y);

      const sizeGenerator = d3.scaleLinear()
                              .domain(d3.extent(dataset, d => { return d[sizeDimension]; }))
                              .range([+settings.domainSize[0],+settings.domainSize[1]]);

      const colorGenerator = d3.scaleOrdinal()
                               .domain(colorValues)
                               .range(settings.color);

      const symbolGenerator = d3.scaleOrdinal()
                                .domain(symbolValues)
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


      if(settings.labels){
        const dotLabel = dots.append('text')
          .attr('x', d => {return d3.max([10, 6 + Math.sqrt(sizeGenerator(d[sizeDimension])/Math.PI)])})
          .attr('font-family', settings.fontFamily)
          .attr('font-size', settings.fontSize)
          .attr('alignment-baseline','middle')


        if(labelDimension !== null) dotLabel.text(d => {return d[labelDimension]});
        else                        dotLabel.text(d => {return `[${d[xAxisDimension]},${d[yAxisDimension]}]`});
      }

      // LEGEND
      if(settings.legend) {
        const legendGroup = canvas.append('g')
          .classed('legend group', true)
          .attr('transform', `translate(${width},0)`)

        // COLOR
        const legendColor = legendGroup.append('g')
          .classed('color', true)
          // append rows
          .selectAll('.row')
          .data(colorValues)
          .enter()
          .append('g')
          .classed('row', true)
          .attr('transform', (d,i) => {return `translate(0,${i*20})`})

        // append rect
        legendColor.append('rect')
          .attr('width', 19)
          .attr('height', 19)
          .style('fill', d => {return colorGenerator(d)});

        // append text
        legendColor.append('text')
          .attr('x',24)
          .attr('y', 9.5)
          .attr('dy', '0.32em')
    			.style('font-family', settings.fontFamily)
          .text(d => { return d });

        // SYMBOLS
        const legendSymbols = legendGroup.append('g')
          .classed('symbol', true)
          .attr('transform', `translate(0,${colorValues.length*20 + 20})`)
          // append rows
          .selectAll('.row')
          .data(symbolValues)
          .enter()
          .append('g')
          .classed('row', true)
          .attr('transform', (d,i) => {return `translate(0,${i*20})`})

        // append path
        const symbolLegend = d3.symbol()
                         .size(150)
                         .type(d => {return symbolGenerator(d)});

        legendSymbols.append('path')
          .attr('d', d => {return symbolLegend(d)})
          .attr('transform',`translate(${19/2},0)`)
          .style('stroke-width','0')
          .style('fill', 'black');

        // append text
        legendSymbols.append('text')
          .attr('x',24)
          .attr('dy', '0.32em')
          .style('font-family', settings.fontFamily)
          .text(d => { return d });

        // SIZE
        const legendSizeRowHeight = Math.sqrt(sizeGenerator.range()[1]/Math.PI) * 2 + 2;
        const legendSize = legendGroup.append('g')
          .classed('size', true)
          .attr('transform', `translate(0,${((symbolValues.length + colorValues.length)*20) + 30})`)
          // append rows
          .selectAll('.row')
          .data(sizeValues)
          .enter()
          .append('g')
          .classed('row', true)
          .attr('transform', (d, i) => {return `translate(0,${i * legendSizeRowHeight})`})

        // append circle
        legendSize.append('circle')
          .attr('r', d => {return Math.sqrt(sizeGenerator(d)/Math.PI)})
          .attr('transform',`translate(${19/2},0)`)
          .style('stroke', 'white')
          .style('stroke-width','1')
          .style('fill', 'black')

        // append text
        legendSize.append('text')
          .attr('x', d => {return d3.max([24, 12 + Math.sqrt(sizeGenerator(d)/Math.PI)])})
          .attr('dy', '0.32em')
          .style('font-family', settings.fontFamily)
          .text(d => { return d });
      }

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

      canvas.select('g.x.axis.group').select('g.x.axis').selectAll('g.tick').selectAll('text').each(function() {
        d3.select(this).attr('font-family', settings.fontFamily)
      });
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
        .attr('class','y axis')
        .call(yAxis);

      canvas.select('g.y.axis.group').select('g.y.axis').selectAll('g.tick').selectAll('text').each(function() {
        d3.select(this).attr('font-family', settings.fontFamily)
      });
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
