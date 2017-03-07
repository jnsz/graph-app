import * as RB from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class VisibilityBtn extends React.Component {

  render() {
    return (
      <RB.Button onClick={this.props.toggleVisibility} active={this.props.visible}>
        {this.props.visible ? <FontAwesome name='eye'/> :  <FontAwesome name='eye-slash'/>}
      </RB.Button>
    );
  }
}
