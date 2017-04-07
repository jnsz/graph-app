import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustFormGroup from './CustFormGroup';
import CustSlider from './CustSlider';

import BarChart from '../../graphs/BarChart';
import PieChart from '../../graphs/PieChart';
import LineChart from '../../graphs/LineChart';
import ScatterPlot from '../../graphs/ScatterPlot';


const blockStyle ={
	backgroundColor: 'white',
	padding: '5px 15px',
	margin: '0px 0px 10px 0px',
	height: '145px'
}
const rowStyle = {
  padding: '0px 15px',
}

export default class GraphCustomization extends React.Component {

	constructor(){
		super();
		this.onChangeWidth = this.onChangeWidth.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
	}

	render() {

		return (
			<div style={{backgroundColor: '#ededed'}}>
		    <div className='container'>
		      <div className='wrapper'>
						{ this.renderSizeCustomization() }
						{ this.renderGraphCustomization() }
		      </div>
		    </div>
			</div>
		);
	}

	renderSizeCustomization() {
		const width = this.props.svgSize.width;
		const height = this.props.svgSize.height;
		const margin = this.props.svgSize.margin;
		return (
			<Col md={6}>
				<div style={blockStyle}>
					<CustFormGroup
						label='Aspect ratio'
						items={[
							{'type' : 'input', 'text' : 'Width', 'value' : width, 'onChange': this.onChangeWidth},
							{'type' : 'addon', 'label' : <FontAwesome name='times'/>},
							{'type' : 'input', 'text' : 'Height', 'value' : height, 'onChange': this.onChangeHeight},
							{/*{'type' : 'btn', 'label' : <FontAwesome name='arrows-alt'/>},*/}
						]}
					/>
					<CustSlider
						label='Margins'
						min={0}
						max={1}
						step={0.01}
						value={margin}
						displayedValue={d3.format('.0%')(margin)}
						onChange={this.onChangeMargin}
					/>
				</div>
			</Col>
		)
	}

	renderGraphCustomization(){
		const components = {
			BarChart: BarChart,
			PieChart: PieChart,
			LineChart: LineChart,
			ScatterPlot: ScatterPlot,
		}
		const SelectedGraph = components[this.props.selectedGraph];

		return <SelectedGraph updateSVG={this.props.updateSVG} />;
	}

	onChangeWidth(newWidth) {
		const newSize = {width: newWidth};
		this.props.onSvgSizeChange(newSize);
	}
	onChangeHeight(newHeight) {
		const newSize = {height: newHeight};
		this.props.onSvgSizeChange(newSize);
	}
	onChangeMargin(newMargin) {
		const newSize = {margin: newMargin}
		this.props.onSvgSizeChange(newSize);
	}
}
