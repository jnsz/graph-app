import * as d3 from 'd3';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Data from './data/Data';
import Graph from './graph/Graph';
import { graphConfig } from './graphs/barChart_old';

import barChart from './graphs/barChart';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      // when textarea is filled this is set
      rawDataset: '',
      dataset: d3.csvParse(''),

      // svg size
      svgSize:{
          width:  800,
          height: 480,
          margin: 0.2
      },

      // when graph is selected these are set
      selectedGraph: null,
      graphVariables: null,
      graphCustomizations: null,
      graphSettings: null,
    };

    this.setRawDataset = this.setRawDataset.bind(this);
    this.setDataset = this.setDataset.bind(this);
    this.setGraphType = this.setGraphType.bind(this);
    this.setSvgSize = this.setSvgSize.bind(this);
    this.setGraphSettings = this.setGraphSettings.bind(this);
    this.setAssignedDimensions = this.setAssignedDimensions.bind(this);
  }

  render() {

    console.log(graphConfig);
    console.log(barChart);

    return (
      <div>
        <Data
          onRawDatasetChanged={this.setRawDataset}
          onDatasetChanged={this.setDataset}
          rawDataset={this.state.rawDataset}
          dataset={this.state.dataset}
        />
        {typeof this.state.dataset.columns === 'undefined' ? false :
          <Graph
            dataset={this.state.dataset}
            selectedGraph={this.state.selectedGraph}
            onSelectedGraphChange={this.setGraphType}

            graphVariables={this.state.graphVariables}
            onAssignedDimensionsOfVariableChange={this.setAssignedDimensions}
            graphCustomizations={this.state.graphCustomizations}
            graphSettings={this.state.graphSettings}
            onGraphSettingsChange={this.setGraphSettings}
            svgSize={this.state.svgSize}
            onSvgSizeChange={this.setSvgSize}
          />
        }
      </div>
    );
  }



  setRawDataset(newRawDataset) {
    this.setState({
      rawDataset: newRawDataset
    })
  }

  setDataset(newParsedDataset) {
    this.setState({
      dataset: newParsedDataset
    })
  }

  // nastavi grapf type a nastavi variables (vizualni promenne), customizations (upravení) a default settings (hodnoty pro vykresleni grafu)
  setGraphType(newGraphTypeName) {
    if(this.state.selectedGraph !== newGraphTypeName){
      this.setState({
        selectedGraph: newGraphTypeName
      })

      // TODO predelat, aby nacetl spravny config file
      // momentalne nacita pouze bar chart config
      if(newGraphTypeName === 'bar_chart') {
        this.setState({
          graphVariables: graphConfig.graphVariables,
          graphCustomizations: graphConfig.graphCustomizations,
          graphSettings: graphConfig.defaultSettings,
        })
      } else {
        this.setState({
          graphVariables: null,
          graphCustomizations: null,
          graphSettings: null,
        })
      }
    }
  }


  setAssignedDimensions(index, newAssignedDimensions){
    const newGraphVariables = this.state.graphVariables
    newGraphVariables[index].assignedDimensions = newAssignedDimensions;

    this.setState({
      graphVariables: newGraphVariables,
    })
  }

  // nastavi velikost svg a margin
  setSvgSize(newSize){
    this.setState({
      svgSize: Object.assign(this.state.svgSize, newSize)
    })
  }

  // zmeni nastaveni
  setGraphSettings(newSettings) {
    this.setState({
      graphSettings: Object.assign(this.state.graphSettings, newSettings)
    })
  }
}
