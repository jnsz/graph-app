import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class VisibilityBtn extends React.Component {
  render() {
    return (
      <Button onClick={() => {this.props.toggleVisibility(!this.props.visible)}} active={this.props.visible}>
        {this.props.visible ? <FontAwesome name='eye'/> :  <FontAwesome name='eye-slash'/>}
      </Button>
    );
  }
}
