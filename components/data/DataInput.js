import * as d3 from 'd3';


export default class DataInput extends React.Component{


  handleChange(rawDataset) {
    if(typeof rawDataset === 'undefined'){
      rawDataset = '';
    }
    const dataset = d3.csvParse(rawDataset); // parse CSV as array of objects
    this.props.onRawDatasetChanged(rawDataset);
    this.props.onDatasetChanged(dataset); // change dataset in state
  }


  render() {

    return (
      <div  className="wrapper">
        <div className="form-group">
          <textarea className="form-control" rows="8" placeholder="Paste your CSV here..." value={this.props.rawDataset} onChange={e => {this.handleChange(e.target.value)}}></textarea>
        </div>
      </div>
    );
  }

}
