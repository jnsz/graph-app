import * as d3 from 'd3';
import { Tabs, Tab, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import Data from './data/Data';
import Graph from './graph/Graph';
import About from './About';

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
          width:  d3.min([Math.round(window.innerWidth * 0.8), 900]),
          height: d3.min([Math.round(window.innerWidth * 0.5), 700]),
          margin: 0.2,
      },

      // when graph is selected these are set
      selectedGraph: 'BarChart',
      graphVariables: BarChart.variables,
    };

    this.setRawDataset = this.setRawDataset.bind(this);
    this.setDataset = this.setDataset.bind(this);
    this.setGraphType = this.setGraphType.bind(this);
    this.setSvgSize = this.setSvgSize.bind(this);
    this.setAssignedDimensions = this.setAssignedDimensions.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  render() {

    const dataNode =(
      <Data
        onRawDatasetChanged={this.setRawDataset}
        onDatasetChanged={this.setDataset}
        rawDataset={this.state.rawDataset}
        dataset={this.state.dataset}
      />)

    const graphNode =(
      this.state.dataset.columns == null ? false :
      <div>
        <Graph
          dataset={this.state.dataset}
          selectedGraph={this.state.selectedGraph}
          onSelectedGraphChange={this.setGraphType}
          graphVariables={this.state.graphVariables}
          onAssignedDimensionsOfVariableChange={this.setAssignedDimensions}
          svgSize={this.state.svgSize}
          onSvgSizeChange={this.setSvgSize}
        />
      </div>
    )


    return (
      <div className='container'>
        <Tabs defaultActiveKey={0} onSelect={key => {this.handleTabChange(key)}} bsStyle='pills' id='main-nav' animation={false}>
          <Tab
            eventKey={0}
            title={<span><FontAwesome name='table'/> Data parsing</span>}
          >
            {dataNode}

          </Tab>
          <Tab title='Select graph:' disabled />
          <Tab
            eventKey={'BarChart'}
            title={<span><FontAwesome name='bar-chart'/> Bar chart</span>}
            disabled={this.state.dataset.columns == null}
          >
            {this.state.selectedGraph === 'BarChart' ? graphNode : false}
          </Tab>
          <Tab
            eventKey={'PieChart'}
            title={<span><FontAwesome name='pie-chart'/> Pie chart</span>}
            disabled={this.state.dataset.columns == null}
          >
            {this.state.selectedGraph === 'PieChart' ? graphNode : false}
          </Tab>
          <Tab
            eventKey={'LineChart'}
            title={<span><FontAwesome name='line-chart'/> Line chart</span>}
            disabled={this.state.dataset.columns == null}
          >
            {this.state.selectedGraph === 'LineChart' ? graphNode : false}
          </Tab>
          <Tab
            eventKey={'ScatterPlot'}
            title={<span><FontAwesome name='braille'/> Scatter plot</span>}
            disabled={this.state.dataset.columns == null}
          >
            {this.state.selectedGraph === 'ScatterPlot' ? graphNode : false}
          </Tab>

          <Tab
            eventKey={5}
            title={<span><FontAwesome name='info'/> About</span>}
            tabClassName='pull-right'
          >
            <About />
          </Tab>
        </Tabs>
      </div>
    );
  }

  handleTabChange(key){
    if(isNaN(key)){
      this.setGraphType(key);
    }
  }

  setRawDataset(newRawDataset) {
    this.setState({
      rawDataset: newRawDataset
    })
  }

  setDataset(newParsedDataset) {
    const graphList = [BarChart, PieChart, LineChart, ScatterPlot];
    graphList.map(graph => {
      graph.variables.map(variable => {variable.assignedDimensions = []})
    })

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
          break;
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
    })
  }

  // zmeni nastaveni
  setGraphSettings(newSettings) {
    this.setState({
      graphSettings: {...this.state.graphSettings, ...newSettings}
    })
  }
}
