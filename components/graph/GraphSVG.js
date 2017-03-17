import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import BarChart from '../graphs/BarChart';

export default class GraphSVG extends React.Component{

  render() {
    return (
      <div>
        <div id='graph-SVG' style={{justifyContent: 'center'}}>
          { this.generateSVG() }
    		</div>
      </div>
    );
  }

  generateSVG(){
    const { svgSize, graphSettings, dataset } = this.props;
    const margin = svgSize.margin;
    const widthMargin = svgSize.width * margin;
    const heightMargin = svgSize.height * margin;
    const canvasWidth = svgSize.width - widthMargin;
    const canvasHeight = svgSize.height - heightMargin;



    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
        .attr('width', svgSize.width)
        .attr('height', svgSize.height)
        .style('display', 'block')
        .style('margin', 'auto');

    let canvas = svg.append('g')
        .attr('id', 'canvas')
        .attr('transform', 'translate(' + widthMargin/2 + ',' + heightMargin/2 + ')');

    BarChart.checkAndDrawChart(canvas, svgSize, dataset);

    return node.toReact();
  }
}
