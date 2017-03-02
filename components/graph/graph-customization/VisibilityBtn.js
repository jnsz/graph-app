class VisibilityBtn extends React.Component {

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
    const on = () => {return <i class="fa fa-eye" aria-hidden="true"></i>};
    const off = () => {return <i class="fa fa-eye-slash" aria-hidden="true"></i>};

    return (
          <button type="button" className="btn btn-default" onClick={this.handleClick}>
              {this.state.isToggleOn ? on : off}
          </button>
    );
  }
}
