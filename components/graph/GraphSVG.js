import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom'

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
    const { svgSize, graphSettings } = this.props;
    const margin = svgSize.margin;
    const widthMargin = svgSize.width * margin;
    const heightMargin = svgSize.height * margin;
    const canvasWidth = svgSize.width - widthMargin;
    const canvasHeight = svgSize.height - heightMargin;

    // ReactFauxDOM (https://github.com/Olical/react-faux-dom)
    // tahle knihovna slouzi na propojeni D3 a Reactu, react-d3 apod. knihovny jsou deprecated nebo nejsou cele apod., tohle je z toho co jsem nasel nejlepsi reseni
    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
        .attr('width', svgSize.width)
        .attr('height', svgSize.height)
        .style('display', 'block')
        .style('margin', 'auto');

    svg.append('g')
        .attr('id', 'canvas')
        .attr('transform', 'translate(' + widthMargin/2 + ',' + heightMargin/2 + ')')//;
        .append('circle')
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 20);

    return node.toReact();
  }
}
