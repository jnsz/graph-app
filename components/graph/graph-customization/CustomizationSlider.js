import * as RB from 'react-bootstrap';

export default class CustomizationSlider extends React.Component {

	render() {
		return (
			<RB.Col md={3}>

				<label style={{display: 'block'}}>
					{this.props.label}
				</label>

				<input
					style={{width:'80%', display: 'inline-block'}}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={this.props.value}
					onChange={e => {this.props.onChange(e.target.value)}}
				/>
				<span style={{float: 'right'}}>{this.props.displayedValue}</span>
				
			</RB.Col>
		)
	}
}
