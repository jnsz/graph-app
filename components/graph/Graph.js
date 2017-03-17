import GraphType from './GraphType';
import Mapping from './graph-mapping/Mapping';
import GraphSVG from './GraphSVG';
import GraphCustomization from './graph-customization/GraphCustomization';
import GraphExport from './GraphExport';

export default class Graph extends React.Component{

  render() {
    return (
      <div>
        <div style={{backgroundColor: '#f8f8f8'}}>
          <div className='container'>
            <div className='wrapper'>

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
        <Mapping
          dataset={this.props.dataset}
          graphVariables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
    )
  }

  renderGraph() {
    return(
      <div>
        <GraphSVG
          svgSize={this.props.svgSize}
          graphSettings={this.props.graphSettings}
          dataset={this.props.dataset}
        />

        <GraphCustomization
          selectedGraph={this.props.selectedGraph}
          graphCustomizations={this.props.graphCustomizations}
          graphSettings={this.props.graphSettings}
          onGraphSettingsChange={this.props.onGraphSettingsChange}
          svgSize={this.props.svgSize}
          onSvgSizeChange={this.props.onSvgSizeChange}
        />

        <GraphExport />
      </div>
    )
  }

}
