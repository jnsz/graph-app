import { Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const rowStyle = {
  padding: '0px 15px',
}

export default class CustButtonGroup extends React.Component {

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
                return (
                  <ButtonGroup key={j+'btn'} >
                    <Button
                      active={button.active}
                      onClick={button.onClick}
                    >
                      {button.label}
                    </Button>
                  </ButtonGroup>
                )
              })}
              </ButtonGroup>
            )
          })}
        </ButtonGroup>
			</Row >
		)
	}
}

CustButtonGroup.defaultProps={
  label:'',
}
