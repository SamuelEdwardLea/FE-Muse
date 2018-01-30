import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Form from './Form.js';
// import Matches from './Matches'
import Home from './home'
import Profile from './profile'
import Navbar from './Navbar'
import Incoming from './Incoming'


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
      <Navbar />
          <Switch>
          <Route exact path="/" render={(routeProps)=> {return <Home getEmail={this.getEmail} {...routeProps}/> }}/>
          <Route path="/home" render={(routeProps) => {return <Home getEmail={this.getEmail} {...routeProps} />}}/>
          <Route path='/profile'render={routeProps => (< Profile {...routeProps} email={this.state.email}/>)} />
          <Route path="/form" render={(routeProps)=> {
            return (
              <Form email={this.state.email} {...routeProps}/>
              )
            }} 
           />
          <Route path="/incoming" render={routeProps => {return <Incoming {...routeProps} email={this.state.email}/>}} />
          </Switch>
      </div>
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
