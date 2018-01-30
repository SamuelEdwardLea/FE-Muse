import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Form from './Form.js';
// import Matches from './Matches'
import Home from './home'
import Profile from './profile'
import Navbar from './Navbar'



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
      <div className="container" style={{backgroundColor: "white", width: "80vw", height:"100%", position: "relative"}}>
          <Switch>
          <Route exact path="/" render={(routeProps)=> {return <Home getEmail={this.getEmail} email={this.state.email} {...routeProps}/> }}/>
          <Redirect from="/home" to="/" /> 
          <Route path='/profile'render={routeProps => (< Profile {...routeProps} email={this.state.email}/>)} />
          <Route path="/form" render={(routeProps)=> {
            return (
              <Form email={this.state.email} {...routeProps}/>
            )
          }} />
          </Switch>
      </div>
      </div>
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
