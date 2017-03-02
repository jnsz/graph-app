export default class DimensionsList extends React.Component{

  renderDimensions(){
    console.log(this.props.dataset);
    if( typeof this.props.dataset.columns !== 'undefined') {
      console.log(this.props.dataset.columns);

      // tohle funguje, pokud je array neprázdný, tak to vykreslí "TEST" ja má
      return <li> TEST </li>

      /* tenhle kód nefunguje a hází to warning, že tam chybí ten key elementy, přesněji to hází tohle:
        "Warning: Each child in an array or iterator should have a unique "key" prop.
        Check the render method of `BtnGroup`. See https://fb.me/react-warning-keys for more information."
      */
      // this.props.dataset.columns.map(column => {
      //   return (
      //     <li>
      //       {column}
      //       <span className="dimension-icon pull-right"><i className="fa fa-bars"></i></span>
      //     </li>
      //   )
      // })
    }
  }

  render() {
    return (
        <div className="col-md-3">
            <ul>
              { this.renderDimensions() }
            </ul>
        </div>
    );
  }

}
