import * as d3_core from 'd3';
const d3 = {...d3_core};
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class ChartModel {

	static drawChartLabel(canvas, settings,  width){
		let x = function() {
      switch(settings.chartLabel.align){
  			case 'start': return 0;
  			case 'middle':return width/2;
  			case 'end': return width;
  		}
    }()

		canvas.append('text')
			.attr('x', x)
			.attr('y', -20)
			.attr('text-anchor', settings.chartLabel.align)
			.attr('dominant-baseline', 'text-after-edge')
			.attr('font-family', settings.fontFamily)
			.attr('font-size', settings.fontSize)
			.attr('font-weight', settings.chartLabel.isBold ? 'bold':'normal')
			.text(settings.chartLabel.value);
	}

  static drawLegend(canvas, settings, width, dimensions, colorGenerator){
    const legend = canvas.append('g')
      .classed('legend', true)
      .attr('transform', `translate(${width},0)`)
      .selectAll('.row')
      .data(dimensions)
      .enter()
      .append('g')
      .classed('row', true)
      .attr('transform', (d,i) => { return `translate(0,${i*20})`});

    legend.append('rect')
      .attr('width', 19)
      .attr('height', 19)
      .style('fill', (d, i) => {return colorGenerator(i)});

    legend.append('text')
      .attr('x',24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
			.style('font-family', settings.fontFamily)
      .text(d => {return d});
  }
}
