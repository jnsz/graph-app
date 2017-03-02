import DimensionsList from './DimensionsList';
import Variable from './Variable';

export default class Mapping extends React.Component{

  renderVariables() {
    return (
      <div>
        <Variable type='single-any' />
        <Variable type='multi-string' />
        <Variable type='multi-num' />
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <DimensionsList dataset={this.props.dataset} />

        { this.renderVariables() }

        {/*
        <Variable type='single-any' />
        <Variable type='multi-string' />
        <Variable type='multi-num' />
        */}

      </div>
    );
  }

}
