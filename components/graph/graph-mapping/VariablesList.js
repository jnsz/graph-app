import { Col, Row } from 'react-bootstrap';
import Variable from './Variable';

export default class VariablesList extends React.Component{

  render() {
    const { variables, onAssignedDimensionsOfVariableChange} = this.props;
    if(variables.length <= 3) {
      return this.renderSingleRow(variables, onAssignedDimensionsOfVariableChange);
    } else {
      return this.renderTwoRows(variables, onAssignedDimensionsOfVariableChange);
    }

    // return (
    //   <Col md={9}>
    //     {variables.map((variable, i) => {
    //       return (
    //         <Variable
    //           key={i+'var'}
    //           variable={variable}
    //           onAssignedDimensionsOfVariableChange={onAssignedDimensionsOfVariableChange}
    //           index={i}
    //         />
    //       )
    //     })}
    //   </Col>
    // )
  }

  renderSingleRow(variables, onAssignedDimensionsOfVariableChange){
    return (
      <Col md={9}>
        {variables.map((variable, i) => {
          return (
            <Variable
              key={i+'var'}
              variable={variable}
              onAssignedDimensionsOfVariableChange={onAssignedDimensionsOfVariableChange}
              index={i}
            />
          )
        })}
      </Col>
    )
  }

  renderTwoRows(variables, onAssignedDimensionsOfVariableChange){
    return (
      <Col md={9}>
        <Row>
          {variables.map((variable, i) => {
            if(i>=3) return false;
            return (
              <Variable
                key={i+'var'}
                variable={variable}
                onAssignedDimensionsOfVariableChange={onAssignedDimensionsOfVariableChange}
                index={i}
              />
            )
          })}
        </Row>
        <Row>
          {variables.map((variable, i) => {
            if(i<3) return false;
            return (
              <Variable
                key={i+'var'}
                variable={variable}
                onAssignedDimensionsOfVariableChange={onAssignedDimensionsOfVariableChange}
                index={i}
              />
            )
          })}
        </Row>
      </Col>
    )
  }

}
