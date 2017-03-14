import { Col } from 'react-bootstrap';
import Variable from './Variable';

export default class VariablesList extends React.Component{

  render() {
    const variables = this.props.variables;

    return (
      <Col md={9}>
        {variables.map((variable, i) => {
          return (
            <Variable
              key={i+'var'}
              variable={variable}
              onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
              index={i}
            />
          )
        })}
      </Col>
    )
  }

}
