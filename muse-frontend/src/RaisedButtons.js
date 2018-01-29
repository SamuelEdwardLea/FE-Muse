import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import {deepOrange500} from 'material-ui/styles/colors';
import {orange500} from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const style = {
  margin: 12,
};


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    accent1Color: deepOrange500
    
  }
});


const RaisedButtonExampleSimple = (props) => (
  <div>
  <MuiThemeProvider muiTheme={muiTheme}>
    <RaisedButton label="Submit" secondary={true} style={style} disabled={true}/>
    <br />
    <br />
    {/* <RaisedButton label="Full width" fullWidth={true} /> */}
  </MuiThemeProvider>
    
  </div>

);

export default RaisedButtonExampleSimple;