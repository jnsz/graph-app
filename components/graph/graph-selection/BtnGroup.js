import Button from './Button';

export default class BtnGroup extends React.Component {

	render() {
		return (
	        <div className="btn-group btn-group-justified">
				{this.props.labels.map(label => {
					return <Button label={label} />
				})}
	        </div>

		);
	}
}
