import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class Overlay extends React.Component{
  render(){
    const { tooltipText, placement } = this.props;

    const tooltip = (
      <Tooltip id="tooltip">{tooltipText}</Tooltip>
    );

    return (
      <OverlayTrigger placement={placement} overlay={tooltip}>
        {this.props.children}
      </OverlayTrigger>
    )
  }
}

Overlay.defaultProps = {
  tooltipText:'NO TOOLTIP SET',
  placement:'top',
}
