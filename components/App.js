import React, { Component } from 'react';
import { Tabs, Tab, Row, Button, Modal } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import * as d3 from 'd3';

import Data from './data/Data';
import Graph from './graph/Graph';
import About from './About';
import BarChart from './graphs/BarChart';
import PieChart from './graphs/PieChart';
import LineChart from './graphs/LineChart';
import ScatterPlot from './graphs/ScatterPlot';

/**
 * Main component. Renders navbar tabs.
 */
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      rawDataset: '',
      dataset: d3.csvParse(''),
      svgSize:{
          width:  d3.min([Math.round(window.innerWidth * 0.8), 900]),
          height: d3.min([Math.round(window.innerWidth * 0.5), 700]),
          margin: 0.2,
      },
      selectedGraph: 'BarChart',
      graphVariables: BarChart.variables,
      activeTab: 0,
      showAbout: false,
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
      <div>
        <div style={{marginBottom:'30px'}} />
        <div className='container'>
          <Tabs activeKey={this.state.activeTab} onSelect={key => {this.handleTabChange(key)}} bsStyle='pills' id='main-nav' animation={false}>
            <Tab
              eventKey={0}
              title={<span><FontAwesome name='table'/> Data parsing</span>}
            >
              {dataNode}

            </Tab>
            <Tab title={(this.state.dataset.columns == null) ? 'No data:' : 'Select graph:'} disabled />
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
              title={<span><span className="icon-scatter"/> Scatter plot</span>}
              disabled={this.state.dataset.columns == null}
            >
              {this.state.selectedGraph === 'ScatterPlot' ? graphNode : false}
            </Tab>

            <Tab
              eventKey={5}
              title={<span><FontAwesome name='question'/> Help</span>}
              tabClassName='pull-right'
            />
          </Tabs>

          <Modal show={this.state.showAbout} onHide={() => {this.setState({showAbout:false})}}>
            <About/>
          </Modal>

        </div>
      </div>
    );
  }

  /**
   * Changes tab
   */
  handleTabChange(key){
    if(isNaN(key)){
      this.setGraphType(key);
    }
    if(key == 5){
      this.setState({showAbout:true});
    }
    else {
      this.setState({activeTab:key});
    }
  }

  /**
   * Sets new raw dataset which is just a string from text field
   * @param {String} newRawDataset
   */
  setRawDataset(newRawDataset) {
    this.setState({
      rawDataset: newRawDataset
    })
  }

  /**
   * Sets new parsed dataset
   * @param {object} newParsedDataset
   */
  setDataset(newParsedDataset) {
    const graphList = [BarChart, PieChart, LineChart, ScatterPlot];
    graphList.map(graph => {
      graph.variables.map(variable => {variable.assignedDimensions = []})
    })

    this.setState({
      dataset: newParsedDataset
    })
  }

  /**
   * Set graph type and sets variables, customizations and default settings.
   * @param {String} newGraphTypeName name of the graph
   */
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

  /**
   * Add new assigned dimension
   * @param {int} index index of variable
   * @param {String} newAssignedDimensions name of the new dimension
   */
  setAssignedDimensions(index, newAssignedDimensions){
    const newGraphVariables = this.state.graphVariables
    newGraphVariables[index].assignedDimensions = newAssignedDimensions;

    this.setState({
      graphVariables: newGraphVariables,
    })
  }

  /**
   * Sets new svg height, width and margin
   * @param {object} newSize object containing size parameteres
   */
  setSvgSize(newSize){
    this.setState({
      svgSize: {...this.state.svgSize, ...newSize}
    })
  }

  /**
   * Sets new graph settings
   * @param {object} newSettings object containing settings parameteres
   */
  setGraphSettings(newSettings) {
    this.setState({
      graphSettings: {...this.state.graphSettings, ...newSettings}
    })
  }
}
