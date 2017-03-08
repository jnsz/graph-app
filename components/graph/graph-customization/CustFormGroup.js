import * as RB from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import VisibilityBtn from './VisibilityBtn'

export default class CustFormGroup extends React.Component {

	render() {
		return (
			<RB.Col md={3}>
				<label>
					{this.props.label}
				</label>
				<RB.FormGroup >
					<RB.InputGroup>
						{ this.renderInputGroup() }
					</RB.InputGroup>
				</RB.FormGroup>
			</RB.Col>
		)
	}

	renderInputGroup() {
		const items = this.props.items;

		return(
			items.map(item => {
				switch(item.type) {

					case 'btn':
						return (
							<RB.InputGroup.Button key={items.indexOf(item)} >
								<RB.Button>
									{item.label}
								</RB.Button>
							</RB.InputGroup.Button>
						)
						break;

					case 'btn-vis':
						return (
							<RB.InputGroup.Button  key={items.indexOf(item)} >
								<VisibilityBtn visible={true} toggleVisibility={e => console.log('vis btn clicked')} />
							</RB.InputGroup.Button>
						)
						break;

					case 'addon':
						return (
							<RB.InputGroup.Addon key={items.indexOf(item)}>
								{item.label}
							</RB.InputGroup.Addon>
						)
						break;

					case 'addon-empty':
						return (
							<RB.InputGroup.Addon style={{padding:'0', border:'0', width:'0'}}></RB.InputGroup.Addon>
						)
						break;

					case 'input':
						return (
							<RB.FormControl
								key={items.indexOf(item)}
								type="text"
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
