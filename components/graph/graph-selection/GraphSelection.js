import GraphType from './GraphType';
import Mapping from './Mapping';
// import { ButtonGroup, Button } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome';
// var FA = FontAwesome;


export default class GraphSelection extends React.Component {

    render() {
        return (
            <div style={{backgroundColor: '#f8f8f8'}}>
            <div className="container">
              <div className="wrapper">
                <GraphType
                  selectedGraph={this.props.selectedGraph}
                  onSelectedGraphChange={this.props.onSelectedGraphChange}
                />
                {this.props.selectedGraph === null ? false :
                  <Mapping
                    dataset={this.props.dataset}
                    selectedGraph={this.props.selectedGraph}
                    graphConfig={this.props.graphConfig}
                  />
                }

            </div></div></div>
        );

    }
}
