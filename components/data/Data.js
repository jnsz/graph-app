import DataInput from './DataInput';
import DataTable from './DataTable';

export default class Data extends React.Component{
  render() {
    return (
      <div>
        <DataInput
          onRawDatasetChanged={this.props.onRawDatasetChanged}
          onDatasetChanged={this.props.onDatasetChanged}
          rawDataset={this.props.rawDataset}
          dataset={this.props.dataset}
        />

        {this.props.dataset.columns == null ? false : <DataTable dataset={this.props.dataset} />}

      </div>
    );
  }
}
