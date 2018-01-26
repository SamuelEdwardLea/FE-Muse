import React, { Component } from 'react';
import './App.css';
import {Browser, Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
import Matches from './Matches'


class App extends Component {

  state = {
    email: ''
  }

  // componentDidMount = () => {

  // }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <h1>Loaded!</h1>
      <Matches/>
          <Switch>
          <Route path="/form" component={Form} />
          </Switch>
      </div>
    
      </BrowserRouter>
  
    );
  }
}

const NavBar = () => {
  return (
    <nav className="nav-bar">
    <NavLink exact to ="/home" className="home">Home</NavLink><br/>
    <NavLink exact to ="/profile" className="home">Me</NavLink>
    
    </nav>
  )
}


export default App;
