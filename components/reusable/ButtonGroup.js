import Button from './Button';

export default class GraphSelection extends React.Component{


  render() {
    return (
        <div className="btn-group btn-group-justified">
            <Button icon='fa fa-bar-chart fa-5x' />
            <Button icon='fa fa-pie-chart fa-5x' />
            <Button icon='fa fa-line-chart fa-5x' />
        </div>
    );
  }
}
