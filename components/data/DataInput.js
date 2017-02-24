export default class DataInput extends React.Component{

  render() {
    return (
        <div  className="wrapper">
            <div className="form-group">
                <textarea className="form-control" rows="8" placeholder="Paste your CSV here..."></textarea>
            </div>
            <div>
                <button className="btn btn-block btn-success">Parse data</button>
            </div>
        </div>
    );
  }

}
