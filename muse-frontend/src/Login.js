import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const muiTheme = getMuiTheme(lightBaseTheme);


const Login = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <div className="App">
      <div className="container" id="backDiv">
      <div className="loginContainer">   
      <p>Muse</p>    
      <p style={{fontSize: '50px'}}>A dating app for</p>     
      <img src={require('./Spotify_Logo_RGB_Green.png')} style={{height:' 125px'}}/>
      <p></p>
      <a href="http://localhost:3000/api/authorise"><RaisedButton label="Log In" backgroundColor="rgb(38, 206, 44)"/></a>
      <p></p>
      <p></p>
      </div>
      </div>
    </div>
    </MuiThemeProvider>
  )
}

export default Login