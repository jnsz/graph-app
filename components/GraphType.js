import ButtonGroup from './reusable/ButtonGroup';

export default class GraphType extends React.Component{

  render() {
    return (

      <div className="wrapper">
          <div className="row">
              <div className="col-md-12">
                  <ButtonGroup />
              </div>
          </div>
          <div className="row">
            <div className="col-md-6">
                <ButtonGroup />
            </div>
            <div className="col-md-6">
                <ButtonGroup />
            </div>
          </div>
      </div>
    );
  }

}
