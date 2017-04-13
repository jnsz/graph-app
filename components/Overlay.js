import { Tooltip, Popover, OverlayTrigger } from 'react-bootstrap';

export default class Overlay extends React.Component{
  render(){
    const { type, tooltipText, title, placement} = this.props;

    const overlay = function(){
      switch(type){
        case 'popover':
          return (
            <Popover id='popover' title={title}>
              {tooltipText}
            </Popover>
          )
          break;

        default:
          return (
            <Tooltip id='tooltip'>
              {tooltipText}
            </Tooltip>
          )
      }
    }()

    return (
      <OverlayTrigger placement={this.props.placement} overlay={overlay}>
        {this.props.children}
      </OverlayTrigger>
    )
  }
}

Overlay.defaultProps = {
  tooltipText:'NO TOOLTIP SET',
  type:'tooltip',
  placement:'top',
}
