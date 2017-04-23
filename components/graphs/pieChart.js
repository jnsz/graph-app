import * as d3 from 'd3';
import { Col, Row, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';

export default class PieChart extends React.Component {
  render(){
    const settings = PieChart.settings;
    return(
      <div>

        <UI.Size svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>

        <UI.Wrapper>
          <UI.BtnGroup  label="General">
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
              <UI.BtnGroupDropdown
                id='label-position'
                title='Label'
                arrayOfValues={['none','inside','around']}
                active={settings.labelPos}
                onChange={name => {
                  this.setSettings({labelPos:name})}
                }
              />
            </ButtonGroup>
          </UI.BtnGroup>


          <UI.Slider
            label='Donutation'
            min={0}
            max={1}
            step={0.01}
            value={settings.innerRadius}
            displayedValue={d3.format('.0%')(settings.innerRadius)}
            onChange={value => {this.setSettings({innerRadius:value})}}
          />
        </UI.Wrapper>

        <UI.LabelChart
          settings={settings}
          onChange={newSettings => {this.setSettings(newSettings)}}
        />


      </div>
    )
  }

  static graphName = 'PieChart';
  static variables = [
    {
        label: 'Values',
        desc: 'Determines size of individual slices.',
        isRequired: true,
        mustBeNumeric: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
    {
        label: 'Labels',
        desc: "Labels individual slices. If left empty 'Values' dimesnion will be used instead.",
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
  ];
  static settings = {
    innerRadius: 0,// %
    labelPos:'around',

    chartLabel:{
      isBold:true,
      align: 'middle',
      value:'Title of the graph',
    },
    fontFamily:'Helvetica',
		fontSize:'14px',

    color: d3.schemeCategory10,
    legend:false,
  }
  setSettings(newSettings){
		PieChart.settings = {...PieChart.settings, ...newSettings};
		this.props.updateSVG();
	}

  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const settings = PieChart.settings;
		// GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);
    const radius = Math.min(width, height) / 2;

    const hasValueDimension = this.variables[0].assignedDimensions.length != 0;

    if(hasValueDimension) {
      // GET VALUE DIMENSIONS
      const valueDimension = this.variables[0].assignedDimensions[0].dimension;
      // GET LABEL DIMENSION
      const labelDimension = (this.variables[1].assignedDimensions.length != 0) ? this.variables[1].assignedDimensions[0].dimension : this.variables[0].assignedDimensions[0].dimension;

      // simplified dataset
      const pie = d3.pie()
        .value(d => {return d[valueDimension]})(wholeDataset);

      const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius * settings.innerRadius);

      // COLOR
      const colorGenerator = d3.scaleOrdinal().range(settings.color);

      const pieGroup = canvas.append('g')
        .attr('class', 'pie')
        .attr('transform', `translate(${width/2},${height/2})`);

      const slices = pieGroup.selectAll('arc')
        .data(pie)
        .enter()
        .append('g')
        .attr('class','arc');

      slices.append('path')
        .attr('d', arc)
        .style('fill', (d,i) => {return colorGenerator(i)});

      if(settings.labelPos !== 'none'){
        const labels = slices.append('text')
          .attr('font-family', settings.fontFamily)
          .attr('font-size', settings.fontSize)
          .text(d => {return d.data[labelDimension]});

        if(settings.labelPos === 'around'){
          const labelsArc = d3.arc().outerRadius(radius + 10).innerRadius(radius + 10);

          labels.attr('transform', d => {return `translate(${labelsArc.centroid(d)})`})
            .attr('text-anchor', d => {return (labelsArc.centroid(d)[0] > 0) ? 'start' : 'end'} )
            .attr('alignment-baseline','middle')
        }
        else{
          const labelsArc = d3.arc().outerRadius(radius).innerRadius(radius * settings.innerRadius : 0);

          labels.attr('transform', d => {return `translate(${labelsArc.centroid(d)})`})
            .attr('text-anchor', 'middle' )
            .attr('alignment-baseline','middle')
            .attr('fill','white')
            .text(d => {return d.data[labelDimension]});
        }
      }

      // LEGEND
      if(settings.legend){
        const legendGroup = canvas.append('g')
          .classed('legend', true)
          .attr('transform', `translate(${width},0)`);

        const headerText = (valueDimension === labelDimension) ? valueDimension : `${labelDimension} – ${valueDimension}:`;
        legendGroup.append('g')
          .classed('header', true)
          .append('text')
          .attr('transform', 'translate(0,-6)')
          .attr('font-family', settings.fontFamily)
          .text(headerText);

        const legend = legendGroup.selectAll('.row')
          .data(pie)
          .enter()
          .append('g')
          .classed('row', true)
          .attr('transform', (d,i) => {return `translate(0,${(i)*20})`});

        legend.append('rect')
          .attr('width', 19)
          .attr('height', 19)
          .style('fill', (d, i) => {return colorGenerator(i)});

        const legendText = legend.append('text')
          .attr('x',24)
          .attr('y', 9.5)
          .attr('dy', '0.32em')
    			.style('font-family', settings.fontFamily)
          .text(d => {return (valueDimension === labelDimension) ? d.data[valueDimension] : `${d.data[labelDimension]} – ${d.data[valueDimension]}`});
      }
		} // AFTER CAN DRAW
    // CHART LABEL
    ChartModel.drawChartLabel(canvas, settings, width);
  }
}
