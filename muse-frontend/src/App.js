import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
import Matches from './Matches'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';

class App extends Component {

  state = {
    email: 'dj_sam_lea@hotmai.com'
  }

  // componentDidMount = () => {

  // }

  render() {
    return (
      <MuiThemeProvider>
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
