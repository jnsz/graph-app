import GraphType from './GraphType';
import Mapping from './Mapping';
// import { ButtonGroup, Button } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome';
// var FA = FontAwesome;

export default class GraphSelection extends React.Component {

    render() {
        return (
            <div>
                <GraphType graphTypes={this.props.graphTypes} />
                <Mapping dataset={this.props.dataset} />
            </div>
        );

    }
}
