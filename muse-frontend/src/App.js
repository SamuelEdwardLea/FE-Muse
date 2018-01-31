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
    loggedIn: false,
    formRequired: false
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
      
      return fetch(`http://localhost:3000/api/user/profile/${email}`)
      .then(buffer => buffer.json())
      .then(userProfile => {
        console.log(userProfile)
        if (userProfile.GenderPreference.length) {
          this.setState({
            loggedIn: true,
            email: email
          })
        } else {
          this.setState({
            loggedIn: true,
            email: email,
            formRequired: true
          })
        }
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
          <Route exact path="/" render={(routeProps)=> this.state.formRequired ? <Redirect to="/form" /> : <Home getEmail={this.getEmail} email={this.state.email} {...routeProps}/> }/>
          <Route path="/authorised" render={routeProps => this.state.loggedIn ? <Redirect to="/" /> : <div></div>}/>x
          <Route path='/profile'render={routeProps => (< Profile {...routeProps} email={this.state.email}/>)} />
          <Route path="/form" render={(routeProps)=> this.state.formRequired ? <Form email={this.state.email} formCompleted={this.formCompleted} {...routeProps}/> : <Redirect to ="/"/> }/>
          <Route path="/incoming" render={routeProps => {return <Incoming {...routeProps} email={this.state.email}/>}} />
          </Switch>
      </div>
      </div>
      </BrowserRouter>
      </MuiThemeProvider>
    )
  }
  }

  formCompleted = () => {
    this.setState({
      formRequired: false
    })
  }
}

export default App;
