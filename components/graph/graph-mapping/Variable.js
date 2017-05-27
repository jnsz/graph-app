import React, { Component } from 'react';
import update from 'react/lib/update';
import FontAwesome from 'react-fontawesome';
import { Col, Label, OverlayTrigger } from 'react-bootstrap';

import DropArea from './DropArea';
import AssignedDimension from './AssignedDimension';
import Overlay from '../../Overlay';

const variableStyle = {
  backgroundColor: 'white',
  padding: '15px',
  margin: '0px 0px 10px 0px',
  fontSize: '14px',
}
const iconStyle = {
  color: '#666',
  margin: '0px 2px'
}

export default class Variable extends Component{

  constructor() {
    super();
    this.removeDimension = this.removeDimension.bind(this);
    this.moveDimension = this.moveDimension.bind(this);
    this.addNewDimension = this.addNewDimension.bind(this)
  }

  render() {
    const { variable } = this.props
    const label = variable.label;
    const desc = variable.desc == null ? false : variable.desc;
    const isRequired = typeof variable.isRequired === 'undefined' ? false : variable.isRequired;
    const takesSingleDimension = typeof variable.takesSingleDimension === 'undefined' ? false : variable.takesSingleDimension;
    const mustBeNumeric = typeof variable.mustBeNumeric === 'undefined' ? false : variable.mustBeNumeric;
    const assignedDimensions = variable.assignedDimensions;

    return (
      <Col md={4}>
        <div className='box small' style={variableStyle}>
          <span>
            {isRequired ? <Overlay tooltipText='Is required'><FontAwesome name='asterisk' style={iconStyle}/></Overlay> : false}
            {takesSingleDimension ? <Overlay tooltipText='Takes single dimension'><FontAwesome name='tag' style={iconStyle}/></Overlay> : <Overlay tooltipText='Takes multiple dimensions'><FontAwesome name='tags' style={iconStyle}/></Overlay>}
            <strong> {label} </strong><br />
            <small style={{color:'#666'}}>{desc}</small>
          </span>

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
