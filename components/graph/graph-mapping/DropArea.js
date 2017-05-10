import { DropTarget } from 'react-dnd';
import FontAwesome from 'react-fontawesome';

const dropAreaStyle = {
  borderColor: '#2e6da4',
  border: '1px dashed',
  padding: '6px 12px',
  lineHeight: '1.428',
  fontSize: '100%',
  fontStyle: 'italic'
}
const dropAreaActiveStyle = {
  ...dropAreaStyle,
  color: 'white',
  backgroundColor: '#39D831',
  border: '1px hidden',
}
const dropAreaWrongStyle = {
  ...dropAreaStyle,
  backgroundColor: '#cc6969',
  border: '1px hidden',
}

const dimensionTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    item: monitor.getItem(),
    dimensionNumericType: (monitor.getItem() === null) ? true : monitor.getItem().isNumeric,
    itemType: monitor.getItemType(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class DropArea extends React.Component {
  render() {
    const { item, itemType, canDrop, isOver, connectDropTarget, dimensionNumericType, variableNumericType} = this.props;
    const isActive = canDrop && isOver;
    const canDropStyle = (dimensionNumericType || !variableNumericType) || !(itemType === 'dimension');

    return connectDropTarget(
      <div>
      {canDropStyle ?
        <li style={isActive ? dropAreaActiveStyle : dropAreaStyle}>
          <FontAwesome name='plus-circle' /> {variableNumericType?'drop numbers':'drop any type'}
        </li>
        :
        <li style={dropAreaWrongStyle}>
          <FontAwesome name='times-circle' /> must be number
        </li>
      }
      </div>
    );
  }
}

export default DropTarget('dimension', dimensionTarget, collect)(DropArea);
