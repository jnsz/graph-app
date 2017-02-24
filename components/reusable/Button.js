export default class Button extends React.Component{

  render() {
    return (
        <div className="btn-group" role="group">
            <button type="button" className="btn btn-default">
                <i className={this.props.icon}></i>
            </button>
        </div>
    );
  }
}
