import ReactBootstrapSlider from 'react-bootstrap-slider';
import FontAwesome from 'react-fontawesome';

import CustomizationFormGroup from './CustomizationFormGroup';

export default class GraphCustomization extends React.Component {

	constructor(){
		super();
		this.onChangeWidth = this.onChangeWidth.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
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
		const margins = this.props.svgSize.margins;

		return (
			<div className='row'>
				<CustomizationFormGroup
					label='Width x height'
					items={[
						{'type' : 'input', 'text' : 'Width', 'value' : width, 'onChange': this.onChangeWidth},
						{'type' : 'addon', 'name' : <FontAwesome name='times'/>},
						{'type' : 'input', 'text' : 'Height', 'value' : height, 'onChange': this.onChangeHeight},
						{'type' : 'btn', 'name' : <FontAwesome name='arrows-alt'/>},
					]}
				/>

				{/*
					TODO z margins udělat slider a všechny margins budou stejne
					*/}

				<div className='col-md-3'>
					<label>
						Slider
					</label>

					<ReactBootstrapSlider
						min={0}
						max={100}
						value={30}
						change={e => {console.log(e.target.value)}}
					/>
				</div>

			</div>
		)
	}

	renderGraphCustomization() {
		return (
			<div className='row'>
				<CustomizationFormGroup label='Legend' items=
					{[{'type' : 'btn-vis'}]}
				/>

				<CustomizationFormGroup label='Graph title'	items=
					{[{'type' : 'btn', 'name' : <FontAwesome name='eye'/>},
					{'type' : 'input', 'placeholder' : 'Graph title'}]}
				/>
			</div>
		)
	}

	onChangeWidth(newWidth) {
		const newSize = {width: newWidth}
		console.log(this.props);
		this.props.onSvgSizeChange(newSize);
	}
	onChangeHeight(newHeight) {
		const newSize = {height: newHeight}
		this.props.onSvgSizeChange(newSize);
	}
}
