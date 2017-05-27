import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import * as d3 from 'd3';

import * as UI from './CustomizerUI';
import GraphExport from '../../GraphExport';
import ChartModel from '../../graphs/ChartModel';
import BarChart from '../../graphs/BarChart';
import PieChart from '../../graphs/PieChart';
import LineChart from '../../graphs/LineChart';
import ScatterPlot from '../../graphs/ScatterPlot';

/**
 * Renders graph customazion and export components.
 */
export default class GraphCustomization extends Component {

	render() {
		return (
      <div>
				{ this.renderGraphCustomization() }
				<GraphExport/>
	    </div>
		);
	}

	renderGraphCustomization(){
		const components = {
			BarChart: BarChart,
			PieChart: PieChart,
			LineChart: LineChart,
			ScatterPlot: ScatterPlot,
		}
		const SelectedGraph = components[this.props.selectedGraph];

		return <SelectedGraph updateSVG={this.props.updateSVG} svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>;
	}
}
