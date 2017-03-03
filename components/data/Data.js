import DataTable from './DataTable';
import example_data from '../example_data/example_data.json';
import * as d3 from 'd3';

export default class Data extends React.Component{

  constructor() {
    super();
    this.state = {
      showTxtArea: true,
      showTable: false
    };

  }


  handleChange(rawDataset) {
    if(typeof rawDataset === 'undefined'){
      rawDataset = '';
    }
    const dataset = d3.csvParse(rawDataset); // parse CSV as array of objects
    this.props.onRawDatasetChanged(rawDataset);
    this.props.onDatasetChanged(dataset); // change dataset in state
  }

  changeView(view) {
    switch (view) {
      case 'txt':
        this.setState({
          showTxtArea: true,
          showTable: false
        })
        break;
      case 'table':
      this.setState({
        showTxtArea: false,
        showTable: true
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>
          DATA
          <button className='btn btn-link' onClick={e => this.handleChange(example_data.cars)}><i className="fa fa-clipboard"/></button>
          <div className='pull-right'>
            <button className='btn btn-link' onClick={e => this.changeView('txt')}><i className="fa fa-align-left"/></button>
            <button className='btn btn-link' onClick={e => this.changeView('table')}><i className="fa fa-table"/></button>
          </div>

        </h3>


        <div  className="wrapper" style={{display: this.state.showTxtArea ? 'block' : 'none' }}>
          <div className="form-group">
            <textarea className="form-control" rows="8" placeholder="Paste your CSV here..." value={this.props.rawDataset} onChange={e => {this.handleChange(e.target.value)}}></textarea>
          </div>
        </div>

        {this.state.showTable ? <DataTable dataset={this.props.dataset} /> : false}
      </div>
    );
  }
}
