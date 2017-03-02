export default class DimensionsList extends React.Component{

  renderDimensions(){
    if( typeof this.props.dataset.columns !== 'undefined') {
      return (
        <ul>
          {this.props.dataset.columns.map((column, i) => {
            return (
              <li key={i+'li'}>
                {column}
                <span className="dimension-icon pull-right"><i className="fa fa-bars"></i></span>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="col-md-3">
        { this.renderDimensions() }
      </div>
    );
  }

}
