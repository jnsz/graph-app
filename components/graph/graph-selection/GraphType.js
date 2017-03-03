import graph_types_list from '../../charts/graph_types_list.json';

export default class GraphType extends React.Component {

  handleClick(name){
		this.props.onSelectedGraphChange(name);
	}

  renderTypes() {
    return (
      <div className="row">
        <div className="col-md-12">
            <div className="btn-group btn-group-justified">

              {graph_types_list.map((type, i) => {
                const isActive = this.props.selectedGraph === type.name;
                return (
                  <div key={i+'btn'} className="btn-group" role="group">
                    <button type="button" className={'btn btn-default '+ (isActive? 'active':'')} onClick={e => this.handleClick(type.name)}>
                      <i className={type.icon+ ' fa-5x'}/>
                    </button>
                  </div>
                )
              })}

            </div>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.props.selectedGraph);
    return (
      <div className="wrapper">
        { this.renderTypes() }
      </div>
    );
  }
}
