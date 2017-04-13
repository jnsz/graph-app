import { Row, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>
        Graph app
        </h1>

        <Button bsStyle="link" href='https://github.com/nanookilla/graph-app'><FontAwesome name='github' /> GitHub</Button>

        <h2>Description</h2>
        <p> This app can: </p>
      <ul className='about'>
          <li>generate basic types of graphs;</li>
          <li>exports graphs in <code>.svg</code>;</li>
          <li>static (non interactive) graphs that can be used in print;</li>
          <li>better than Illustrator's in-build graph generator;</li>
        </ul>

        <p>This application is used to generate basic graphs that can be exported in <code>.svg</code> format.
        <code>.svg</code> can be openned in vector graphics editor (such as Adobe Illustrator).
        Graphs are static (no interactivity) as  they are meant to be used in print.</p>
      </div>
    )
  }
}
