import React from 'react';
import { DragLayer } from 'react-dnd';
import Dimension from './Dimension';
import AssignedDimension from './AssignedDimension';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }
}

class CustomDragLayer extends React.Component {
  renderItem(type, item) {
    switch (type) {
      case 'dimension':
        return <Dimension column='dimension' isNumeric={true} />;
      default:
        return <AssignedDimension dimension={dimension} index={i}/>;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
          {this.renderItem(itemType, item)}
      </div>
    );
  }
}

export default DragLayer(collect)(CustomDragLayer);
