import * as d3 from 'd3';
import { Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from './CustButtonGroup';
import CustColorPicker from './CustColorPicker';
import CustDropdown from './CustDropdown';
import CustFormGroup from './CustFormGroup';
import CustSlider from './CustSlider';

import BarChart from '../../graphs/BarChart';
import PieChart from '../../graphs/PieChart'

export default class GraphCustomization extends React.Component {

	constructor(){
		super();
		this.onChangeWidth = this.onChangeWidth.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
	}

	render() {

		return (
			<div  style={{backgroundColor: '#f8f8f8'}}>
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
			<Row>
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
			</Row>
		)
	}



	renderGraphCustomization(){
		const components = {
			BarChart: BarChart,
			PieChart: PieChart,
		}
		const SelectedGraph = components[this.props.selectedGraph];

		return <SelectedGraph />;
	}

	// renderGraphCustomization() {
	// 	return (
	// 		<Row>
	// 			{this.props.graphCustomizations.map((customization, i) => {
	// 				// console.log(customization);
	// 				switch (customization.type) {
	// 		      case 'form group':
	// 						return (
	// 							<CustFormGroup
	// 								label = {customization.label}
	// 								items = {customization.items}
	// 							/>
	// 						)
	// 		        break;
	// 		      case 'slider':
	// 						return (
	// 							<CustSlider
	// 								label = {customization.label}
	// 								min = {customization.min}
	// 								max = {customization.max}
	// 								step = {customization.step}
	// 								value = {customization.value}
	// 								displayedValue = {customization.displayedValue}
	// 								onChange = {customization.onChange}
	// 							/>
	// 						)
	// 						break;
	// 					default:
	// 						console.log('Dunno how to render this ' + customization.type + ' of yours');
	// 		    }
	// 			})}
	// 		</Row>
	// 	)
	// }

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
