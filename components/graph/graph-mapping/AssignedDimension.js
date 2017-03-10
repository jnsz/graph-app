import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
// import ItemTypes from './ItemTypes';

import flow from 'lodash/flow';
import FontAwesome from 'react-fontawesome';

const liStyle = {
  color: 'white',
  backgroundColor: '#39D831',
  borderRadius: '4px',
  padding: '6px 12px',
  marginBottom: '3px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const typeStyle = {
  color: '#e2e2e2',
  paddingLeft: '4px',
  fontSize: '85%',
  fontStyle: 'italic'
}

export default class AssignedDimension extends React.Component {
  render () {
    return connectDragSource(connectDropTarget(
      <li style={liStyle}>
        {dimension.dimension}
        <span style={typeStyle} >
          {dimension.isNumeric ? 'number' : 'string'}
        </span>
        <span className='pull-right'>
          <a href='#' onClick={() => this.props.onRemove(index)}><FontAwesome name='times'/></a>
        </span>
      </li>
    ))
  }
}
