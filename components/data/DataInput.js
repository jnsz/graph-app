import * as d3 from 'd3';
import { Button, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import exampleData from '../exampleData/exampleData.js';
import TutorialPopover from '../TutorialPopover';

export default class DataInput extends React.Component{

  render() {
    const tutorialTxt =(
      <span>
        Paste your data in <code>.csv</code> format.<br />
        App will automatically parse this data and determine if column consist of numeric values.<br />
        If not, app will presume values are strings.<br />
        App <strong>cannot</strong> parse date values.
      </span>)

    return (
      <div>
        <Row>
          <h1>
            Data input <small><TutorialPopover tooltipText={tutorialTxt} /></small>
            <span><Button bsStyle='link pull-right' onClick={e => this.handleChange(exampleData.cars)}><FontAwesome name='clipboard'/> Paste example data</Button></span>
          </h1>

          <div>
            <div className='form-group box'>
              <textarea className='form-control' style={{resize:'vertical'}} rows='10' placeholder='Paste your CSV here...' value={this.props.rawDataset} onChange={e => {this.handleChange(e.target.value)}}></textarea>
            </div>
          </div>
        </Row>
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
}
