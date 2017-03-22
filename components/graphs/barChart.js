import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

const blockStyle ={
	backgroundColor: 'white',
	padding: '5px 15px',
  margin: '0px 0px 10px 0px',
  height: '145px'
}


export default class BarChart extends React.Component{

  render(){
    return(
      <div>
      <Col md={6}>
        <div style={blockStyle}>
          <CustButtonGroup
            buttons={[
              [{label:'Vertical', active:BarChart.settings.isVertical, onClick: () => {this.setSettings({isVertical:true})} },
              {label:'Horizontal', active:!BarChart.settings.isVertical, onClick: () => {this.setSettings({isVertical:false})} }],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Grouped', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'Stacked', active:!BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:false})} }],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div style={blockStyle}>
          <CustFormGroup
  					label='Graph Label'
  					items={[
  						{type : 'btn',
               label: <FontAwesome name='bold'/>,
               active: BarChart.settings.graphLabel.isBold,
               onChange: () => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, isBold:!BarChart.settings.graphLabel.isBold}})}
              },
              {type : 'input',
               text : 'Graph label',
               value : BarChart.settings.graphLabel.value,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, value:value}})}
             },
              {type: 'align',
               value: BarChart.settings.graphLabel.align,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{label:'Grouped', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
              [{label:'Grouped', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
            ]}
          />

        </div>
      </Col>

      <Col md={6}>
        <div style={blockStyle}>
          <CustButtonGroup
            buttons={[
              [{label:'Color', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
              [{label:'Bar label', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Padding', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
              [{label:'Legend', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div style={blockStyle}>
          <CustFormGroup
  					label='Graph Label'
  					items={[
              {type : 'input',
               text : 'Graph label',
               value : BarChart.settings.graphLabel.value,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, value:value}})}
             },
              {type: 'align',
               value: BarChart.settings.graphLabel.align,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{label:'0°', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'45°', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'90°', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div style={blockStyle}>
          <CustFormGroup
  					label='Graph Label'
  					items={[
              {type : 'input',
               text : 'Graph label',
               value : BarChart.settings.graphLabel.value,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, value:value}})}
             },
              {type: 'align',
               value: BarChart.settings.graphLabel.align,
               onChange: value => {this.setSettings({graphLabel:{...BarChart.settings.graphLabel, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{label:'Guides', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
              [{label:'Left', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'Right', active:BarChart.settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div style={blockStyle}>
          <CustSlider
            label='Bar padding'
            min={0}
            max={1}
            step={0.01}
            value={BarChart.settings.x1Padding}
            displayedValue={d3.format('.0%')(BarChart.settings.x1Padding)}
            onChange= {value => {this.setSettings({x1Padding:value})}}
          />
        </div>
      </Col>
      </div>

    )
  }

  setSettings(newSettings){
    BarChart.settings = {...BarChart.settings, ...newSettings};
    this.props.updateSVG();
  }

  //////////////////////////////////////////////////////////////////////////////
  static graphName = 'BarChart';
  static variables = [
    {
        label: 'Label',
        desc: 'labels on x axis',
        isRequired: false,
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
    isVertical:true,
    isGrouped:true,

    graphLabel:{
      value: 'Bar Chart',
      visible: true,
      align: 'middle',
      isBold: false,
    },

    xAxisVisible:true,
    xAxisLabel:'X Axis',
    xAxisPosition:'left',
    xAxisLabelAlign:'middle',

    yAxisVisible:true,
    yAxisLabel:'Y Axis',
    yAxisLabelAlign:'middle',

    legendVisible:true,
    guidelinesVisible:true,

    yPadding:0,
    x0Padding:0,
    x1Padding:0.2,
  }

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    const hasLabelDimension = this.variables[0].assignedDimensions.length != 0;
    const hasBarDimension = this.variables[1].assignedDimensions.length != 0;

    const canDraw = hasBarDimension;
    if(canDraw) this.drawChart(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
  }

  static drawChart(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension){
    // GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // GET LABEL DIMENSION
    const labelDimension = hasLabelDimension ? this.variables[0].assignedDimensions[0].dimension : null;

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
                .padding(BarChart.settings.x0Padding);

    const x1 = d3.scaleBand()
              .domain(d3.range(barDimensions.length))
              .range([0, x0.bandwidth()])
              .padding(BarChart.settings.x1Padding);

    const xAxis = d3.axisBottom(x0)
                    .tickSizeOuter(0);

    canvas.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // DRAW TICKS ON X AXIS
    if(hasLabelDimension){
      const tickNames = wholeDataset.map(function(d){return d[labelDimension];});

      canvas.select(".x.axis").selectAll("g.tick").selectAll("text").each(function(d) {
            d3.select(this).text(tickNames[d])
      });
    } else {
      canvas.select(".x.axis").selectAll("g.tick").remove();
    }

    // Y AXIS
    const y = d3.scaleLinear()
                .range([height,0])
                .domain([0, domainMax]);

    const yAxis = d3.axisLeft(y)
                    .tickSizeOuter(0);

    const yAxisGroup = canvas.append('g')
                            .attr('class', 'y axis')

    yAxisGroup.append('g').call(yAxis);


    yAxisGroup.append('text')
              .attr('x', 0)
              .attr('y', 0)
              .attr('text-anchor', BarChart.settings.yAxisLabelAlign)
              .attr('alignment-baseline', 'middle')
              .text(BarChart.settings.yAxisLabel);





    // GUIDELINES
    const guidelines = d3.axisRight(y)
        .tickSizeInner(width)
        .tickSizeOuter(0)
        .tickFormat('');

    // COLOR
    const color = d3.scaleOrdinal().range(d3.schemeCategory10);

    // CREATE BARS
    const outerBand = canvas.append('g')
                            .attr('class', 'bars')
                            .selectAll('.outerBand')
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


    // CHART LABEL
    if(BarChart.settings.graphLabel.visible) {
      let x = 0;
      switch(BarChart.settings.graphLabel.align){
        case 'start':
          x = 0;
          break;
        case 'middle':
          x = width/2;
          break;
        case 'end':
          x = width;
          break;
      }

      const y = -(svgSize.height * svgSize.margin/4);

      canvas.append('text')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', BarChart.settings.graphLabel.align)
            .attr('alignment-baseline', 'middle')
            .attr('font-weight', BarChart.settings.graphLabel.isBold ? 'bold':'normal')
            .text(BarChart.settings.graphLabel.value);
    }
  }
}
