import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import BarChart from '../graphs/BarChart';
import PieChart from '../graphs/PieChart';
import LineChart from '../graphs/LineChart';
import ScatterPlot from '../graphs/ScatterPlot';
import GraphCustomization from './graph-customization/GraphCustomization';

export default class GraphSVG extends React.Component{

  constructor(){
    super();
    this.updateSVG = this.updateSVG.bind(this);
  }

  render() {
    return (
      <div>
        <div id='graph-SVG' style={{justifyContent: 'center'}}>
          { this.generateSVG() }
    		</div>

      <GraphCustomization
        selectedGraph={this.props.selectedGraph}
        svgSize={this.props.svgSize}
        onSvgSizeChange={this.props.onSvgSizeChange}
        updateSVG={this.updateSVG}
      />
      </div>
    );
  }

  updateSVG(){
    this.forceUpdate();
  }

  generateSVG(){
    const { svgSize, graphSettings, dataset, selectedGraph } = this.props;
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

    switch(selectedGraph){
      case 'BarChart':
        BarChart.checkAndDrawChart(canvas, svgSize, dataset);
        break;
      case 'PieChart':
        PieChart.checkAndDrawChart(canvas, svgSize, dataset);
        break;
      case 'LineChart':
        LineChart.checkAndDrawChart(canvas, svgSize, dataset);
        break;
      case 'ScatterPlot':
        ScatterPlot.checkAndDrawChart(canvas, svgSize, dataset);
        break;
    }


    return node.toReact();
  }
}
