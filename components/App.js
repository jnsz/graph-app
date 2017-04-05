import * as d3 from 'd3';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Data from './data/Data';
import Graph from './graph/Graph';

import BarChart from './graphs/BarChart';
import PieChart from './graphs/PieChart';
import LineChart from './graphs/LineChart';
import ScatterPlot from './graphs/ScatterPlot';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      // when textarea is filled this is set
      rawDataset: '',
      dataset: d3.csvParse(''),

      // svg size
      svgSize:{
          width:  Math.round(window.innerWidth * 0.8),
          height: Math.round(window.innerWidth * 0.5),
          margin: 0.2,
      },

      // when graph is selected these are set
      selectedGraph: null,
      graphVariables: null,
    };

    this.setRawDataset = this.setRawDataset.bind(this);
    this.setDataset = this.setDataset.bind(this);
    this.setGraphType = this.setGraphType.bind(this);
    this.setSvgSize = this.setSvgSize.bind(this);
    this.setAssignedDimensions = this.setAssignedDimensions.bind(this);
  }

  render() {

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
      });

      switch(newGraphTypeName){
        case 'BarChart':
          this.setState({
            graphVariables: BarChart.variables,
          });
          break;
        case 'PieChart':
          this.setState({
            graphVariables: PieChart.variables,
          });
          break;
        case 'LineChart':
          this.setState({
            graphVariables: LineChart.variables,
          });
          break;
        case 'ScatterPlot':
          this.setState({
            graphVariables: ScatterPlot.variables,
          })
        default:
        this.setState({
          graphVariables: null,
        });

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
      svgSize: {...this.state.svgSize, ...newSize}
      //svgSize: Object.assign(this.state.svgSize, newSize)
    })
  }

  // zmeni nastaveni
  setGraphSettings(newSettings) {
    this.setState({
      graphSettings: {...this.state.graphSettings, ...newSettings}
    })
  }
}
