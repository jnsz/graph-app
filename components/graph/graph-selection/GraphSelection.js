import GraphType from './GraphType';
import Mapping from './Mapping';
// import { ButtonGroup, Button } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome';
// var FA = FontAwesome;

export default class GraphSelection extends React.Component {

    render() {
        return (
            <div>
                <GraphType
                  selectedGraph={this.props.selectedGraph}
                  onSelectedGraphChange={this.props.onSelectedGraphChange}
                />
                <Mapping dataset={this.props.dataset} />
            </div>
        );

    }
}
