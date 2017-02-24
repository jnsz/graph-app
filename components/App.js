import Data from './data/Data';
import Graph from './Graph';
import FontAwesome from 'react-fontawesome';

export default class App extends React.Component {

    constructor() {
      super();
      //inicialni stav
      this.state = {
        parsedData: null,
        selectedGraph: null
      };
      //kazdou metodu tridy musime "nabindovat" - abychom ji mohli volat jako 'this.myMethod()'
      //this.increase = this.increase.bind(this);
    }

    componentDidUpdate() {
      window.onChangeState(this.state);
    }

    render() {
      return (
        <div>
            <h1 className="container">Graph app</h1>
            <Data/>
            <Graph/>
        </div>
      );
    }

}
