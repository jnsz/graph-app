import GraphSelection from './GraphSelection';
import GraphSVG from './GraphSVG';
import GraphCustomization from './GraphCustomization';
import GraphExport from './GraphExport';

export default class Graph extends React.Component{

  render() {
    return (
        <div className="container">
            <div className="wrapper">
                <GraphSelection />
                <GraphSVG />
                <GraphCustomization />
                <GraphExport />
            </div>
        </div>
    );
  }
}
