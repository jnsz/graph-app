import DimensionsList from './DimensionsList';
import Variable from './Variable';

export default class Mapping extends React.Component{

  render() {
    return (
      <div className="row">
          <DimensionsList />

          <Variable type='single-any' />
          <Variable type='multi-string' />
          <Variable type='multi-num' />


      </div>
    );
  }

}
