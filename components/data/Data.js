import * as d3 from 'd3';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import DataTable from './DataTable';
import exampleData from '../exampleData/exampleData.js';

export default class Data extends React.Component{

  constructor() {
    super();
    this.state = {
      showTxtArea: true,
      showTable: false
    };

  }


  render() {
    return (
      <div className='container'>
        <h2>Data parsing</h2>

        <Button bsStyle='link' onClick={e => this.handleChange(exampleData.cars)}><FontAwesome name='clipboard'/> Paste example data</Button>

        {typeof this.props.dataset.columns === 'undefined' ? false :
        <div className='pull-right'>
          change view >>
          <Button bsStyle='link' onClick={e => this.changeView('txt')}><FontAwesome name='align-left'/></Button>
          <Button bsStyle='link' onClick={e => this.changeView('table')}><FontAwesome name='table'/></Button>
        </div>
        }

        <div  className='wrapper' style={{display: this.state.showTxtArea ? 'block' : 'none' }}>
          <div className='form-group'>
            <textarea className='form-control' style={{resize:'vertical'}} rows='8' placeholder='Paste your CSV here...' value={this.props.rawDataset} onChange={e => {this.handleChange(e.target.value)}}></textarea>
          </div>
        </div>

        {this.state.showTable ? <DataTable dataset={this.props.dataset} /> : false}
      </div>
    );
  }


  handleChange(rawDataset) {

    // if text area is empty
    if(typeof rawDataset === 'undefined'){
      rawDataset = '';
    }

    // set rawDataset into state
    this.props.onRawDatasetChanged(rawDataset);

    // parse CSV into array of objects
    const dataset = d3.csvParse(rawDataset);


    // parse numeric columns into numbers
    dataset.isNumeric = {};
    if(dataset.length > 0) {
      for(const column of dataset.columns){
        let isNumericValue = false;
        for(const row of dataset){
          if(isNaN(row[column])) {
            isNumericValue = false;
            break;
          } else {
            isNumericValue = true;
          }
        }

        dataset.isNumeric[column] = isNumericValue;
        if(isNumericValue){
          for(const row of dataset){
            row[column] = +row[column];
          }
        }
      }
    }

    // set parsed dataset into state
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
}
