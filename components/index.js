//import ROOT komponenty App
import Navbar from './Navbar.js';
import App from './App.js';


window.onChangeState = function(state) {
  console.log(state);
  //TODO -> re-render d3 chart
}


//pomoci ReactDOM vykreslime komponentu App do elementu s id "content" (v index.html)
ReactDOM.render(<Navbar />, document.getElementById('navbar'))
ReactDOM.render(<App />, document.getElementById('app'));
