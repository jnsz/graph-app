import { Row, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class App extends React.Component {

  render() {
    return (
      <div style={{padding: '0px 30px 30px 30px'}}>
      <div className='about'>
        <h2>About</h2>
        <p>
          This simple graph maker is an app that allows you to generate 4 basic static graphs from <code>CSV</code> data.
          It allows you to customize your graph a bit and export it in <code>SVG</code> format.
        </p>
        <p>
          You can also download and use this app locally on your desktop via
          <a href='https://github.com/nanookilla/graph-app'> <FontAwesome name='github' /> GitHub
          </a>
        </p>

        <h2>Tutorial</h2>

          <h3>Loading data</h3>
          <p>When you launch the app, you will see text area. Your <code>CSV</code> goes there.</p>
          <p>Your <code>CSV</code> must be formatted in a way where first line is header that contains unique names of your dimensions (columns).</p>
          <p>If you just want to test the app you can click <span style={{color:'#337ab7'}}><FontAwesome name='clipboard'/> Sample datasets</span> button in the top right corner and test things out.</p>
          <p>When insert data, app will automatically interpret them and display them under the text area in form of table. There you can check how did app interpret your data.</p>
          <p>If you are happy with how your data looks you can continue with selecting graph.</p>

          <h3>Selecting graph</h3>
          <p>There are 4 types of graph in the top of the screen. You can''t select them, unless app contains some data.</p>
          <p>Select graph you want to visualize by clicking it. You can switch between different graphs and data parsing freely without deleting your settings.</p>

          <h3>Mapping data</h3>
          <ul>
            <li>You can drag <span style={{color: 'white',backgroundColor: '#337ab7',padding: '6px 12px',}}>dimensions</span> from dimension list and drop them into  <span style={{border: '1px dashed', padding:'6px 12px'}}>drop areas</span> of variables.</li>
            <li>Graph will automatically genereate itself if all <FontAwesome name='asterisk' style={{color: '#666', margin: '0px 2px'}}/>(required) variables have at least one dimension in them.</li>
            <li></li>
            <li></li>
          </ul>
          <p>
            You can drag <span style={{color: 'white',backgroundColor: '#337ab7',padding: '6px 12px',}}>dimensions</span> from dimension list and drop them into  <span style={{border: '1px dashed', padding:'6px 12px'}}>drop areas</span> of variables.
          </p>
          <p>Graph will automatically genereate itself if all <FontAwesome name='asterisk' style={{color: '#666', margin: '0px 2px'}}/>(required) variables have at least one dimension in them.</p>
          <p>Some variables accept only number dimensions. If you pick up string dimensions, their drop area will turn red.</p>
          <p>
            Drag <span style={{padding: '6px 12px',color: 'white',backgroundColor: '#39D831'}}>varibales</span> around to reorder them.
          </p>


          <h3>Customizing graph</h3>
          <p>

          </p>

          <h3>Exporting SVG</h3>
          <p>

          </p>

      </div>
      </div>
    )
  }
}
