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

const dropAreaCanDropStyle = {
  ...dropAreaStyle,
  border: '1px solid #39D831',
  color: '#39D831'
}

const dropAreaActiveStyle = {
  ...dropAreaStyle,
  color: 'white',
  backgroundColor: '#39D831',
  border: '1px solid #39D831',
}

const dropAreaWrongStyle = {
  ...dropAreaStyle,
  backgroundColor: '#cc6969',
  border: '1px solid #cc6969',
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
    const isCompatible = (dimensionNumericType || !variableNumericType) || !(itemType === 'dimension');

    let dropArea = function(){
      if (isCompatible && canDrop && !isOver) {
        return (<li style={dropAreaCanDropStyle}>
            <FontAwesome name='plus-circle' /> release over here
          </li>);
      }
      else if (isCompatible && canDrop && isOver) {
        return (<li style={dropAreaActiveStyle}>
            <FontAwesome name='plus-circle' /> release here
          </li>);
      }
      else if (!isCompatible) {
        return (<li style={dropAreaWrongStyle}>
            <FontAwesome name='times-circle' /> must be number
          </li>);
      }
      else {
        return (<li style={dropAreaStyle}>
            <FontAwesome name='plus-circle' /> {variableNumericType?'drop numbers':'drop any type'}
          </li>);
      }
    }()

    return connectDropTarget(
      <div>
        {dropArea}
      </div>
    );
  }
}

export default DropTarget('dimension', dimensionTarget, collect)(DropArea);
