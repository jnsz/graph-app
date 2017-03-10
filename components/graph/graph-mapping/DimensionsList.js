import Dimension from './Dimension';

export default class DimensionsList extends React.Component{

  render() {

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
