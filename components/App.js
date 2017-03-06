import * as d3 from 'd3';
import Data from './data/Data';
import Graph from './graph/Graph';
import FontAwesome from 'react-fontawesome';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { graphConfig } from './graphs/barChart';

//export default DragDropContext(HTML5Backend)(App);

export default class App extends React.Component {

  constructor() {
    super();
    //inicialni stav
    this.state = {
      rawDataset: '',
      dataset: d3.csvParse(''),
      selectedGraph: null,
      graphConfig: null,
      // svg: null,
      svgSize:{
          width:  800,
          height: 0.6 * 800,
          margins:{
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
          }
      },


    };
    //kazdou metodu tridy musime "nabindovat" - abychom ji mohli volat jako 'this.myMethod()'
    this.setRawDataset = this.setRawDataset.bind(this);
    this.setDataset = this.setDataset.bind(this);
    this.setGraphType = this.setGraphType.bind(this);
    // this.setSvg = this.setSvg.bind(this);
    this.setSvgSize = this.setSvgSize.bind(this);
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
            graphConfig={this.state.graphConfig}
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

  setGraphType(newGraphTypeName) {
    if(this.state.selectedGraph !== newGraphTypeName){
      this.setState({
        selectedGraph: newGraphTypeName
      })

      // TODO predelat, aby nacetl spravny config file
      if(newGraphTypeName === 'bar_chart'){
        this.setState({
          graphConfig: graphConfig
        })
      }
    }
  }

  // setSvg(newSvg) {
  //   this.setState({
  //     svg = newSvg;
  //   })
  // }

  setSvgSize(newSize){
    this.setState({
      svgSize:{
        width: (typeof newSize.width === 'undefined' ? this.state.svgSize.width : newSize.width),
        height: (typeof newSize.height === 'undefined' ? this.state.svgSize.height : newSize.height),
        margins: (typeof newSize.margins === 'undefined' ? this.state.svgSize.margins : newSize.margins)
      }
    })
  }

  componentDidUpdate() {
    window.onChangeState(this.state);
  }
}
