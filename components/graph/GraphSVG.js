import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom'

export default class GraphSVG extends React.Component{

  generateSVG(){
    const svgSize = this.props.svgSize;
    const margins = svgSize.margins;

    const canvasWidth = svgSize.width - margins.left - margins.right;
    const canvasHeight = svgSize.height - margins.top - margins.bottom;

    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
        .attr('width', svgSize.width)
        .attr('height', svgSize.height)
        .style('display', 'block')
        .style('margin', 'auto');


    svg.append('g')
        .attr('id', 'canvas')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    return node.toReact();
  }

  // onChangeWidth(newWidth) {
  //   this.props.onSvgSizeChange(
  //     {
  //       width: newWidth
  //     }
  //   )
  // }

  render() {
    return (
      <div>
        <div id='graph-SVG' style={{justifyContent: 'center'}}>
          {/*<input value={this.props.svgSize.width} onChange={e => {this.onChangeWidth(e.target.value)}} type='text' placeholder='Your name...' />*/}
          { this.generateSVG() }
    		</div>
      </div>
    );
  }

}
