import DimensionsList from './DimensionsList';
import VariablesList from './VariablesList';

export default class Mapping extends React.Component{

  render() {
    return (
      <div  className='row'>
        <DimensionsList dataset={this.props.dataset} />
        <VariablesList
          variables={this.props.graphVariables}
          onAssignedDimensionsOfVariableChange={this.props.onAssignedDimensionsOfVariableChange}
        />
      </div>
    );
  }
}
