import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
import Matches from './Matches'

// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const muiTheme = getMuiTheme(lightBaseTheme);



  

class App extends Component {

  state = {
    email: 'dj_sam_lea@hotmai.com'
  }

  // componentDidMount = () => {

  // }


  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
          {/* <MyAwesomeReactComponent /> */}
      <BrowserRouter>

    
      <div className="App">
      <h1>Loaded!</h1>
      
      <NavBar />
      <Matches/>
          <Switch>
            <Route path="/form" component={Form} />
          </Switch>
      </div>
    
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const NavBar = () => {
  return (
    <nav className="nav-bar">
    <NavLink exact to ="/profile" className="home">Me</NavLink>
    <NavLink exact to ="/home" className="home">Home</NavLink>
    
    </nav>
  )
}


export default App;
