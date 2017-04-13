import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import FontAwesome from 'react-fontawesome';
import { Row } from 'react-bootstrap';

import TutorialPopover from '../TutorialPopover';
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
    const tutorialTxtGraph =(
      <span >
        This is the <code>.svg</code> of graph.<br />
        You can customize look down bellow <FontAwesome name='arrow-down'/> <br />
        Even if some text is clipping out of the canvas, it will be in exported <code>.svg</code> <br />
        If some elements overlap or you want to make further changes you can open exported <code>.svg</code> in vector graphics editor of your choice and edit.
      </span>
    )
    const tutorialTxtCust =(
      <span>
        Clicks and clacks to customize your graphs.
      </span>
    )

    return (
      <div>
        <Row>
          <h1>
            Graph <small><TutorialPopover tooltipText={tutorialTxtGraph} /></small>
          </h1>
          <div style={{justifyContent: 'center', margin:'20px 0px 30px 0px'}}>
            {this.generateSVG()}
      		</div>
        </Row>

        <Row>
          <h1>
            Customization <small><TutorialPopover tooltipText={tutorialTxtCust} /></small>
          </h1>
          <GraphCustomization
            selectedGraph={this.props.selectedGraph}
            svgSize={this.props.svgSize}
            onSvgSizeChange={this.props.onSvgSizeChange}
            updateSVG={this.updateSVG}
        />
        </Row>
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
      .attr('class', 'box')
      .attr('width', svgSize.width)
      .attr('height', svgSize.height)
      .style('backgroundColor','white')
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
