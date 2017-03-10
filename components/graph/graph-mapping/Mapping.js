import { Row } from 'react-bootstrap';
import DimensionsList from './DimensionsList';
import VariablesList from './VariablesList';

export default class Mapping extends React.Component{

  // dimension - sloupec datasetu
  //           - dimenze se da pretahnout na promennou
  // variable - vizualni promenna (napr.: x-ova / y-ova souradnice, barva, velikost apod.)
  //          - promenne muzou vyzadovat cislo nebo muzou prijmout cokoliv
  //          - promenne muzou prijmout  1 nebo vice dimenzi
  render() {
    return (
      <Row>
        <DimensionsList dataset={this.props.dataset} />
        <VariablesList
          variables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
      </Row>
    );
  }
}
