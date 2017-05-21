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
        <p>You can also download and use this app locally on your desktop via <a href='https://github.com/jnsz/graph-app'><FontAwesome name='github' /> GitHub</a>.</p>

        <h2>Tutorial</h2>

          <h3>Loading data</h3>
          <p>On the <span style={{color:'#337ab7'}}><FontAwesome name='table'/> Data parsing</span> tab you can see text area. <code>CSV</code> data goes there.</p>
          <p><code>CSV</code> must be formatted in a way where first line is header that contains unique names of your dimensions (columns).</p>
          <p>If you just want to test the app you can click <span style={{color:'#337ab7'}}><FontAwesome name='clipboard'/> Sample datasets</span> button in the top right corner and test things out.</p>
          <p>When data is inserted, app will automatically interpret them and display them under the text area in form of table. There you can check how app interpreted your data.</p>

          <h3>Selecting graph</h3>
          <p>There are 4 types of graph in the top of the screen. You can't select them, unless app contains some data.</p>
          <p>Select graph you want to visualize by clicking it. You can switch between tabs freely without deleting your settings.</p>

          <h3>Mapping data</h3>
          <p>You can drag <span style={{color: 'white',backgroundColor: '#337ab7',padding: '4px 12px',}}>dimensions</span> from dimension list and drop them into  <span style={{border: '1px dashed', padding:'4px 12px'}}>drop areas</span> of variables.</p>
          <p>Graph will automatically genereate itself if all <FontAwesome name='asterisk' style={{color: '#666', margin: '0px 2px'}}/>(required) variables have at least one dimension in them.</p>
          <p>Variables accept either max <FontAwesome name='tag' style={{color: '#666', margin: '0px 2px'}}/> (one) or <FontAwesome name='tags' style={{color: '#666', margin: '0px 2px'}}/> (any number) of dimensions</p>
          <p>Variables accept either number or any type of dimesnion. If you pick up string dimensions, <span style={{border: '1px dashed', padding:'4px 12px'}}>drop areas</span> of numeric dimensions will turn red.</p>
          <p>Drag <span style={{padding: '4px 12px',color: 'white',backgroundColor: '#39D831'}}>variables</span> around to reorder them. This list's order will determine order in which elements will be drawn.</p>

          <h3>Graph settings</h3>
          <p>In graph section next to the canvas where graph is displayed (or underneath if page is too narrow) are graph settings.</p>
          <p>First block is always size of the canvas. This setting is the only one shared between different types of graphs.</p>
          <p>Other settings enable you to toggle visibility of some elements (<FontAwesome name='eye' style={{color: '#666', margin: '0px 2px'}}/>), select from multiple variants (<FontAwesome name='caret-down' style={{color: '#666', margin: '0px 2px'}}/>) or type in you own value.</p>
          <p>Domains are set automatically. If you want to set your own domain disable automatic domain by clicking <FontAwesome name='magic' style={{color: '#666', margin: '0px 2px'}}/> icon and put in your own numeric values. If you enable the icon again, domains will be set automatically again.</p>

          <h3>Exporting SVG</h3>
          <p>In the graph section in graph settings last block is Export. Here you can save graph as <code>SVG</code> to your desktop.</p>
      </div>
      </div>
    )
  }
}
