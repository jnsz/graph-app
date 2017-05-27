import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import flow from 'lodash/flow';

const liStyle = {
  color: 'white',
  backgroundColor: '#39D831',
  padding: '6px 12px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  cursor:'move'
};
const liBorderStyle = {
  backgroundColor: 'white',
  border: '1px solid #39D831',
  marginBottom: '5px',
}
const typeStyle = {
  color: '#e2e2e2',
  paddingLeft: '4px',
  fontSize: '85%',
  fontStyle: 'italic'
}
const linkStyle = {
  color:'white'
}

function getType(props){
    return props.itemType;
}

const liSource = {
  beginDrag(props) {
    return {
      index: props.index,
      dimension: props.dimension,
    };
  },
};

const liTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveDimension(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class AssignedDimension extends Component {
  render () {
    const { dimension, index, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity= isDragging ? '0':'1';

    return connectDragSource(connectDropTarget(
      <li style={liBorderStyle}>
        <div style={{...liStyle, opacity}}>
        {dimension.dimension}
        <span style={typeStyle} >
          {dimension.isNumeric ? 'number' : 'string'}
        </span>
        <span className='pull-right'>
          <a href='#' style={linkStyle} onClick={() => this.props.onRemove(index)}><FontAwesome name='times'/></a>
        </span>
        </div>
      </li>
    ))
  }
}

export default flow([
  DragSource(getType,liSource,dragCollect),
  DropTarget(getType,liTarget,dropCollect)
])(AssignedDimension);
