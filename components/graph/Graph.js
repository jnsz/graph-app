import GraphType from './GraphType';
import Mapping from './graph-mapping/Mapping';
import GraphSVG from './GraphSVG';
import GraphCustomization from './graph-customization/GraphCustomization';

export default class Graph extends React.Component{

  render() {
    return (
      <div>
        <div style={{backgroundColor: '#ededed'}}>
          <div className='container'>
            <div className='wrapper'>

              <h2>Graph selection</h2>

              <GraphType
                selectedGraph={this.props.selectedGraph}
                onSelectedGraphChange={this.props.onSelectedGraphChange}
              />

              {/*vykresli pokud je zvoleny graf */}
              {this.props.selectedGraph === null ? false : this.renderMapping()}
            </div>
          </div>
        </div>

        {/*vykresli pokud je zvoleny graf */}
        {this.props.selectedGraph === null ? false : this.renderGraph()}
      </div>
    );
  }

  // DragDropContextProvider je z react-dnd vsechny; child komponenty jsou dnd enabled
  renderMapping() {
    return(
      <div>
        <h2>Map dimensions on graphic variables</h2>
        <Mapping
          dataset={this.props.dataset}
          graphVariables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
      </div>
    )
  }

  renderGraph() {
    return(
      <div>
        <GraphSVG
          svgSize={this.props.svgSize}
          graphSettings={this.props.graphSettings}
          dataset={this.props.dataset}

          selectedGraph={this.props.selectedGraph}
          onSvgSizeChange={this.props.onSvgSizeChange}
        />
      </div>
    )
  }

}
