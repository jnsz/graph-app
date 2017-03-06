import CustomizationFormGroup from './CustomizationFormGroup';

export default class GraphCustomization extends React.Component {

	render() {
		console.log(this.props.graphConfig.graphCustomization);

		return (
			<div  style={{backgroundColor: '#f8f8f8'}}>
		    <div className="container">
		      <div className="wrapper">

						{ this.renderSizeCustomization() }

						{ this.renderGraphCustomization() }

		      </div>
		    </div>
			</div>
		);
	}

	renderSizeCustomization() {
		return (
			<div className="row">
				<CustomizationFormGroup label="Width x height" items=
					{[

						{"type" : "input", "placeholder" : "Width"},
						{"type" : "addon", "name" : <i className='fa fa-times'></i>},
						{"type" : "input", "placeholder" : "Height"},
						{"type" : "btn", "name" : <i className='fa fa-arrows-alt'></i>},
					]}
				/>

				{/*
					TODO z margins udělat slider a všechny margins budou stejne
					*/}
				<CustomizationFormGroup label="Margins" items=
					{[

						{"type" : "input", "placeholder" : "Up"},
						{"type" : "addon-empty"},
						{"type" : "input", "placeholder" : "Down"},
						{"type" : "addon-empty"},
						{"type" : "input", "placeholder" : "Left"},
						{"type" : "addon-empty"},
						{"type" : "input", "placeholder" : "Right"},
					]}
				/>
			</div>
		)
	}

	renderGraphCustomization() {
		return (
			<div className="row">
				<CustomizationFormGroup label="Legend" items=
					{[{"type" : "btn-vis"}]}
				/>

				<CustomizationFormGroup label="Graph title"	items=
					{[{"type" : "btn", "name" : <i className="fa fa-eye"></i>},
					{"type" : "input", "placeholder" : "Graph title"}]}
				/>
			</div>
		)
	}
}
