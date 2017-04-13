import { DragSource } from 'react-dnd';
import FontAwesome from 'react-fontawesome';

// CSS
const liStyle = {
  color: 'white',
  backgroundColor: '#337ab7',
  padding: '6px 12px',
  marginBottom: '3px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  cursor:'move'
}


const typeStyle = {
  color: '#e2e2e2',
  paddingLeft: '4px',
  fontSize: '85%',
  fontStyle: 'italic'
}

// dnd dimensionSource
const dimensionSource = {
  beginDrag(props) {
    return {
      dimension: props.column,
      isNumeric: props.isNumeric,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();


    if (dropResult) {

    }
  },
}

// dnd collect
function collect(connect, monitor) {
  return{
    connectDragSource: connect.dragSource(),
  }
}

class Dimension extends React.Component {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <li style={liStyle}>
        {this.props.column}
        <span style={typeStyle} >
          {this.props.isNumeric ? 'number' : 'string'}
        </span>
        <span style={{float:'right'}}>
          <FontAwesome name='bars'/>
        </span>
      </li>
    )
  }
}

export default DragSource('dimension', dimensionSource, collect)(Dimension);
