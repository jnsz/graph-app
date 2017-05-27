import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import TutorialPopover from '../TutorialPopover';
import BarChart from '../graphs/BarChart';
import PieChart from '../graphs/PieChart';
import LineChart from '../graphs/LineChart';
import ScatterPlot from '../graphs/ScatterPlot';
import GraphCustomization from './graph-customization/GraphCustomization';

export default class GraphSVG extends Component {

  constructor(){
    super();
    this.updateSVG = this.updateSVG.bind(this);
  }

  render() {
    const tutorialTxtGraph =(
      <span >
        This is the <code>.svg</code> of your graph.<br />
        You can customize some aspects of the look.
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
        <h1>
          Graph <small><TutorialPopover tooltipText={tutorialTxtGraph} /></small>
        </h1>
        <Row id='svg-parent'>
          <Col md={8} id='svg'>
            <div style={{margin:'0px 0px 30px 0px'}}>
              {this.generateSVG()}
            </div>
          </Col>
          <Col md={4} id='sidebar'>
            <GraphCustomization
              selectedGraph={this.props.selectedGraph}
              svgSize={this.props.svgSize}
              onSvgSizeChange={this.props.onSvgSizeChange}
              updateSVG={this.updateSVG}
            />
          </Col>
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
      .style('backgroundColor','white');

    let canvas = svg.append('g')
        .attr('id', 'canvas')
        .attr('transform', 'translate(' + widthMargin/2 + ',' + heightMargin/2 + ')');

    switch(selectedGraph){
      case 'BarChart':
        BarChart.drawEmptyAndCheck(canvas, svgSize, dataset);
        break;
      case 'PieChart':
        PieChart.drawEmptyAndCheck(canvas, svgSize, dataset);
        break;
      case 'LineChart':
        LineChart.drawEmptyAndCheck(canvas, svgSize, dataset);
        break;
      case 'ScatterPlot':
        ScatterPlot.drawEmptyAndCheck(canvas, svgSize, dataset);
        break;
    }

    return node.toReact();
  }
}
