import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import Mapping from './graph-mapping/Mapping';
import GraphSVG from './GraphSVG';
import GraphCustomization from './graph-customization/GraphCustomization';
import TutorialPopover from '../TutorialPopover';

/**
 * Reders mapping, graph and graph customization
 */
export default class Graph extends Component{

  render() {
    return (
      <div>
          <div>
            {this.renderMapping()}
          </div>
        {this.renderGraph()}
      </div>
    );
  }

  renderMapping() {
    const tutorialTxt =(
      <span style={{lineHeight:'2.5'}}>
        Drag <span style={{color: 'white',backgroundColor: '#337ab7',padding: '6px 12px',}}>dimensions</span> onto <span style={{border: '1px dashed', padding:'6px 12px'}}>drop areas.</span> <br/>
        Drag <span style={{padding: '6px 12px',color: 'white',backgroundColor: '#39D831'}}>variables</span> around to reorder them.
      </span>
    )

    return(
      <Row>
        <h1>
          Mapping <small><TutorialPopover tooltipText={tutorialTxt} /></small>
        </h1>

        <Mapping
          dataset={this.props.dataset}
          graphVariables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
      </Row>
    )
  }

  renderGraph() {
    return(
      <div>
        <GraphSVG
          svgSize={this.props.svgSize}
          graphSettings={this.props.graphSettings}
          dataset={this.props.dataset}

          selectedGraph={this.props.selectedGraph}
          onSvgSizeChange={this.props.onSvgSizeChange}
        />
      </div>
    )
  }
}
