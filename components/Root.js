import Navbar from './Navbar.js';
import App from './App.js';

import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <div>here be testin</div>
                <input  type="range"/>
                <div>
                  <ReactBootstrapSlider
        						min={0}
        						max={100}
        						value={30}
        						change={e => {console.log(e.target.value)}}
        					/>
                </div>

                <div style={{marginBottom:'30px'}} />
                {/*<Navbar />*/}
                <App />
            </div>
        );
    }
}
