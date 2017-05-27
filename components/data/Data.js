import React, { Component } from 'react';

import DataInput from './DataInput';
import DataTable from './DataTable';

/**
 * Renders data input area and data table area (if dataset is not empty)
 */
export default class Data extends Component{
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
