import * as d3 from 'd3';
import Data from './data/Data';
import Graph from './graph/Graph';
import FontAwesome from 'react-fontawesome';
import graph_types_list from './charts/graph_types_list.json';

export default class App extends React.Component {

    constructor() {
        super();
        //inicialni stav
        this.state = {
            dataset: d3.csvParse(''),//a,b,c\n1,2,3\nx,y,z
            selectedGraph: null,
            graphTypes : graph_types_list
        };
        //kazdou metodu tridy musime "nabindovat" - abychom ji mohli volat jako 'this.myMethod()'
        //this.increase = this.increase.bind(this);
        this.setDataset = this.setDataset.bind(this);
    }

    setDataset(newDataset) {
        this.setState({
            dataset: newDataset
        })
    }

    componentDidUpdate() {
        window.onChangeState(this.state);
    }

    render() {



        return (
            <div>
                <h1 className = "container"> Graph app </h1>
                <Data onDatasetChanged={this.setDataset} dataset={this.state.dataset} />
                <Graph
                  graphTypes={this.state.graphTypes}
                  dataset={this.state.dataset}
                />
            </div>
        );
    }

}
