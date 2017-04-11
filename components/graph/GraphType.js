import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Overlay from '../Overlay';

const graphTypes = [
  {
    'name':'BarChart',
    'icon':'bar-chart',
    'tooltip':'Bar Chart'
  },
  {
    'name':'PieChart',
    'icon':'pie-chart',
    'tooltip':'Pie Chart'
  },
  {
    'name':'LineChart',
    'icon':'line-chart',
    'tooltip':'Line Chart'
  },
  {
    'name':'ScatterPlot',
    'icon':'braille',
    'tooltip':'Scatter Plot'
  }
];


export default class GraphType extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <Row>
          <Col md={12}>
            <ButtonGroup justified>

              {graphTypes.map((type, i) => {
                const isActive = this.props.selectedGraph === type.name;
                return (
                  <ButtonGroup key={i+'btn'}>
                    <Overlay tooltip={type.tooltip}>
                      <Button
                        active={isActive}
                        onClick={e => this.handleClick(type.name)}
                      >
                        <FontAwesome name={type.icon} size={'5x'}/>
                      </Button>
                    </Overlay>
                  </ButtonGroup>
                )
              })}

            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }

  handleClick(name){
    this.props.onSelectedGraphChange(name);
  }
}
