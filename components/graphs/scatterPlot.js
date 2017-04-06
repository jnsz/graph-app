import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class ScatterPlot extends React.Component{

  render(){
		const settings = ScatterPlot.settings;

    return(
      <div>
      <Col md={6}>
        <div className='cust'>
          YEA!
        </div>
      </Col>
      </div>

    )
  }
  static graphName = 'ScatterPlot';
  static variables = [
    {
        label: 'SCATTER X',
        isRequired: true,
        takesSingleDimension: true,
        assignedDimensions:[]
    },{
        label: 'SCATTER Y',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    }
  ];
  static settings = {

  }
	setSettings(newSettings){
		ScatterPlot.settings = {...ScatterPlot.settings, ...newSettings};
		console.log(ScatterPlot.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {
    console.log('draw attempt but no SCATTER PLOT draw method prepared');
  }
}
