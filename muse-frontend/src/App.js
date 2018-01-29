import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
import Matches from './Matches'
import Home from './home'
import Profile from './profile'

// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const muiTheme = getMuiTheme(lightBaseTheme);



  

class App extends Component {

  state = {
    email: ''
  }

getEmail =  (email) => {
  this.setState({
    email: email
  })
}


  render() {
    
    return (

      <MuiThemeProvider muiTheme={muiTheme}>

      <BrowserRouter>

    
      <div className="App">
      <h1>Loaded!</h1>
      <NavBar />
          <Switch>
         <Route exact path="/" render={(routeProps)=> {
            return (
              <Home getEmail={this.getEmail} {...routeProps}/>
              )
            }} 
            />
          <Route path="/home" component={Home} />
          <Route path='/profile'render={routeProps => (< Profile {...routeProps} email={this.state.email}/>)} />
        
            <Route path="/form" render={(routeProps)=> {
            return (
              <Form email={this.state.email} {...routeProps}/>
              )
            }} 
           />


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
