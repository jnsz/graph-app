import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Dimension from './Dimension';

export default class DimensionsList extends Component{

  render() {

    return (
      <Col md={3}>
        { this.renderDimensions() }
      </Col>
    );
  }

  renderDimensions(){

    if(this.props.dataset.columns != null) {
      return (
        <ul>
          {this.props.dataset.columns.map((column, i) => {
            const isNumeric = this.props.dataset.isNumeric[column];
            return (
              <Dimension key={i+'li'} column={column} isNumeric={isNumeric} />
            )
          })}
        </ul>
      )
    }
  }

}
