import Navbar from './Navbar.js';
import App from './App.js';

import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <div style={{marginBottom:'30px'}} />
                {/*<Navbar />*/}
                <App />
            </div>
        );
    }
}
