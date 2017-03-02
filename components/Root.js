import Navbar from './Navbar.js';
import App from './App.js';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <App />
            </div>
        );
    }

}
