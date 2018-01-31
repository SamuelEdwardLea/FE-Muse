import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Form from './Form.js';
// import Matches from './Matches'
import Home from './home'
import Profile from './profile'
import Navbar from './Navbar'
import Incoming from './Incoming'
import Login from './Login'

// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const muiTheme = getMuiTheme(lightBaseTheme);

class App extends Component {
  state = {
    email: '',
    loggedIn: false
  }

getEmail = (email) => {
  if (this.state.email === '') {
    this.setState({
      email: email
    })
  }
}

  componentDidMount() {
    if (/\?email=/g.test(window.location.href)) {

      const email = window.location.href.slice(40)
      console.log(this.props)
      this.setState({
        loggedIn: true,
        email: email
      })
    }
  }

  render() {
    
    if (!this.state.loggedIn) {
        return (
          <Login/>
        )
    } else {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <BrowserRouter>
      <div className="App">
      <Navbar />
      <div className="container" id="backDiv">
          <Switch>
          <Route exact path="/" render={(routeProps)=> {return <Home getEmail={this.getEmail} email={this.state.email} {...routeProps}/> }}/>
          <Route path="/authorised" render={routeProps => this.state.loggedIn ? <Redirect to="/" /> : <div></div>}/>x
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
      </div>
      </BrowserRouter>
      </MuiThemeProvider>
    )
  }
  }
}

export default App;
