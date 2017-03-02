import * as d3 from 'd3';
import Data from './data/Data';
import Graph from './graph/Graph';
import FontAwesome from 'react-fontawesome';



export default class App extends React.Component {

  constructor() {
    super();
    //inicialni stav
    this.state = {
      rawDataset: '',
      dataset: d3.csvParse(''),
      selectedGraph: null,
      selectedSubtype: null
    };
    //kazdou metodu tridy musime "nabindovat" - abychom ji mohli volat jako 'this.myMethod()'
    this.setRawDataset = this.setRawDataset.bind(this);
    this.setDataset = this.setDataset.bind(this);
    this.setGraphType = this.setGraphType.bind(this);
    this.setGraphSubtype = this.setGraphSubtype.bind(this);
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

  setGraphType(newSelectedGraphTypeName) {
    this.setState({
      selectedGraph: newSelectedGraphTypeName
    })
  }

  setGraphSubtype(newSelectedGraphSubtypeName) {
    this.setState({
      selectedSubtype: newSelectedGraphSubtypeName
    })
  }

  componentDidUpdate() {
    window.onChangeState(this.state);
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
            selectedSubtype={this.state.selectedSubtype}
            onSelectedGraphChange={this.setGraphType}
            onSelectedSubtypeChange={this.setGraphSubtype}
          />
        }
      </div>
    );
  }
}
