export default class BtnGroup extends React.Component {

	handleClick(name){
		this.props.onChange(name);
	}

	render() {
		return (
      <div className="btn-group btn-group-justified">

				{this.props.labels.map((label, i) => {
					return (
						<div key={i+'btn'} className="btn-group" role="group">
							<button type="button" className="btn btn-default" onClick={e => this.handleClick(this.props.names[i])}>
								{label}
							</button>
						</div>
					)
				})}

      </div>
		);
	}
}
