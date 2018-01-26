import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';



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
    <NavLink exact to ="/profile" className="home">Me</NavLink>
    <NavLink exact to ="/home" className="home">Home</NavLink>
    
    </nav>
  )
}


export default App;
