import GraphSelection from './graph-selection/GraphSelection';
import GraphSVG from './GraphSVG';
import GraphCustomization from './graph-customization/GraphCustomization';
import GraphExport from './GraphExport';

export default class Graph extends React.Component{

  render() {
    return (
      <div className="container">
        <h3>GRAPH</h3>
        <div className="wrapper">
          <GraphSelection
            dataset={this.props.dataset}
            selectedGraph={this.props.selectedGraph}
            selectedSubtype={this.props.selectedSubtype}
            onSelectedGraphChange={this.props.onSelectedGraphChange}
            onSelectedSubtypeChange={this.props.onSelectedSubtypeChange}
          />
          <GraphSVG />
          <GraphCustomization />
          <GraphExport />
        </div>
      </div>
    );
  }
}
