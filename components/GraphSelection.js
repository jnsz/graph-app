import GraphType from './GraphType';
import VariablesMapping from './VariablesMapping';
// import { ButtonGroup, Button } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome';
// var FA = FontAwesome;

export default class GraphSelection extends React.Component{

  render() {
    return (
      <div>
        <GraphType />
        <VariablesMapping />
      </div>
    );
  }

}
