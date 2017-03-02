import * as d3 from 'd3';

export default class DataInput extends React.Component{

    constructor() {
      super();
      this.parseRawDataset = this.parseRawDataset.bind(this);
    }

    parseRawDataset(rawDataset) {
      if(typeof rawDataset === 'undefined'){
        rawDataset = '';
      }
        const dataset = d3.csvParse(rawDataset); // parse CSV as array of objects
        this.props.onDatasetChanged(dataset); // change dataset in state
    }



    render() {
        return (
            <div  className="wrapper">
                <div className="form-group">
                    <textarea className="form-control" rows="8" placeholder="Paste your CSV here..." onChange={e => {this.parseRawDataset(e.target.value)}}></textarea>
                </div>
            </div>
        );
    }

}
