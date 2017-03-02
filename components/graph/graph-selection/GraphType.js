import BtnGroup from './BtnGroup';
import graph_types_list from '../../charts/graph_types_list.json';

export default class GraphType extends React.Component{

  renderSubtypes(graphTypesList){

    return (
      <div className="row">
        {graphTypesList.map(type => {
          if(type.name === this.props.selectedGraph) {
            type.subtypes.map(subtype => {

              return (
                <div className="col-md-6">
                  <BtnGroup onChange={this.props.onSelectedSubtypeChange} labels={subtype.map(type => {return type.label;})} names={subtype.map(type => {return type.name;})} />
                </div>
              )

            })
          }
        })}
      </div>
    )
  }

  render() {
    const graphTypesList = graph_types_list;

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-md-12">
            <BtnGroup onChange={this.props.onSelectedGraphChange} labels={graphTypesList.map(type => {return type.label;})} names={graphTypesList.map(type => {return type.name;})} />
          </div>
        </div>
        { this.renderSubtypes(graphTypesList) }
      </div>
    );
  }
}
