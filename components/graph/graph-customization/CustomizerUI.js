import React, { Component, PropTypes } from 'react';
import { Col, Row, Button, FormControl, FormGroup, InputGroup, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import * as d3 from 'd3';

import Overlay from '../../Overlay';
import TutorialPopover from '../../TutorialPopover';
import {FontFamily, FontSize, ColorSchemeNames, ColorSchemes} from './Enums';

const rowStyle = {padding: '0px 15px', marginBottom:'15px'}

export class Wrapper extends Component {
  render() {
    return(
      <Col md={12}>
        <div className='cust'>
          {this.props.children}
        </div>
      </Col>
    )
	}
}

/**
 * Forn Group
 */
export class Form extends Component {
  render(){
    return(
      <Row style={rowStyle}>
				{this.props.label === '' ? false : <label>{ this.props.label }</label>}
				<FormGroup >
					<InputGroup>
						{ this.props.children }
					</InputGroup>
				</FormGroup>
			</Row>
    )
  }
}
Form.defaultProps = {
  label: '',
}

export class FormInput extends Component {
  render(){

    return(
      <FormControl
        style={this.props.style}
        disabled={this.props.disabled}
        type='text'
        placeholder={ this.props.placeholder }
        value={ this.props.value }
        onChange={e => {this.props.onChange(e.target.value)}}
      />
    )
  }
}
FormInput.defaultProps = {
  placeholder:'',
  disabled:false,
  style:{},
}

export class FormAddon extends Component {
  render(){
    if (this.props.children == null) return <InputGroup.Addon style={{padding:'0', border:'0', width:'0'}}/>
    else {
      return(
        <InputGroup.Addon>
          {this.props.children}
        </InputGroup.Addon>
      )
    }
  }
}

export class FormBtn extends Component {
  render(){
    const {active, onChange, children, tooltip} = this.props;

    return(
      <InputGroup.Button>
        <Overlay tooltipText={tooltip} placement='top'>
          <Button
            active={ active }
            onClick={ onChange }
          >
            { children }
          </Button>
        </Overlay>
      </InputGroup.Button>
    )
  }
}
FormBtn.defaultProps = {
  tooltip:''
}

export class FormAlign extends Component {
  render(){
    const { value, onChange } = this.props;

    return (
      <InputGroup.Button>
        <Overlay tooltipText='Align left' placement='top'>
          <Button
            active={value === 'start'}
            onClick={() => {onChange('start')}}
          >
            <FontAwesome name='align-left'/>
          </Button>
        </Overlay>

        <Overlay tooltipText='Align center' placement='top'>
          <Button
            active={value === 'middle'}
            onClick={() => {onChange('middle')}}
          >
            <FontAwesome name='align-center'/>
          </Button>
        </Overlay>

        <Overlay tooltipText='Align right' placement='top'>
          <Button
            active={value === 'end'}
            onClick={() => {onChange('end')}}
          >
            <FontAwesome name='align-right'/>
          </Button>
        </Overlay>
      </InputGroup.Button>
    )
  }
}

/**
 * BtnGroup
 */
export class BtnGroup extends Component {
  render(){
    return(
      <Row style={rowStyle}>
				{this.props.label === '' ? false : <label>{ this.props.label }</label>}
        <ButtonGroup justified>
          { this.props.children }
        </ButtonGroup>
			</Row>
    )
  }
}
BtnGroup.defaultProps = {
  label: '',
}

export class BtnGroupBtn extends Component {
  render(){
    const { active, onChange, icon, label } = this.props;

    return (
      <ButtonGroup>
        <Button
          active={active}
          onClick={onChange}
        >
          {icon} {label}
        </Button>
      </ButtonGroup>
    )
  }
}
BtnGroupBtn.defaultProps = {
  icon: '',
}

export class BtnGroupDropdown extends Component {
  render(){
    const { title, id, arrayOfValues, onChange, active,  } = this.props;

    return (
      <DropdownButton
        title={title}
        id={id}
        onSelect={value => {onChange(value)}}
      >
        {arrayOfValues.map(value => {
          return (
            <MenuItem
              eventKey={value}
              active={active === value}
            >
              {value}
            </MenuItem>
          )
        })}
      </DropdownButton>
    )
  }
}

export class BtnGroupDropdownFontFamily extends Component {
  render(){
    const { active, onChange } = this.props;

    return (
      <DropdownButton
        title='Font family'
        id={'font-family'}
        onSelect={family => {onChange(family)}}
      >
        {FontFamily.map(family => {
          return (
            <MenuItem
              eventKey={family}
              active={active === family}
              style={{fontFamily:family}}
            >
              {family}
            </MenuItem>
          )
        })}
      </DropdownButton>
    )
  }
}

export class BtnGroupDropdownFontSize extends Component {
  render(){
    const { active, onChange } = this.props;

    return (
      <DropdownButton
        title='Font size'
        id={'font-size'}
        onSelect={size => {onChange(size)}}
      >
        {FontSize.map(size => {
          return (
            <MenuItem
              eventKey={size}
              active={active === size}
              style={{fontSize:size}}
            >
              {size}
            </MenuItem>
          )
        })}
      </DropdownButton>
    )
  }
}

export class BtnGroupDropdownColor extends Component {
  render(){
    const { active, onChange } = this.props;

    return (
      <DropdownButton title='Color scheme' id={`color-scheme`} onSelect={value => {onChange(value)}}>
        {ColorSchemes.map((scheme, i) => {
          return (
            <MenuItem eventKey={scheme} active={active === scheme}>
              <div style={{border:'2px solid white'}}>
              {scheme.map((color,j) => {
                if (j < 8) return <div title={ColorSchemeNames[i]} style={{background:color, height: '25px', width: '25px', display:'table-cell'}}></div>
              })}
              </div>
            </MenuItem>
            )
          }
        )}
      </DropdownButton>
    )
  }
}

/**
 * Canvas size settings component that is on top every settings
 */
export class Size extends Component {
  render() {
    const { svgSize, onSvgSizeChange } = this.props;
    const width = svgSize.width;
		const height = svgSize.height;
		const margin = svgSize.margin;

    const sizeLabel =<span>Width and Height <small><TutorialPopover tooltipText='Size of the canvas is the same for all graphs.' /></small></span>
		return (
			<Wrapper>
				<Form label={sizeLabel}>
					<FormInput
						text='Width'
						value={width}
						onChange={newWidth => {onSvgSizeChange({width:newWidth})}}
					/>
					<FormAddon><FontAwesome name='times'/></FormAddon>
					<FormInput
						text='Height'
						value={height}
						onChange={newHeight => {onSvgSizeChange({height:newHeight})}}
					/>
				</Form>
				<Slider
					label='Margins'
					min={0}
					max={1}
					step={0.01}
					value={margin}
					displayedValue={d3.format('.0%')(margin)}
					onChange={newMargin => {onSvgSizeChange({margin:newMargin})}}
				/>
			</Wrapper>
    )
	}
}

/**
 * Settings for axis
 */
export class LabelAxis extends Component {
  render() {
    const { label, axisSettings, onChange } = this.props;

    return(
      <Form label={label}>
        <FormBtn
          active={axisSettings.visible}
          onChange={() => {axisSettings.visible = !axisSettings.visible; onChange(axisSettings)}}
          tooltip='Show/hide axis'
        >
          {axisSettings.visible ? <FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>}
        </FormBtn>
        <FormInput
          placeholder='Display nothing'
          value={axisSettings.value}
          onChange={value => {axisSettings.value = value; onChange(axisSettings)}}
        />
        <FormAlign
          value={axisSettings.align}
          onChange={value => {axisSettings.align = value; onChange(axisSettings)}}
        />
      </Form>
    )
	}
}

/**
 * Settings for chart label and font family and size
 */
export class LabelChart extends Component {
  render() {
    const { settings, onChange } = this.props;
    const chartLabel = settings.chartLabel;

    return(
      <Wrapper>
        <Form label='Graph Label'>
          <FormBtn
            active={chartLabel.isBold}
            onChange={() => {chartLabel.isBold = !chartLabel.isBold; onChange(chartLabel)}}
            tooltip='Bold'
          >
            {chartLabel.isBold ? <span style={{fontWeight:'bold', fontFamily:'Georgia'}}>B</span>:<span style={{paddingRight:'2px', fontFamily:'Georgia'}}>B</span>}
          </FormBtn>
          <FormInput
						placeholder='Display nothing'
						value={chartLabel.value}
						onChange={value => {chartLabel.value = value; onChange(chartLabel)}}
					/>
          <FormAlign
            value={chartLabel.align}
            onChange={value => {chartLabel.align = value; onChange(chartLabel)}}
          />
        </Form>

        <BtnGroup label='Font Settings'>
          <ButtonGroup justified style={{paddingRight:'5px'}}>
            <BtnGroupDropdownFontFamily
              active={settings.fontFamily}
              onChange={value => {onChange({fontFamily:value})}}
            />
          </ButtonGroup>
          <ButtonGroup justified style={{paddingLeft:'5px'}}>
            <BtnGroupDropdownFontSize
              active={settings.fontSize}
              onChange={value => {onChange({fontSize:value})}}
            />
          </ButtonGroup>
        </BtnGroup>
      </Wrapper>
    )
	}
}

/**
 * Slider component
 */
export class Slider extends Component {
	render() {
		return (
			<Row style={rowStyle}>
  			<div>
  				<label style={{display: 'block'}}>
  					{this.props.label}
  				</label>

  				<input
  					style={{width:'90%', display: 'inline-block'}}
  					type='range'
  					min={this.props.min}
  					max={this.props.max}
  					step={this.props.step}
  					value={this.props.value}
  					onChange={e => {this.props.onChange(e.target.value)}}
            className='slider'
  				/>
  				<span style={{float: 'right'}}>{this.props.displayedValue}</span>
  			</div>
			</Row>
		)
	}
}
Slider.PropTypes = {
	label : PropTypes.string.isRequired,
	min : PropTypes.number.isRequired,
	max : PropTypes.number.isRequired,
	step : PropTypes.number.isRequired,
	value : PropTypes.number.isRequired,
	displayedValue : PropTypes.number.isRequired,
	onChange : PropTypes.func.isRequired,
};

/**
 * Domain settings
 */
export class MinMaxDomain extends Component {
  render() {
    const { label,  domain, onChange, } = this.props;
    const { automaticDomain, onAuto } = this.props;

    return (
      <Form label={label}>
        {(onAuto === false) ? <InputGroup.Addon style={{backgroundColor:'white',borderRightColor:'white',borderRadius:'0'}}/> : <FormBtn
          active={automaticDomain}
          onChange={() => {onAuto()}}
          tooltip='Set domain automatically'>
          <FontAwesome name='magic'/>
        </FormBtn>}

        <FormInput
          style={{borderLeft:'none'}}
          disabled={automaticDomain}
          value={domain[0]}
          onChange={value => {let newDomain = domain; newDomain[0] = value; onChange(newDomain)}}
          placeholder='Min'
        />

        <FormAddon />
        <FormInput
          disabled={automaticDomain}
          value={domain[1]}
          onChange={value => {let newDomain = domain; newDomain[1] = value; onChange(newDomain)}}
          placeholder='Max'
        />
      </Form>
    )
  }
}
MinMaxDomain.defaultProps = {
  automaticDomain: false,
  onAuto: false,
}
