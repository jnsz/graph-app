import DataInput from './DataInput';
import DataTable from './DataTable';
import example_data from '../example_data/example_data.json';

export default class Data extends React.Component{

  handleButtonPress(){
    this.props.onRawDatasetChanged(example_data.cars);
  }

  render() {

    return (
      <div className="container">
        <h3>
          DATA
          <button className='btn btn-link' onClick={e => this.handleButtonPress()}><i className="fa fa-align-left"/></button>
        </h3>


        <DataInput onDatasetChanged={this.props.onDatasetChanged} onRawDatasetChanged={this.props.onRawDatasetChanged} rawDataset={this.props.rawDataset} />
        <DataTable dataset={this.props.dataset}/>
      </div>
    );
  }
}
