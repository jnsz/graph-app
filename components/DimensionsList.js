export default class DimensionsList extends React.Component{

  render() {
    return (
        <div className="col-md-3">
            <ul>
                <li>
                    name<span className="dimension-icon pull-right"><i className="fa fa-bars"></i></span>
                </li>
                <li>
                    fame<span className="dimension-icon pull-right"><i className="fa fa-bars"></i></span>
                </li>
                <li>
                    bane<span className="dimension-icon pull-right"><i className="fa fa-bars"></i></span>
                </li>
            </ul>
        </div>
    );
  }

}
