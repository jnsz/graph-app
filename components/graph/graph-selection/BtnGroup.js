import Button from './Button';

export default class BtnGroup extends React.Component {

	render() {
		return (
      <div className="btn-group btn-group-justified">
				{this.props.labels.map((label, i) => {
					return <Button key={i+'btn'} label={label} />
				})}
      </div>
		);
	}
}
