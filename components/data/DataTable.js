import { Row } from 'react-bootstrap';
import TutorialPopover from '../TutorialPopover';

export default class DataInput extends React.Component{

  render() {
    const tutorialTxt =(
      <span>
        This area displays data in table.<br />
        You <strong>can</strong> review your data here.<br />
        You <strong>cannot</strong> edit or reorder data.
      </span>)

    const { dataset } = this.props;

    return (
      <Row>
      <h1>Data table <small><TutorialPopover tooltipText={tutorialTxt} /></small> </h1>

        <table className='table table-hover box'>
          {this.renderHead(dataset.columns)}
          {this.renderBody(dataset)}
        </table>
      </Row>
     )
  }

  renderHead(columns) {
    if( typeof columns !== 'undefined') {
      return (
        <thead>
          <tr>
            <th></th>
            {columns.map((column, i) => {
              return (
                <th key={i+'th'}>
                  {column}
                </th>
              )
            })}
          </tr>
        </thead>
      )
    }
  }

  renderBody(data) {
    return (
      <tbody>
        {data.map((row, i) => {
          return (
            <tr key={i+'tr'}>
              <td><strong>{i}</strong></td>
              {data.columns.map((column, i) => {
                return <td key={i+'td'}>{row[column]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }


}
