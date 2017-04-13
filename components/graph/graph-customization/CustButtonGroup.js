import { Row, Col, ButtonToolbar, ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {FontFamily, FontSize, BarLabelPos, BarPadding, BarPaddingValue, ColorSchemeNames, ColorSchemes} from './Enums';

const rowStyle = {
  padding: '0px 15px',
}

export default class CustButtonGroup extends React.Component {

  constructor(){
    super();
    this.renderButton = this.renderButton.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
  }

  render() {
		return (
			<Row style={rowStyle}>
        <label>
          {this.props.label}
        </label>
        <ButtonGroup justified>
          {this.props.buttons.map((group, i) => {

            // Create padding based on the number of groups
            let padding='0 5px 0 5px'
            if(this.props.buttons.length == 1) padding='0 0 0 0';
            else if(this.props.buttons.length > 1 && i == 0) padding = '0 5px 0 0';
            else if(this.props.buttons.length > 1 && i == this.props.buttons.length-1) padding = padding = '0 0 0 5px';

            return(
              <ButtonGroup justified style={{padding:padding}} key={i+'group'}>
              {group.map((button, j) => {
                if(typeof button.type === 'undefined') return this.renderButton(button, j);
                else return this.renderDropdown(button, j);
              })}
              </ButtonGroup>
            )
          })}
        </ButtonGroup>
			</Row >
		)
	}

  renderButton(button, index){
    return (
      <ButtonGroup key={index+'btn'} >
        <Button
          active={button.active}
          onClick={button.onClick}
        >
          {button.icon} {button.label}
        </Button>
      </ButtonGroup>
    )
  }

  renderDropdown(menu, index){
    if(typeof menu.tamplate !== 'undefined')
    {
      switch (menu.tamplate) {
        case 'fontFamily':
          return (
            <DropdownButton title='Font family' key={index+'dropdown'} id={`font-family-${index}`} onSelect={value => {menu.onClick(value)}}>
              {FontFamily.map(family => {
                return <MenuItem eventKey={family} active={menu.active === family} style={{fontFamily:family}}>{family}</MenuItem>;
                }
              )}
            </DropdownButton>
          )
          break;
        case 'fontSize':
          return (
            <DropdownButton title='Font size' key={index+'dropdown'} id={`font-size-${index}`} onSelect={value => {menu.onClick(value)}}>
              {FontSize.map(size => {
                return <MenuItem eventKey={size} active={menu.active === size} style={{fontSize:size}}>{size}</MenuItem>;
                }
              )}
            </DropdownButton>
          )
          break;
        case 'barLabelPos':
          return (
            <DropdownButton title='Bar label position' key={index+'dropdown'} id={`label-pos-${index}`} onSelect={value => {menu.onClick(value)}}>
              {BarLabelPos.map(pos => {
                return <MenuItem eventKey={pos} active={menu.active === pos}>{pos}</MenuItem>;
                }
              )}
            </DropdownButton>
          )
          break;
        case 'barPadding':
          return (
            <DropdownButton title='Bar spacing' key={index+'dropdown'} id={`bar-padding-${index}`} onSelect={value => {menu.onClick(value)}}>
              {BarPaddingValue.map((padding, i) => {
                return <MenuItem eventKey={padding} active={menu.active === padding}>{BarPadding[i]}</MenuItem>;
                }
              )}
            </DropdownButton>
          )
          break;
        case 'color':
          return (
            <DropdownButton title='Color scheme' key={index+'dropdown'} id={`color-scheme-${index}`} onSelect={value => {menu.onClick(value)}}>
              {ColorSchemes.map((scheme, i) => {
                return (
                  <MenuItem eventKey={scheme} active={menu.active === scheme}>
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
          break;
      }
    }
    return (
      'TAMPLATELES DROPDOWN NOT IMPLEMENTED'
    )

  }
}
;
CustButtonGroup.defaultProps={
  label:'',
}
