import React from 'react';
import { DropTarget } from 'react-dnd';
import FontAwesome from 'react-fontawesome';
import ItemTypes from './ItemTypes';

const dropAreaStyle = {
  borderColor: '#2e6da4',
  border: '1px dashed',
  borderRadius: '4px',
  padding: '6px 12px',
  lineHeight: '1.428',
  fontSize: '100%',
  fontWeight: 'bold'
}

const dimensionTarget = {
  drop(props, monitor) {
    console.log('DIMENSION DROPPED');
    console.log(props);
    console.log(monitor);
    props.onDrop(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class DropArea extends React.Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div style={dropAreaStyle}>
        <FontAwesome name='plus-circle' />
        DROP HERE
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DIMENSION, dimensionTarget, collect)(DropArea);
