import FontAwesome from 'react-fontawesome';

const liStyle = {
  color: 'white',
  backgroundColor: '#337ab7',
  borderRadius: '4px',
  padding: '6px 12px',
  marginBottom: '3px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  cursor: 'move',
  overflow: 'hidden'
};

const typeStyle = {
  color: '#e2e2e2',
  paddingLeft: '4px',
  fontSize: '85%',
  fontStyle: 'italic'
}

export default class DimensionsList extends React.Component{

  render() {
    //console.log(this.props.dataset[0]);
    // console.log(this.props.dataset.length);
    // console.log(this.props.dataset);

    return (
      <div className='col-md-3'>
        { this.renderDimensions() }
      </div>
    );
  }

  renderDimensions(){

    if( typeof this.props.dataset.columns !== 'undefined') {
      return (
        <ul>
          {this.props.dataset.columns.map((column, i) => {
            return (
              <li key={i+'li'} style={liStyle}>
                {column}
                <span style={typeStyle} >
                  {this.props.dataset.isNumeric[column] ? 'number' : 'string'}
                </span>
                <span className='pull-right'>
                  <FontAwesome name='bars'/>
                </span>
              </li>
            )
          })}
        </ul>
      )
    }
  }
}
