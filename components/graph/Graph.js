import GraphSelection from './graph-selection/GraphSelection';
import GraphSVG from './GraphSVG';
import GraphCustomization from './graph-customization/GraphCustomization';
import GraphExport from './GraphExport';

export default class Graph extends React.Component{

  render() {
    return (
      <div>
          <GraphSelection
            dataset={this.props.dataset}
            selectedGraph={this.props.selectedGraph}
            selectedSubtype={this.props.selectedSubtype}
            graphConfig={this.props.graphConfig}
            onSelectedGraphChange={this.props.onSelectedGraphChange}
            onSelectedSubtypeChange={this.props.onSelectedSubtypeChange}
          />
          {this.props.selectedGraph === null ? false :
            <div>
              <GraphSVG
                svgSize={this.props.svgSize}
                onSvgSizeChange={this.props.onSvgSizeChange}
              />
              <GraphCustomization
                  graphConfig={this.props.graphConfig}
              />
              <GraphExport />
            </div>
          }
      </div>
    );
  }
}
