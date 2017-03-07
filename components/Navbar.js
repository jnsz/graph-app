export default class Navbar extends React.Component {

    render() {
      return (
          <nav className='navbar navbar-default'>
              <div className='container'>
                  <div className='navbar-header'>
                      <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#navbar'>
                          <span className='icon-bar'></span>
                          <span className='icon-bar'></span>
                          <span className='icon-bar'></span>
                      </button>
                      <a className='navbar-brand' href='#'>
                          <i height='20' width='20' className='fa fa-bar-chart' />
                      </a>
                  </div>
                  <div className='collapse navbar-collapse' id='navbar'>
                      <ul className='nav navbar-nav navbar-right'>
                        <li><a href='https://github.com/nanookilla/graph-app'><span className='fa fa-github'> GitHub</span></a></li>
                        <li><a href='https://github.com/nanookilla/graph-app'><span className='fa fa-github'> GitHub</span></a></li>
                      </ul>
                  </div>
              </div>
          </nav>
      );
    }

}
