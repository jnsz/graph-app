import * as RB from 'react-bootstrap';
import * as d3 from 'd3';
import FileSaver from 'file-saver';

export default class GraphExport extends React.Component{

  render() {
    return (
      <div  style={{backgroundColor: '#f8f8f8'}}>
        <div className='container'>
          <div className='wrapper'>
            <RB.Button
              bsStyle='success'
              block
              onClick={e => this.saveSVG()}
            >
              Export graph as SVG
            </RB.Button>
          </div>
        </div>
      </div>
    );
  }

  saveSVG(){
    var html = d3.select('svg')
        .attr('title', 'test')
        .attr('version', 1.1)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .node().parentNode.innerHTML;

    var blob = new Blob([html], {
        type: 'image/svg+xml'
    });
    FileSaver.saveAs(blob, 'graph.svg')
  }
}
