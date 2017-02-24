import VariablesList from './VariablesList';
import Dimension from './Dimension';

export default class VariablesMapping extends React.Component{

  render() {
    return (
      <div className="row">
          <VariablesList />

          <Dimension type='single-any' />
          <Dimension type='multi-string' />
          <Dimension type='multi-num' />


      </div>
    );
  }

}
