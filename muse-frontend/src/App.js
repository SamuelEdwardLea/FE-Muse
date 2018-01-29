import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
import Matches from './Matches';
import Profile from './profile.js';
import Home from './home'



class App extends Component {

  state = {
    email: 'pkcopley@gmail.com'
  }

  // componentDidMount = () => {

  // }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <h1>Loaded!</h1>
      <NavBar />
          <Switch>
          <Route path="/home" />
          <Route path="/form" component={Form} />
          <Route path='/profile'render={routeProps => (< Profile {...routeProps} email={this.state.email}/>)} />
          </Switch>
      </div>
    
      </BrowserRouter>
  
    );
  }
}

const NavBar = () => {
  return (
    <nav className="nav-bar">
    <NavLink exact to ="/profile" className="home">Me |</NavLink> 
    <NavLink exact to ="/home" className="home"> Home</NavLink>
    
    </nav>
  )
}


export default App;
