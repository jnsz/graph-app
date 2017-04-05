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
  static graphName = 'LineChart';
  static variables = [
    {
        label: 'LINE',
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },{
        label: 'LINE',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    }
  ];
  static settings = {
		isCurved:false,
  }
	setSettings(newSettings){
		LineChart.settings = {...LineChart.settings, ...newSettings};
		console.log(LineChart.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    console.log('draw attempt but no LINE CHART draw method prepared');
  }
}
