import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class PieChart extends React.Component {
  render(){
    const settings = PieChart.settings;

    return(
      <div>
      <Col md={6}>
        <div className='cust'>
          <CustButtonGroup
						label='Graph type'
            buttons={[
              [{label:'Pie', active:!settings.isDonut, onClick: () => {this.setSettings({isDonut:false})} },
              {label:'Donut', active:settings.isDonut, onClick: () => {this.setSettings({isDonut:true})} }],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div className='cust'>
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
        </div>
      </Col>
      </div>

    )
  }

  static graphName = 'PieChart';
  static variables = [
    {
        label: 'Value',
        isRequired: true,
        mustBeNumeric: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
    {
        label: 'Label',
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },

  ];

  // TODO add settings vatiables
  static settings = {
    isDonut:false,

    chartLabel:{
      isBold:false,
      value:'Pie Chart',
    },
    fontFamily:'Helvetica',
		fontSize:'14px',

    sliceMoved: 0.02,// %
    innerRadius: 0.5,// %

    color: d3.schemeCategory10,
  };

  setSettings(newSettings){
		PieChart.settings = {...PieChart.settings, ...newSettings};
		console.log(PieChart.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    const hasValueDimension = this.variables[0].assignedDimensions.length != 0;
    const hasLabelDimension = this.variables[1].assignedDimensions.length != 0;

    const canDraw = hasValueDimension;
    if(canDraw) {
			this.drawChart(canvas, svgSize, wholeDataset, hasLabelDimension, hasValueDimension);
			}
  }

  static drawChart(canvas, svgSize, wholeDataset, hasLabelDimension, hasValueDimension){
    const settings = PieChart.settings;
		// GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);
    const radius = Math.min(width, height) / 2;

    // GET VALUE DIMENSIONS
    const valueDimension = this.variables[0].assignedDimensions[0].dimension;

    // GET LABEL DIMENSION
    const labelDimension = hasLabelDimension ? this.variables[1].assignedDimensions[0].dimension : null;


    // simplified dataset
    const pie = d3.pie()
                .value(function(d) { return d[valueDimension]})(wholeDataset);

    const arc = d3.arc()
                .outerRadius(radius)
                .innerRadius(settings.isDonut ? radius * settings.innerRadius : 0);

    // COLOR
    const color = d3.scaleOrdinal().range(settings.color);

    const slices = canvas.selectAll('arc')
                  .data(pie)
                  .enter()
                  .append('g')
                  .attr('class','arc')
                  .attr('transform', `translate(${width/2},${height/2})`);

    slices.append('path')
      .attr('d', arc)
      .attr('transform', function(d){
        let vector = arc.centroid(d)
        vector[0] *= settings.sliceMoved;
        vector[1] *= settings.sliceMoved;
        return `translate(${vector})`})
      .style('fill', function(d) { return color(d.index);});


      // CHART LABEL
  		this.drawChartLabel(canvas, width);
  }

  static drawChartLabel(canvas, width){
    const settings = PieChart.settings;
    const x = width/2;

    canvas.append('text')
          .attr('x', x)
          .attr('y', -10)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'text-after-edge')
          .attr('font-family', settings.fontFamily)
          .attr('font-size', settings.fontSize)
          .attr('font-weight', settings.chartLabel.isBold ? 'bold':'normal')
          .text(settings.chartLabel.value);
  }
}
