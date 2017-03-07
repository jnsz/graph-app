import * as d3 from 'd3';
import * as RB from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustomizationFormGroup from './CustomizationFormGroup';
import CustomizationSlider from './CustomizationSlider'

export default class GraphCustomization extends React.Component {

	constructor(){
		super();
		this.onChangeWidth = this.onChangeWidth.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
	}

	render() {
		//console.log(this.props.graphConfig.graphCustomization);

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
			<RB.Row>
				<CustomizationFormGroup
					label='Width x height'
					items={[
						{'type' : 'input', 'text' : 'Width', 'value' : width, 'onChange': this.onChangeWidth},
						{'type' : 'addon', 'name' : <FontAwesome name='times'/>},
						{'type' : 'input', 'text' : 'Height', 'value' : height, 'onChange': this.onChangeHeight},
						{'type' : 'btn', 'name' : <FontAwesome name='arrows-alt'/>},
					]}
				/>
				<CustomizationSlider
					label='Margins'
					value={margin}
					displayedValue={d3.format('.0%')(margin)}
					onChange={this.onChangeMargin}
				/>
			</RB.Row>
		)
	}

	renderGraphCustomization() {
		return (
			<RB.Row>

				<CustomizationFormGroup label='Legend' items=
					{[{'type' : 'btn-vis'}]}
				/>

				<CustomizationFormGroup label='Graph title'	items=
					{[{'type' : 'btn-vis'},
					{'type' : 'input', 'placeholder' : 'Graph title'}]}
				/>

			</RB.Row>
		)
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
