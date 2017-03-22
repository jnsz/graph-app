import { Row } from 'react-bootstrap';

const rowStyle = {
  padding: '0px 15px',
}

export default class CustSlider extends React.Component {

	render() {
		return (
			<Row style={rowStyle}>
			<div>
				<label style={{display: 'block'}}>
					{this.props.label}
				</label>

				<input
					style={{width:'80%', display: 'inline-block'}}
					type='range'
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					value={this.props.value}
					onChange={e => {this.props.onChange(e.target.value)}}
				/>
				<span style={{float: 'right'}}>{this.props.displayedValue}</span>

			</div>
			</Row>
		)
	}
}

CustSlider.PropTypes = {
	label : React.PropTypes.string.isRequired,
	min : React.PropTypes.number.isRequired,
	max : React.PropTypes.number.isRequired,
	step : React.PropTypes.number.isRequired,
	value : React.PropTypes.number.isRequired,
	displayedValue : React.PropTypes.number.isRequired,
	onChange : React.PropTypes.func.isRequired,
};
