import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      <DragDropContextProvider backend={HTML5Backend}>
        <Mapping
          dataset={this.props.dataset}
          graphVariables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
      </DragDropContextProvider>
    )
  }

  renderGraph() {
    return(
      <div>
        <GraphSVG
          svgSize={this.props.svgSize}
          graphSettings={this.props.graphSettings}
        />

        <GraphCustomization
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
