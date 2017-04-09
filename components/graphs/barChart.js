import * as d3 from 'd3';
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CustButtonGroup from '../graph/graph-customization/CustButtonGroup';
import CustColorPicker from '../graph/graph-customization/CustColorPicker';
import CustDropdown from '../graph/graph-customization/CustDropdown';
import CustFormGroup from '../graph/graph-customization/CustFormGroup';
import CustSlider from '../graph/graph-customization/CustSlider';

export default class BarChart extends React.Component{


  render(){
		const settings = BarChart.settings;

    return(
      <div>
      <Col md={6}>
        <div className='cust'>
          <CustButtonGroup
						label='Graph type'
            buttons={[
              [{label:'Vertical', active:settings.isVertical, onClick: () => {this.setSettings({isVertical:true})} },
              {label:'Horizontal', active:!settings.isVertical, onClick: () => {this.setSettings({isVertical:false})} }],
            ]}
          />
          <CustButtonGroup
            buttons={[
              [{label:'Grouped', active:settings.isGrouped, onClick: () => {this.setSettings({isGrouped:true})} },
              {label:'Stacked', active:!settings.isGrouped, onClick: () => {this.setSettings({isGrouped:false})} }],
            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div className='cust'>
          <CustFormGroup
  					label='Graph Label'
  					items={[
  						{type : 'btn',
               label: <FontAwesome name='bold'/>,
               active: settings.chartLabel.isBold,
               onChange: () => {this.setSettings({chartLabel:{...settings.chartLabel, isBold:!settings.chartLabel.isBold}})}
              },
              {type : 'input',
               text : 'Graph label',
               value : settings.chartLabel.value,
               onChange: value => {this.setSettings({chartLabel:{...settings.chartLabel, value:value}})}
             },
              {type: 'align',
               value: settings.chartLabel.align,
               onChange: value => {this.setSettings({chartLabel:{...settings.chartLabel, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{type: 'dropdown',
							tamplate: 'fontFamily',
							active:settings.fontFamily,
							onClick: value => {this.setSettings({fontFamily:value})} },],

              [{type: 'dropdown',
							tamplate: 'fontSize',
							active:settings.fontSize,
							onClick: value => {this.setSettings({fontSize:value})} },],
            ]}
          />

        </div>
      </Col>

      <Col md={6}>
        <div className='cust'>
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
							[{icon: (settings.legend?<FontAwesome name='eye-slash'/>:<FontAwesome name='eye'/>),
							label: 'Legend',
							active:settings.yAxis.legend,
							onClick: () => {this.setSettings({legend:!settings.legend})} }],

							[{type: 'dropdown',
							tamplate: 'barPadding',
							active:settings.barPadding,
							onClick: value => {this.setSettings({barPadding:value})} },],

            ]}
          />
        </div>
      </Col>

      <Col md={6}>
        <div className='cust'>
          <CustFormGroup
  					label='X Axis'
  					items={[
              {type : 'input',
               text : 'X Axis Label',
               value : settings.xAxis.value,
               onChange: value => {this.setSettings({xAxis:{...settings.xAxis, value:value}})}
             },
              {type: 'align',
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
        </div>
      </Col>

      <Col md={6}>
        <div className='cust'>
          <CustFormGroup
  					label='Y Axis'
  					items={[
              {type : 'input',
               text : 'Graph label',
               value : settings.yAxis.value,
               onChange: value => {this.setSettings({yAxis:{...settings.yAxis, value:value}})}
             },
              {type: 'align',
               value: settings.yAxis.align,
               onChange: value => {this.setSettings({yAxis:{...settings.yAxis, align:value}})}
              }
  					]}
  				/>
          <CustButtonGroup
            buttons={[
              [{icon: (settings.yAxis.guidelines?<FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>),
							label: 'Guides',
							active:settings.yAxis.guidelines,
							onClick: () => {this.setSettings({yAxis:{...settings.yAxis, guidelines:!settings.yAxis.guidelines}})} },],
              [{label:'Left',
							active:settings.yAxis.position === 'left',
							onClick: () => {this.setSettings({yAxis:{...settings.yAxis, position:'left'}})} },
              {label:'Right',
							active:settings.yAxis.position === 'right',
							onClick: () => {this.setSettings({yAxis:{...settings.yAxis, position:'right'}})} },],
            ]}
          />
        </div>
      </Col>

      {/*<Col md={6}>
        <div className='cust'>
          <CustSlider
            label='Bar padding'
            min={0}
            max={1}
            step={0.01}
            value={BarChart.settings.barPadding}
            displayedValue={d3.format('.0%')(BarChart.settings.barPadding)}
            onChange= {value => {this.setSettings({barPadding:value})}}
          />
        </div>
      </Col>*/}
      </div>

    )
  }
  static graphName = 'BarChart';
  static variables = [
    {
        label: 'Bars',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    },
    {
        label: 'Label',
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
		legend:true,

		// block 4
    xAxis:{
			value: 'X Axis',
			align:'middle',
	    rotation:0,
		},

		// block 5
		yAxis:{
			value:'Y Axis',
			align:'middle',
			guidelines:false,
			position:'left',
		},
  }
	setSettings(newSettings){
		BarChart.settings = {...BarChart.settings, ...newSettings};
		console.log(BarChart.settings);
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
    const dataset = wholeDataset.map(function(d, i) {
      const row = barDimensions.map(function(dimension, index) {
        return d[dimension]
      })
      return row;
    })

    // MAX VALUE OF ALL BAR DIMENSIONS
    const domainMax = d3.max(wholeDataset, function(d){return d3.max(barDimensions, function(barDimension) {return d[barDimension];})});

    // Y AXIS
    const y = d3.scaleLinear()
                .range([height,0])
                .domain([0, domainMax]);

    const yAxis = settings.yAxis.position === 'left' ? d3.axisLeft(y): d3.axisRight(y);
    yAxis.tickSizeOuter(0);

    const yAxisGroup = canvas.append('g')
                            .attr('class', 'y axis')
														.attr('transform', `translate(${settings.yAxis.position === 'left' ? 0:width},0)`)

    yAxisGroup.append('g').call(yAxis);

		canvas.select('.y.axis').selectAll('g.tick').selectAll('text').each(function() {
			d3.select(this).attr('font-family', settings.fontFamily)
		});

		let labelPos;
		switch (settings.yAxis.align) {
			case 'start': labelPos = height; break;
			case 'middle': labelPos = height/2; break;
			case 'end': labelPos = 0; break;
		}

    yAxisGroup.append('text')
              .attr('transform', `translate(${settings.yAxis.position === 'left' ? -25:25},${labelPos}) rotate(-90)`)
              .attr('text-anchor', settings.yAxis.align)
              .attr('dominant-baseline', `${settings.yAxis.position === 'left' ? 'text-after-edge':'text-before-edge'}`)
							.attr('font-family', settings.fontFamily)
							.attr('font-size', settings.fontSize)
              .text(settings.yAxis.value);

    // GUIDELINES
		if(settings.yAxis.guidelines){
			const guidelines = d3.axisRight(y)
	        .tickSizeInner(width)
	        .tickSizeOuter(0)
	        .tickFormat('');

			canvas.append('g')
					.attr('class', 'guidelines')
					.call(guidelines);

			canvas.select('.guidelines').selectAll('.tick').selectAll('line').attr('stroke','#999');
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
			.attr('class', 'x axis')
			.attr('transform', `translate(0,${height})`);

		xAxisGroup.append('g').call(xAxis);

		//let labelPos;
		switch (settings.xAxis.align) {
			case 'start': labelPos = 0; break;
			case 'middle': labelPos = width/2; break;
			case 'end': labelPos = width; break;
		}

		xAxisGroup.append('text')
							.attr('transform', `translate(${labelPos},25)`)
							.attr('text-anchor', settings.xAxis.align)
							.attr('dominant-baseline', 'text-before-edge')
							.attr('font-family', settings.fontFamily)
							.attr('font-size', settings.fontSize)
							.text(settings.xAxis.value);

		// DRAW TICKS ON X AXIS
		if(hasLabelDimension){
			const tickNames = wholeDataset.map(function(d){return d[labelDimension];});

			let pos;
			switch(settings.xAxis.rotation){
				case 0: pos = {x:0,y:0};break;
				case 45: pos = {x:-9,y:4};break;
				case 90: pos = {x:-13,y:10};break;
			}

			canvas.select('.x.axis').selectAll('g.tick').selectAll('text').each(function(d) {
				d3.select(this)
					.attr('text-anchor', 'end')
					.attr('text-anchor', settings.xAxis.rotation===0 ? 'middle':'end')
					.attr('transform', `translate(${pos.x},${pos.y}) rotate(-${settings.xAxis.rotation})`)
					.attr('font-family', settings.fontFamily)
					.text(tickNames[d])
			});
		} else {
			canvas.select('.x.axis').selectAll('g.tick').remove();
		}

    // COLOR
    const colorGenerator = d3.scaleOrdinal().range(settings.color);

    // CREATE BARS
    const outerBand = canvas.append('g')
                            .attr('class', 'bars')
                            .selectAll('.outerBand')
                            .data(dataset)
                            .enter()
                            .append('g')
                            .attr('class', 'outerBand')
                            .attr('transform', function(d, i) {
                                return `translate(${x0(i)},0)`;
                            });

    const innerBand = outerBand.selectAll('g')
        .data(function(d, i) {
          return d;
        })
        .enter()
        .append('g')
        .attr('class', 'innerBand')
        .attr('transform', function(d, i) {
          return `translate(${x1(i)},0)`;
        });

    innerBand.append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) {
          return y(d);
        })
        .attr('width', x1.bandwidth())
        .attr('height', function(d) {
            return height - y(d);
        })
        .style('fill', function(d, i) {
            return colorGenerator(i);
        });


    // CHART LABEL
		this.drawChartLabel(canvas, width);
  }

	static drawChartLabel(canvas, width){
		const settings = BarChart.settings;
		let x = 0;
		switch(settings.chartLabel.align){
			case 'start':
				x = 0;
				break;
			case 'middle':
				x = width/2;
				break;
			case 'end':
				x = width;
				break;
		}
		canvas.append('text')
					.attr('x', x)
					.attr('y', -10)
					.attr('text-anchor', settings.chartLabel.align)
					.attr('dominant-baseline', 'text-after-edge')
					.attr('font-family', settings.fontFamily)
					.attr('font-size', settings.fontSize)
					.attr('font-weight', settings.chartLabel.isBold ? 'bold':'normal')
					.text(settings.chartLabel.value);
	}
}
