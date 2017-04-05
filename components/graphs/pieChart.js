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
              [{label:'Vertical', active:settings.isVertical, onClick: () => {this.setSettings({isVertical:true})} },
              {label:'Horizontal', active:!settings.isVertical, onClick: () => {this.setSettings({isVertical:false})} }],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Grouped', active:settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'Stacked', active:!settings.isGrouped, onClick: () => {this.setSettings({isGrouped:false})} }],
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
        </div>
      </Col>

      </div>

    )
  }

  static graphName = 'PieChart';
  static variables = [
    {
        label: 'Label',
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
    {
        label: 'Value',
        isRequired: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    }
  ];

  // TODO add settings vatiables
  static settings = {
    isDonut:false,
  };

  setSettings(newSettings){
		PieChart.settings = {...PieChart.settings, ...newSettings};
		console.log(PieChart.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    const hasLabelDimension = this.variables[0].assignedDimensions.length != 0;
    const hasValueDimension = this.variables[1].assignedDimensions.length != 0;

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

    // GET LABEL DIMENSION
    const labelDimension = hasLabelDimension ? this.variables[0].assignedDimensions[0].dimension : null;

    // GET BARS DIMENSIONS
    const valueDimensions = [];
    this.variables[1].assignedDimensions.map(dimension => {
      valueDimensions.push(dimension.dimension);
    })

    // simplified dataset
    const dataset = wholeDataset.map(function(d, i) {
      const row = valueDimensions.map(function(dimension, index) {
        return d[dimension]
      })
      return row;
    })
  }

}
