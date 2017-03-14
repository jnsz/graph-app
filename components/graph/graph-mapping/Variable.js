import update from 'react/lib/update';
import FontAwesome from 'react-fontawesome';
import { Col, Label } from 'react-bootstrap';

import DropArea from './DropArea';
import AssignedDimension from './AssignedDimension';

const variableStyle = {
  backgroundColor: 'white',
  padding: '15px',
  margin: '0px 0px 10px 0px'
}
const iconStyle = {
  color: '#696969',
  margin: '0px 2px'
}

export default class Variable extends React.Component{

  constructor() {
    super();
    this.removeDimension = this.removeDimension.bind(this);
    this.moveDimension = this.moveDimension.bind(this);
    this.addNewDimension = this.addNewDimension.bind(this)
  }

  render() {
    const { variable } = this.props
    const label = variable.label;
    const desc = variable.desc;
    const isRequired = typeof variable.isRequired === 'undefined' ? false : variable.isRequired;
    const takesSingleDimension = typeof variable.takesSingleDimension === 'undefined' ? false : variable.takesSingleDimension;
    const mustBeNumeric = typeof variable.mustBeNumeric === 'undefined' ? false : variable.mustBeNumeric;
    const assignedDimensions = variable.assignedDimensions;

    return (
      <Col md={4}>
        <div style={variableStyle}>
          <div>
            {isRequired ? <FontAwesome name='asterisk' style={iconStyle}/> : false}
            {takesSingleDimension ? <FontAwesome name='tag' style={iconStyle}/>: <FontAwesome name='tags' style={iconStyle}/>}
            <strong> {label} </strong>
          </div>
          {/*<div><small> {desc} </small></div>*/}

          <ul style={{marginTop:'10px'}}>
            {assignedDimensions.map((dimension, i) => {
              return <AssignedDimension itemType={label} dimension={dimension} key={dimension.dimension} index={i} onRemove={this.removeDimension} moveDimension={this.moveDimension}/>
            })}
            {this.showDropArea(takesSingleDimension, mustBeNumeric)}
          </ul>


      </div>
      </Col>
    );
  }

  showDropArea(takesSingleDimension, mustBeNumeric) {
    if(!(takesSingleDimension && this.props.variable.assignedDimensions.length != 0)) {
      return <DropArea variableNumericType={mustBeNumeric} onDrop={dimension => this.handleDrop(dimension, mustBeNumeric)}/>
    }
  }

  handleDrop(dimension, mustBeNumeric){
    if(!(mustBeNumeric && !dimension.isNumeric)) {
      this.addNewDimension(dimension);
    }
  }

  addNewDimension(dimension) {
    // pokud assignedDimension uz dimenzi obsahuje, nic nedelej
    for(const assignedDimension of this.props.variable.assignedDimensions){
      if(assignedDimension.dimension === dimension.dimension){
        return;
      }
    }
    // jinak pridej novou dimenzi
    const newAssignedDimensions = this.props.variable.assignedDimensions.concat([dimension]);
    this.props.onAssignedDimensionsOfVariableChange(this.props.index, newAssignedDimensions);
  }

  removeDimension(index){
    const newAssignedDimensions = this.props.variable.assignedDimensions;
    newAssignedDimensions.splice(index, 1);
    this.props.onAssignedDimensionsOfVariableChange(this.props.index, newAssignedDimensions);

  }

  moveDimension(dragIndex, hoverIndex) {
    const dragDimension = this.props.variable.assignedDimensions[dragIndex];

    const newAssignedDimensions = this.props.variable.assignedDimensions;
    newAssignedDimensions.splice(dragIndex, 1);
    newAssignedDimensions.splice(hoverIndex, 0, dragDimension);

    this.props.onAssignedDimensionsOfVariableChange(this.props.index, newAssignedDimensions);
  }
}
