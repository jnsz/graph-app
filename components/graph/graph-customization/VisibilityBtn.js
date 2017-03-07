import FontAwesome from 'react-fontawesome';

export default class VisibilityBtn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const on = () => { return <FontAwesome name='eye'/> };
    const off = () => { return <FontAwesome name='eye-slash'/> };

    return (
          <button type='button' className='btn btn-default' onClick={this.handleClick}>
              {this.state.isToggleOn ? on : off}
          </button>
    );
  }
}
