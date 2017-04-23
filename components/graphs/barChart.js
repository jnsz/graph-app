import * as d3_core from 'd3';
const d3 = {...d3_core};
import { Col, Row, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChartModel from './ChartModel';

import * as UI from '../graph/graph-customization/CustomizerUI';

const barPadding = {
  none: 0,
  small: 0.1,
  middle: 0.3,
  big: 0.5,
  extreme: 0.7
}

export default class BarChart extends React.Component {


  render(){
		const settings = BarChart.settings;

    return(
      <div>
        <UI.Size svgSize={this.props.svgSize} onSvgSizeChange={this.props.onSvgSizeChange}/>

        {/* <UI.Wrapper>
          <UI.BtnGroup label="Graph type">
            <UI.BtnGroupBtn
              label='Vertical'
              active={settings.isVertical}
              onChange={() => {this.setSettings({isVertical:true})}}
            />
            <UI.BtnGroupBtn
              label='Horizontal'
              active={!settings.isVertical}
              onChange={() => {this.setSettings({isVertical:false})}}
            />
          </UI.BtnGroup>
        </UI.Wrapper> */}

        <UI.Wrapper>
          <UI.BtnGroup label="General">

            <ButtonGroup justified style={{paddingRight:'5px'}}>
              <UI.BtnGroupDropdownColor
                active={settings.color}
                onChange={value => {this.setSettings({color:value})}}
              />
            </ButtonGroup>

            <ButtonGroup justified style={{paddingLeft:'5px'}}>
              <UI.BtnGroupBtn
                icon={settings.legend? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
                label='Legend'
                active={settings.legend}
                onChange={() => {this.setSettings({legend:!settings.legend})}}
              />
            </ButtonGroup>

          </UI.BtnGroup>
          <UI.BtnGroup>

            <ButtonGroup justified style={{paddingRight:'5px'}}>
              <UI.BtnGroupDropdown
                id='bar-padding'
                title='Bar padding'
                arrayOfValues={['none','small','middle','big','extreme',]}
                active={settings.barPadding}
                onChange={name => {
                  this.setSettings({barPadding:name})}
                }
              />
            </ButtonGroup>

            <ButtonGroup justified style={{paddingLeft:'5px'}}>
              <UI.BtnGroupDropdown
                id='bar-label-pos'
                title="Bar label's position"
                arrayOfValues={['none','top','above','bellow','bottom',]}
                active={settings.barLabelPos}
                onChange={value => {this.setSettings({barLabelPos:value})}}
              />
            </ButtonGroup>

          </UI.BtnGroup>
        </UI.Wrapper>
        <UI.LabelChart
          settings={settings}
          onChange={newSettings => {this.setSettings(newSettings)}}
        />


        <UI.Wrapper>
          <UI.LabelAxis
            label='X Axis'
            placeholder='Display nothing'
            axisSettings={settings.xAxis}
            onChange={newSettings => {this.setSettings(newSettings)}}
          />

          <UI.BtnGroup label="Tick Labels' Rotation">
            <UI.BtnGroupBtn
              label='0°'
              active={settings.xAxis.rotation === 0}
              onChange={() => {this.setSettings({xAxis:{...settings.xAxis, rotation:0}})}}
            />
            <UI.BtnGroupBtn
              label='45°'
              active={settings.xAxis.rotation === 45}
              onChange={() => {this.setSettings({xAxis:{...settings.xAxis, rotation:45}})}}
            />
            <UI.BtnGroupBtn
              label='90°'
              active={settings.xAxis.rotation === 90}
              onChange={() => {this.setSettings({xAxis:{...settings.xAxis, rotation:90}})}}
            />
          </UI.BtnGroup>
        </UI.Wrapper>

        <UI.Wrapper>
          <UI.LabelAxis
            label='Y Axis'
            axisSettings={settings.yAxis}
            onChange={newSettings => {this.setSettings(newSettings)}}
          />
          <UI.BtnGroup>
            <UI.BtnGroupBtn
              icon={settings.yAxis.guidelines? <FontAwesome name='eye'/> : <FontAwesome name='eye-slash'/> }
              label='Guides'
              active={settings.yAxis.guidelines}
              onChange={() => {this.setSettings({yAxis:{...settings.yAxis, guidelines:!settings.yAxis.guidelines}})}}
              style={{paddingRight:'5px'}}
            />
            <ButtonGroup justified style={{paddingLeft:'5px'}}>
              <UI.BtnGroupBtn
                label='Left'
                active={settings.yAxis.position === 'left'}
                onChange={() => {this.setSettings({yAxis:{...settings.yAxis, position:'left'}})}}
              />
              <UI.BtnGroupBtn
                label='Right'
                active={settings.yAxis.position === 'right'}
                onChange={() => {this.setSettings({yAxis:{...settings.yAxis, position:'right'}})}}
              />
            </ButtonGroup>
          </UI.BtnGroup>
          <UI.Form label="Domain">
            <UI.FormBtn
              active={settings.automaticDomain}
              onChange={() => {this.setSettings({automaticDomain:!settings.automaticDomain})}}
              tooltip='Set domain automatically'
              >
                <FontAwesome name='magic'/>
              </UI.FormBtn>
              <UI.FormInput
                disabled={settings.automaticDomain}
                value={settings.domainHeight}
                onChange={value => {console.log(typeof value);this.setSettings({domainHeight:value})}}
              />
            </UI.Form>
        </UI.Wrapper>

      </div>

    )
  }
  static graphName = 'BarChart';
  static variables = [
    {
        label: 'Bar height',
        desc: 'Determines height of individual bars.',
        isRequired: true,
        mustBeNumeric: true,
        assignedDimensions:[]
    },
    {
        label: 'Ticks on x axis',
        desc: 'Names each bar/bar group.',
        isRequired: false,
        takesSingleDimension: true,
        assignedDimensions:[]
    },
  ];
  static settings = {
    isVertical:true,

    chartLabel:{
      value: 'Title of the graph',
      align: 'middle',
      isBold: true,
    },
		fontFamily:'Helvetica',
		fontSize:'14px',

		color: d3.schemeCategory10,
		barLabelPos:'above',
		barPadding:'small',
		legend:false,

    xAxis:{
      visible:true,
			value: 'Label on X Axis',
			align:'middle',
	    rotation:0,
		},

		yAxis:{
      visible:true,
			value:'Label on Y Axis',
			align:'middle',
			guidelines:false,
			position:'left',
		},

    automaticDomain: true,
    domainHeight: 10,
  }
	setSettings(newSettings){
		BarChart.settings = {...BarChart.settings, ...newSettings};
		// console.log(BarChart.settings);
		this.props.updateSVG();
	}



  static drawEmptyAndCheck(canvas, svgSize, wholeDataset) {
    const settings = BarChart.settings;
    const width = svgSize.width-(svgSize.width*svgSize.margin);
    const height = svgSize.height-(svgSize.height*svgSize.margin);

    const y = d3.scaleLinear()
      .range([height,0])
      .domain([0, settings.domainHeight]);

    const xAxisGroup = canvas.append('g')
      .classed('x axis group', true)
      .attr('transform', `translate(0,${height})`);

    const hasLabelDimension = this.variables[1].assignedDimensions.length != 0;
    const hasBarDimension = this.variables[0].assignedDimensions.length != 0;

		const isVertical = BarChart.settings.isVertical;

    if(hasBarDimension) {
      /*if(isVertical && isGrouped) this.drawChartVertGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
      else this.drawChartVertGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
      // else if(!isVertical && isGrouped) this.drawChartHorizonGroup(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
      // else if(isVertical && !isGrouped) this.drawChartVertStacked(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);
      // else this.drawChartHorizonStacked(canvas, svgSize, wholeDataset, hasLabelDimension, hasBarDimension);*/



      // GET BARS DIMENSIONS
      const barDimensions = [];
      this.variables[0].assignedDimensions.map(dimension => {
        barDimensions.push(dimension.dimension);
      })
      // GET LABEL DIMENSION
      const labelDimension = hasLabelDimension ? this.variables[1].assignedDimensions[0].dimension : null;

      // simplified dataset
      const dataset = wholeDataset.map((d, i) => {
        const row = barDimensions.map(dimension => {return d[dimension]})
        return row;
      })

      // COLOR
      const colorGenerator = d3.scaleOrdinal().range(settings.color);

      // Y AXIS DOMAIN
      if(settings.automaticDomain){
        const domainMax = d3.max(wholeDataset, d => {return d3.max(barDimensions, barDimension => {return d[barDimension]})});
        y.domain([0, domainMax]).nice()
        settings.domainHeight = y.domain()[1];
      }

  		// X AXIS
  		const x0 = d3.scaleBand()
  								.range([0,width])
  								.domain(d3.range(dataset.length))
  								.padding(0);

  		const x1 = d3.scaleBand()
  							.domain(d3.range(barDimensions.length))
  							.range([0, x0.bandwidth()])
  							.padding(barPadding[settings.barPadding]);

  		const xAxis = d3.axisBottom(x0)
  										.tickSizeOuter(0);

  		xAxisGroup.append('g').call(xAxis);

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
      if(settings.legend) ChartModel.drawLegend(canvas, settings, width, barDimensions, colorGenerator);

		} // AFTER CAN DRAW

    // CHART LABEL
    ChartModel.drawChartLabel(canvas, settings, width);

    // APPEND X AXIS LABEL
    let labelPos = function(){
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

    // APPEND Y AXIS
    // create group
    const yAxisGroup = canvas.append('g')
      .classed('y axis group', true)
      .attr('transform', `translate(${settings.yAxis.position === 'left' ? 0:width},0)`)

    // create axis
    if(settings.yAxis.visible){
      const yAxis = settings.yAxis.position === 'left' ? d3.axisLeft(y) : d3.axisRight(y);
      yAxisGroup.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      canvas.select('g.y.axis.group').select('g.y.axis').selectAll('g.tick').selectAll('text').each(function() {
        d3.select(this).attr('font-family', settings.fontFamily)
      });
    }

    // create label
    labelPos = function(){
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

    // APPEND GUIDELINES
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
  }
}
