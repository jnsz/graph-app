import { Col, Row, Button, FormControl, FormGroup, InputGroup, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {FontFamily, FontSize, ColorSchemeNames, ColorSchemes} from './Enums';

const rowStyle = {padding: '0px 15px'}

export class Wrapper extends React.Component {
  render() {
    return(
      <Col md={6}>
        <div className='cust'>
          {this.props.children}
        </div>
      </Col>
    )
	}
}

///// FORM GROUP //////////////////////////
export class Form extends React.Component {
  render(){
    return(
      <Row style={rowStyle}>
				<label>
					{ this.props.label }
				</label>
				<FormGroup >
					<InputGroup>
						{ this.props.children }
					</InputGroup>
				</FormGroup>
			</Row >
    )
  }
}
Form.defaultProps = {
  label: '',
}

export class FInput extends React.Component {
  render(){
    return(
      <FormControl
        type='text'
        placeholder={ this.props.placeholder }
        value={ this.props.value }
        onChange={e => {this.props.onChange(e.target.value)}}
      />
    )
  }
}
FInput.defaultProps = {
  placeholder: '',
}

export class FAddon extends React.Component {
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

export class FBtn extends React.Component {
  render(){
    const {active, onChange, children} = this.props;

    return(
      <InputGroup.Button>
        <Button
          active={ this.props.active }
          onClick={ this.props.onChange }
        >
          { this.props.children }
        </Button>
      </InputGroup.Button>
    )
  }
}

export class FAlign extends React.Component {
  render(){
    const { value, onChange } = this.props;

    return (
      <InputGroup.Button>
        <Button
          active={value === 'start'}
          onClick={() => {onChange('start')}}
        >
          <FontAwesome name='align-left'/>
        </Button>
        <Button
          active={value === 'middle'}
          onClick={() => {onChange('middle')}}
        >
          <FontAwesome name='align-center'/>
        </Button>
        <Button
          active={value === 'end'}
          onClick={() => {onChange('end')}}
        >
          <FontAwesome name='align-right'/>
        </Button>
      </InputGroup.Button>
    )
  }
}
///////////////////////////////////////////

///// BTN GROUP ///////////////////////////
export class BtnGroup extends React.Component {
  render(){
    return(
      <Row style={rowStyle}>
				<label>
					{ this.props.label }
				</label>
        <ButtonGroup justified>
          { this.props.children }
        </ButtonGroup>
			</Row >
    )
  }
}
BtnGroup.defaultProps = {
  label: '',
}

export class BBtn extends React.Component {
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
BBtn.defaultProps = {
  icon: '',
}

export class BDropdown extends React.Component {
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

export class BFontFamily extends React.Component {
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

export class BFontSize extends React.Component {
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

export class BColorPalette extends React.Component {
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
///////////////////////////////////////////

export class LabelAxis extends React.Component {
  render() {
    const { label, axisSettings, onChange } = this.props;

    return(
      <Form label={label}>
        <FBtn
          active={axisSettings.visible}
          onChange={() => {axisSettings.visible = !axisSettings.visible; onChange(axisSettings)}}
          >
            {axisSettings.visible ? <FontAwesome name='eye'/>:<FontAwesome name='eye-slash'/>}
          </FBtn>
          <FInput
            placeholder='if left empty, nothing will display'
            value={axisSettings.value}
            onChange={value => {axisSettings.value = value; onChange(axisSettings)}}
          />
          <FAlign
            value={axisSettings.align}
            onChange={value => {axisSettings.align = value; onChange(axisSettings)}}
          />
        </Form>
    )
	}
}

export class LabelChart extends React.Component {
  render() {
    const { settings, onChange } = this.props;
    const chartLabel = settings.chartLabel;

    return(
      <Wrapper>
        <Form label='Graph label'>
          <FBtn
            active={chartLabel.isBold}
            onChange={() => {chartLabel.isBold = !chartLabel.isBold; onChange(chartLabel)}}
          >
            <FontAwesome name='bold'/>
          </FBtn>
          <FInput
						placeholder='Graph label'
						value={chartLabel.value}
						onChange={value => {chartLabel.value = value; onChange(chartLabel)}}
					/>
          <FAlign
            value={chartLabel.align}
            onChange={value => {chartLabel.align = value; onChange(chartLabel)}}
          />
        </Form>

        <BtnGroup>
          <BFontFamily
            active={settings.fontFamily}
            onChange={value => {onChange({fontFamily:value})}}
          />
          <BFontSize
            active={settings.fontSize}
            onChange={value => {onChange({fontSize:value})}}
          />
        </BtnGroup>
      </Wrapper>
    )
	}
}

export class Slider extends React.Component {

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
	label : React.PropTypes.string.isRequired,
	min : React.PropTypes.number.isRequired,
	max : React.PropTypes.number.isRequired,
	step : React.PropTypes.number.isRequired,
	value : React.PropTypes.number.isRequired,
	displayedValue : React.PropTypes.number.isRequired,
	onChange : React.PropTypes.func.isRequired,
};
