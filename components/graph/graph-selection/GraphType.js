import BtnGroup from './BtnGroup';
import graph_types_list from '../../charts/graph_types_list.json';

export default class GraphType extends React.Component{

  render() {

    const graphs = graph_types_list;

    return (

      <div className="wrapper">
        <div className="row">
          <div className="col-md-12">
            <BtnGroup labels={graphs.map(type => {return type.name;})} />
          </div>
        </div>

        {graphs.map(type => {
          if(typeof type.subtypes !== "undefined"){
            return (
              <div className="row">
                {type.subtypes.map(subtype => {
                  const subtypeList = subtype.map(object => {
                    return object.name
                  })
                  return (
                    <div className="col-md-6">
                      <BtnGroup labels={subtypeList} />
                    </div>
                  )
                })}
              </div>
            )
          }
        })}

      </div>
    );
  }

}