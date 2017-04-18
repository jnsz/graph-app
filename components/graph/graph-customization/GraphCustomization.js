import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import * as UI from './CustomizerUI';
import ChartModel from '../../graphs/ChartModel';
import BarChart from '../../graphs/BarChart';
import PieChart from '../../graphs/PieChart';
import LineChart from '../../graphs/LineChart';
import ScatterPlot from '../../graphs/ScatterPlot';

export default class GraphCustomization extends React.Component {

	constructor(){
		super();
		this.onChangeWidth = this.onChangeWidth.bind(this);
		this.onChangeHeight = this.onChangeHeight.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
	}

	render() {
		return (
      <div>
				{ this.renderSizeCustomization() }
				{ this.renderGraphCustomization() }
	    </div>
		);
	}

	renderSizeCustomization() {
		const width = this.props.svgSize.width;
		const height = this.props.svgSize.height;
		const margin = this.props.svgSize.margin;
		return (
			<UI.Wrapper>
				<UI.Form label='Width x height'>
					<UI.FInput
						text='Width'
						value={width}
						onChange={this.onChangeWidth}
					/>
					<UI.FAddon><FontAwesome name='times'/></UI.FAddon>
					<UI.FInput
						text='Height'
						value={height}
						onChange={this.onChangeHeight}
					/>
				</UI.Form>
				<UI.Slider
					label='Margins'
					min={0}
					max={1}
					step={0.01}
					value={margin}
					displayedValue={d3.format('.0%')(margin)}
					onChange={this.onChangeMargin}
				/>
			</UI.Wrapper>
		)
	}

	renderGraphCustomization(){
		const components = {
			BarChart: BarChart,
			PieChart: PieChart,
			LineChart: LineChart,
			ScatterPlot: ScatterPlot,
		}
		const SelectedGraph = components[this.props.selectedGraph];

		return <SelectedGraph updateSVG={this.props.updateSVG} />;
	}

	onChangeWidth(newWidth) {
		const newSize = {width: newWidth};
		this.props.onSvgSizeChange(newSize);
	}
	onChangeHeight(newHeight) {
		const newSize = {height: newHeight};
		this.props.onSvgSizeChange(newSize);
	}
	onChangeMargin(newMargin) {
		const newSize = {margin: newMargin}
		this.props.onSvgSizeChange(newSize);
	}
}
