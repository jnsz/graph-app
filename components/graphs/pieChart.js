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

        <UI.Wrapper>
          <UI.BtnGroup label="General">
            <ButtonGroup justified style={{paddingRight:'5px'}}>
              <UI.BtnGroupDropdownColor
                active={settings.color}
                onChange={value => {this.setSettings({color:value})}}
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
          {/*<CustButtonGroup
            buttons={[
							[{icon: (settings.legend?<FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>),
							label: 'Legend',
							active:settings.legend,
							onClick: () => {this.setSettings({legend:!settings.legend})} }],
            ]}
          />*/}
        </UI.Wrapper>

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
  };
  setSettings(newSettings){
		PieChart.settings = {...PieChart.settings, ...newSettings};
		console.log(PieChart.settings);
		this.props.updateSVG();
	}

  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const settings = PieChart.settings;
		// GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);
    const radius = Math.min(width, height) / 2;

    const hasValueDimension = this.variables[0].assignedDimensions.length != 0;
    const hasLabelDimension = this.variables[1].assignedDimensions.length != 0;

    if(hasValueDimension) {
      // GET VALUE DIMENSIONS
      const valueDimension = this.variables[0].assignedDimensions[0].dimension;
      // GET LABEL DIMENSION
      const labelDimension = hasLabelDimension ? this.variables[1].assignedDimensions[0].dimension : this.variables[0].assignedDimensions[0].dimension;

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
        // .attr('transform', d => {
        //   let vector = arc.centroid(d)
        //   vector[0] *= settings.sliceMoved;
        //   vector[1] *= settings.sliceMoved;
        //   console.log(Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2)));
        //   return `translate(${vector})`})
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
		} // AFTER CAN DRAW
    // CHART LABEL
    ChartModel.drawChartLabel(canvas, settings, width);
  }
}
