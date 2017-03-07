/*
TODO predelat tabulku na react-table
TODO umoznit sorting
TODO fixed width, max height, scrollbary
TODO umoznit prepisovat hodnoty
*/

export default class DataInput extends React.Component{

  hasData(data) {
    return typeof data.columns !== 'undefined';
  }

  renderHead(columns) {
    if( typeof columns !== 'undefined') {
      return (
        <thead>
          <tr>
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
              {data.columns.map((column, i) => {
                return <td key={i+'td'}>{row[column]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

  render() {
    const data = this.props.dataset;
    const hasData = this.hasData(data);
    return (
      <div className='wrapper'>
        <table className='table'>

          { hasData ? this.renderHead(data.columns) : false }
          { hasData ? this.renderBody(data) : false }

        </table>
      </div>
     )

  }
}
