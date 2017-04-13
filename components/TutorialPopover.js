import FontAwesome from 'react-fontawesome';
import Overlay from './Overlay';

export default class TutorialPopover extends React.Component{
  render(){
    const { title, tooltipText } = this.props;



    return (
      <Overlay title={title} tooltipText={tooltipText} type='popover' placement='right' >
        <FontAwesome name='question-circle' style={{color:'#337ab7'}}/>
      </Overlay>
    )
  }
}

Overlay.defaultProps = {
  title:'',
  tooltipText:'NO TUTORIAL TEXT SET',
}
