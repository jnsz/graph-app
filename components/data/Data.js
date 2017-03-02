import DataInput from './DataInput';
import DataTable from './DataTable';

export default class Data extends React.Component{

  render() {
    return (
        <div className="container">
                <DataInput onDatasetChanged={this.props.onDatasetChanged}/>
                {/*<DataTable dataset={this.props.dataset}/>*/}
        </div>
    );
  }
}
