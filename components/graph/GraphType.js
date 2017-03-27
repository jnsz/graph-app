import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const graphTypes = [
  {
    'name':'BarChart',
    'icon':'bar-chart',
  },
  {
    'name':'pieChart',
    'icon':'pie-chart',
  },
  {
    'name':'lineChart',
    'icon':'line-chart',
  },
  {
    'name':'scatterPlot',
    'icon':'braille'
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
                    <Button
                      active={isActive}
                      onClick={e => this.handleClick(type.name)}
                    >
                      <FontAwesome name={type.icon} size={'5x'}/>
                    </Button>
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
