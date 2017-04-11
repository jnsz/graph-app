import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class Overlay extends React.Component{
  render(){
    const tooltip = (
      <Tooltip id="tooltip">{this.props.tooltip}</Tooltip>
    );

    return (
      <OverlayTrigger placement='top' overlay={tooltip}>
        {this.props.children}
      </OverlayTrigger>
    )
  }
}

Overlay.defaultProps = {
  tooltip:'NO TOOLTIP SET',
  placement:'top',
}
