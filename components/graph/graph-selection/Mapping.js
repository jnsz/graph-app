import DimensionsList from './DimensionsList';
import Variable from './Variable';

export default class Mapping extends React.Component{

  renderVariables() {
    const variables = this.props.graphConfig.graphVariables;
    return (
      <div className="col-md-9">
        {variables.map((variable, i) => {
          return (
            <Variable
              key={i+'var'}
              variable={variable}
            />
          )
        })}
      </div>
    )
  }

  render() {

    return (
      <div  className="row">

        <DimensionsList dataset={this.props.dataset} />

        { this.renderVariables() }

      </div>
    );
  }

}
