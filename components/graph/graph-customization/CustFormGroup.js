import { Row, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const rowStyle = {
  padding: '0px 15px',
}

export default class CustFormGroup extends React.Component {

	render() {
		return (
			<Row style={rowStyle}>
				<label>
					{this.props.label}
				</label>
				<FormGroup >
					<InputGroup>
						{ this.renderInputGroup() }
					</InputGroup>
				</FormGroup>
			</Row >
		)
	}

	renderInputGroup() {
		const items = this.props.items;

		return(
			items.map(item => {
				switch(item.type) {

					case 'btn':
						return (
							<InputGroup.Button key={items.indexOf(item)} >
								<Button onClick={item.onChange} active={item.active}>
									{item.label}
								</Button>
							</InputGroup.Button>
						)
						break;

					case 'align':
						return (
							<InputGroup.Button  key={items.indexOf(item)} >
								<Button onClick={() => {item.onChange('start')}} active={item.value === 'start'}>
									<FontAwesome name='align-left'/>
								</Button>
								<Button onClick={() => {item.onChange('middle')}} active={item.value === 'middle'}>
									<FontAwesome name='align-center'/>
								</Button>
								<Button onClick={() => {item.onChange('end')}} active={item.value === 'end'}>
									<FontAwesome name='align-right'/>
								</Button>
							</InputGroup.Button>
						)
						break;

					case 'addon':
						return (
							<InputGroup.Addon key={items.indexOf(item)}>
								{item.label}
							</InputGroup.Addon>
						)
						break;

					case 'addon-empty':
						return (
							<InputGroup.Addon style={{padding:'0', border:'0', width:'0'}}></InputGroup.Addon>
						)
						break;

					case 'input':
						return (
							<FormControl
								key={items.indexOf(item)}
								type='text'
								placeholder={item.placeholder}
								value={item.value}
								onChange={e => {item.onChange(e.target.value)}}
						  />
						)
						break;
				}
			})
		)
	}
}

CustFormGroup.PropTypes = {
	label : React.PropTypes.string.isRequired,
	items : React.PropTypes.object.isRequired,
};
