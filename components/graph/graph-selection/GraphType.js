import * as RB from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'

import graph_types_list from '../../graphs/graph_types_list.json';

export default class GraphType extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        <RB.Row>
          <RB.Col md={12}>
            <RB.ButtonGroup justified>

              {graph_types_list.map((type, i) => {
                const isActive = this.props.selectedGraph === type.name;
                return (
                  <div key={i+'btn'} className='btn-group' role='group'>
                    <RB.Button
                      active={isActive}
                      onClick={e => this.handleClick(type.name)}
                    >
                      <FontAwesome name={type.icon} size={'5x'}/>
                    </RB.Button>
                  </div>
                )
              })}

            </RB.ButtonGroup>
          </RB.Col>
        </RB.Row>
      </div>
    );
  }

  handleClick(name){
    this.props.onSelectedGraphChange(name);
  }
}
