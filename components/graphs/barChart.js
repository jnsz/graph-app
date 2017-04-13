import * as d3_core from 'd3';
const d3 = {...d3_core};
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';
import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class BarChart extends React.Component{


  render(){
		const settings = BarChart.settings;

    return(
      <div>
        <UI.Wrapper>
          <CustButtonGroup
						label='Graph type'
            buttons={[
              [{label:'Vertical', active:settings.isVertical, onClick: () => {alert('Not yet implemented');this.setSettings({isVertical:true})} },
              {label:'Horizontal', active:!settings.isVertical, onClick: () => {alert('Not yet implemented');this.setSettings({isVertical:false})} }],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Grouped', active:settings.isGrouped, onClick: () => {alert('Not yet implemented');this.setSettings({isGrouped:true})} },
              {label:'Stacked', active:!settings.isGrouped, onClick: () => {alert('Not yet implemented');this.setSettings({isGrouped:false})} }],
            ]}
          />
        </UI.Wrapper>

        <UI.LabelChart
          settings={settings}
          onChange={newSettings => {this.setSettings(newSettings)}}
        />

        <UI.Wrapper>
          <CustButtonGroup
						label='General'
            buttons={[
              [{type:'dropdown',
							tamplate:'color',
							active:settings.color,
							onClick: value => {this.setSettings({color:value})} },],

							[{type: 'dropdown',
							tamplate: 'barLabelPos',
							active:settings.barLabelPos,
							onClick: value => {this.setSettings({barLabelPos:value})} },],
            ]}
          />
          <CustButtonGroup
            buttons={[
							[{icon: (settings.legend?<FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>),
							label: 'Legend',
							active:settings.legend,
							onClick: () => {this.setSettings({legend:!settings.legend})} }],

							[{type: 'dropdown',
							tamplate: 'barPadding',
							active:settings.barPadding,
							onClick: value => {this.setSettings({barPadding:value})} },],

            ]}
          />
        </UI.Wrapper>

        <UI.Wrapper>
          <CustFormGroup
  					label='X Axis'
  					items={[
              {
                type : 'btn',
                label: settings.xAxis.visible ? <FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>,
                active: settings.xAxis.visible,
                onChange: () => {this.setSettings({xAxis:{...settings.xAxis, visible:!settings.xAxis.visible}})}
              },
              {
                type : 'input',
                text : 'X Axis Label',
                value : settings.xAxis.value,
                onChange: value => {this.setSettings({xAxis:{...settings.xAxis, value:value}})}
              },
              {
                type: 'align',
                value: settings.xAxis.align,
                onChange: value => {this.setSettings({xAxis:{...settings.xAxis, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{label:'0°', active:(settings.xAxis.rotation === 0), onClick: () => {this.setSettings({xAxis:{...settings.xAxis, rotation:0}})} },
              {label:'45°', active:(settings.xAxis.rotation === 45), onClick: () => {this.setSettings({xAxis:{...settings.xAxis, rotation:45}})} },
              {label:'90°', active:(settings.xAxis.rotation === 90), onClick: () => {this.setSettings({xAxis:{...settings.xAxis, rotation:90}})} },],
            ]}
          />
        </UI.Wrapper>

        <UI.Wrapper>
          <CustFormGroup
  					label='Y Axis'
  					items={[
              {
                type : 'btn',
                label: settings.yAxis.visible ? <FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>,
                active: settings.yAxis.visible,
                onChange: () => {this.setSettings({yAxis:{...settings.yAxis, visible:!settings.yAxis.visible}})}
              },
              {
                type : 'input',
                text : 'Graph label',
                value : settings.yAxis.value,
                onChange: value => {this.setSettings({yAxis:{...settings.yAxis, value:value}})}
              },
              {
                type: 'align',
                value: settings.yAxis.align,
                onChange: value => {this.setSettings({yAxis:{...settings.yAxis, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [
                {
                  icon: (settings.yAxis.guidelines?<FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>),
  							  label: 'Guides',
  							  active:settings.yAxis.guidelines,
  							  onClick: () => {this.setSettings({yAxis:{...settings.yAxis, guidelines:!settings.yAxis.guidelines}})}
                }],
              [
                {
                  label:'Left',
  							  active:settings.yAxis.position === 'left',
  							  onClick: () => {this.setSettings({yAxis:{...settings.yAxis, position:'left'}})}
                },
                {
                  label:'Right',
  							  active:settings.yAxis.position === 'right',
  							  onClick: () => {this.setSettings({yAxis:{...settings.yAxis, position:'right'}})}
                }
              ]
            ]}
          />
        </UI.Wrapper>
      </div>

    )
  }
  static graphName = 'BarChart';
  static variables = [
    {
        label: 'Bar height',
        desc: 'Determines height of individual bars',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    },
    {
        label: 'Ticks on x axis',
        desc: 'Names each bar/bar group',
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
  ];
  static settings = {
		// block 1
    isVertical:true,
    isGrouped:true,

		// block 2
    chartLabel:{
      value: 'Bar Chart',
      align: 'middle',
      isBold: true,
    },
		fontFamily:'Helvetica',
		fontSize:'14px',

		// block 3
		color: d3.schemeCategory10,
		barLabelPos:'above',
		barPadding:0.1,
		legend:false,

		// block 4
    xAxis:{
      visible:true,
			value: 'X Axis',
			align:'middle',
	    rotation:0,
		},

		// block 5
		yAxis:{
      visible:true,
			value:'Y Axis',
			align:'middle',
			guidelines:false,
			position:'left',
		},
  }
	setSettings(newSettings){
		BarChart.settings = {...BarChart.settings, ...newSettings};
		// console.log(BarChart.settings);
		this.props.updateSVG();
	}

  static checkAndDrawChart(canvas, svgSize, wholeDataset) {

    const hasLabelDimension = this.variables[1].assignedDimensions.length != 0;
    const hasBarDimension = this.variables[0].assignedDimensions.length != 0;

		const isVertical = BarChart.settings.isVertical;
		const isGrouped = BarChart.settings.isGrouped;

    const canDraw = hasBarDimension;
    if(canDraw) {
			if(isVertical && isGrouped) this.drawChartVertGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
			else this.drawChartVertGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
			// else if(!isVertical && isGrouped) this.drawChartHorizonGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
			// else if(isVertical && !isGrouped) this.drawChartVertStacked(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
			// else this.drawChartHorizonStacked(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
		}
  }

	static drawChartVertGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension){
		const settings = BarChart.settings;
		// GET CANVAS WIDTH AND HEIGHT
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    // GET LABEL DIMENSION
    const labelDimension = hasLabelDimension ? this.variables[1].assignedDimensions[0].dimension : null;

    // GET BARS DIMENSIONS
    const barDimensions = [];
    this.variables[0].assignedDimensions.map(dimension => {
      barDimensions.push(dimension.dimension);
    })

    // simplified dataset
    const dataset = wholeDataset.map((d, i) => {
      const row = barDimensions.map(dimension => {return d[dimension]})
      return row;
    })

    // MAX VALUE OF ALL BAR DIMENSIONS
    const domainMax = d3.max(wholeDataset, d => {return d3.max(barDimensions, barDimension => {return d[barDimension]})});

    // COLOR
    const colorGenerator = d3.scaleOrdinal().range(settings.color);

    // Y AXIS
    const y = d3.scaleLinear()
                .range([height,0])
                .domain([0, domainMax]);

    const yAxis = settings.yAxis.position === 'left' ? d3.axisLeft(y) : d3.axisRight(y);
    yAxis.tickSizeOuter(0);


    const yAxisGroup = canvas.append('g')
                            .classed('y axis', true)
														.attr('transform', `translate(${settings.yAxis.position === 'left' ? 0:width},0)`)

    yAxisGroup.append('g').call(yAxis);

		canvas.select('g.y.axis').selectAll('g.tick').selectAll('text').each(function() {
			d3.select(this).attr('font-family', settings.fontFamily)
		});

		let labelPos = function(){
      switch (settings.yAxis.align) {
  			case 'start': return height;
  			case 'middle': return height/2;
  			case 'end': return 0;
  		}
    }()

    yAxisGroup.append('text')
              .attr('transform', `translate(${settings.yAxis.position === 'left' ? -25:25},${labelPos}) rotate(-90)`)
              .attr('text-anchor', settings.yAxis.align)
              .attr('dominant-baseline', `${settings.yAxis.position === 'left' ? 'text-after-edge':'text-before-edge'}`)
							.attr('font-family', settings.fontFamily)
							.attr('font-size', settings.fontSize)
              .text(settings.yAxis.value);

    if(!settings.yAxis.visible){
      canvas.select('g.y.axis').selectAll('g').remove();
    }


    // GUIDELINES
		if(settings.yAxis.guidelines){
			const guidelines = d3.axisRight(y)
	        .tickSizeInner(width)
	        .tickSizeOuter(0)
	        .tickFormat('');

			canvas.append('g')
					.classed('guidelines', true)
					.call(guidelines);

			canvas.select('g.guidelines').selectAll('g.tick').selectAll('line').attr('stroke','#999');
      canvas.select('g.guidelines').select('path.domain').remove();
		}

		// X AXIS
		const x0 = d3.scaleBand()
								.range([0,width])
								.domain(d3.range(dataset.length))
								.padding(settings.barPadding);

		const x1 = d3.scaleBand()
							.domain(d3.range(barDimensions.length))
							.range([0, x0.bandwidth()])
							.padding(settings.barPadding);

		const xAxis = d3.axisBottom(x0)
										.tickSizeOuter(0);

		const xAxisGroup = canvas.append('g')
			.classed('x axis', true)
			.attr('transform', `translate(0,${height})`);

		xAxisGroup.append('g').call(xAxis);

		labelPos = function(){
      switch (settings.xAxis.align) {
        case 'start': return 0;
        case 'middle': return width/2;
        case 'end': return width;
      }
    }()

		xAxisGroup.append('text')
							.attr('transform', `translate(${labelPos},25)`)
							.attr('text-anchor', settings.xAxis.align)
							.attr('dominant-baseline', 'text-before-edge')
							.attr('font-family', settings.fontFamily)
							.attr('font-size', settings.fontSize)
							.text(settings.xAxis.value);

    if(!settings.xAxis.visible){
      canvas.select('g.x.axis').selectAll('path.domain').remove();
      canvas.select('g.x.axis').selectAll('g.tick').selectAll('line').remove();
    }

		// DRAW TICKS ON X AXIS
    if(hasLabelDimension){
			const tickNames = wholeDataset.map(d => {return d[labelDimension]});

			let pos;
			switch(settings.xAxis.rotation){
				case 0: pos = {x:0,y:0};break;
				case 45: pos = {x:-9,y:4};break;
				case 90: pos = {x:-13,y:10};break;
			}

			canvas.select('g.x.axis').selectAll('g.tick').selectAll('text').each(function (d){
				d3.select(this)
					.attr('text-anchor', 'end')
					.attr('text-anchor', settings.xAxis.rotation===0 ? 'middle':'end')
					.attr('transform', `translate(${pos.x},${pos.y}) rotate(-${settings.xAxis.rotation})`)
					.attr('font-family', settings.fontFamily)
					.text(tickNames[d])
			});
		}
    else {
			canvas.select('g.x.axis').selectAll('g.tick').remove();
		}

    // CREATE BARS
    const outerBand = canvas.append('g')
      .classed('bars', true)
      .selectAll('.outerBand')
      .data(dataset)
      .enter()
      .append('g')
      .classed('outerBand', true)
      .attr('transform', (d, i) => {return `translate(${x0(i)},0)`});

    const innerBand = outerBand.selectAll('g')
      .data(d => {return d})
      .enter()
      .append('g')
      .classed('innerBand', true)
      .attr('transform', (d, i) => {return `translate(${x1(i)},0)`});

    innerBand.append('rect')
      .classed('bar', true)
      .attr('y', d => {return y(d)})
      .attr('width', x1.bandwidth())
      .attr('height', d => {return height - y(d)})
      .style('fill', (d, i) => {return colorGenerator(i)});


    if(settings.barLabelPos !=='none'){
      innerBand.append('text')
        .attr('x', x1.bandwidth()/2)
        .attr('y', d => {
          switch(settings.barLabelPos) {
          case 'top': return 0;
          case 'above': return y(d) - 5;
          case 'bellow': return y(d) + 5;
          case 'bottom':  return height - 10;
        }})
        .attr('text-anchor','middle')
        .attr('dominant-baseline',() => {
          switch(settings.barLabelPos) {
          case 'top': return 'text-before-edge';
          case 'above': return 'text-after-edge';
          case 'bellow':  return 'text-before-edge';
          case 'buttom': return 'text-after-edge';
        }})
        .style('fill', () => {
          switch(settings.barLabelPos) {
          case 'bellow': return 'white';
          case 'bottom':  return 'white';
        }
        })
        .text(d => {return d});
    }

    // LEGEND
    if(settings.legend) ChartModel.drawLegend(canvas, width, barDimensions, colorGenerator);
    // CHART LABEL
		ChartModel.drawChartLabel(canvas, settings, width);
  }
}
