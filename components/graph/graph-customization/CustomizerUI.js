import { Col, Row, Button, FormControl, FormGroup, InputGroup, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {FontFamily, FontSize, BarLabelPos, BarPadding, BarPaddingValue, ColorSchemeNames, ColorSchemes} from './Enums';

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
    return(
      false
    )
  }
}
///////////////////////////////////////////

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
