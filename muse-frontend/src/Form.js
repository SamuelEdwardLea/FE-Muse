import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DropDownMenuSimpleExample from './Menu.js';
import RaisedButtonExampleSimple from './RaisedButtons.js';
import AgeSlider from './ageSlider.js';

import TextField from 'material-ui/TextField';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

/* Buttons */

import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import {orange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class Form extends Component {  

  state = {
    name: '',
    ageRange: [],
    gender: '',
    genderPref: [],
    area: '',
    invalid: true
  }


  genderPrefHandler = (props) => { 
    
    if (!this.state.genderPref.includes(props.target.innerText)) {
      this.setState({
        genderPref: [...this.state.genderPref, props.target.innerText]
      })
    } else {
      var array = this.state.genderPref;
      var index = array.indexOf(props.target.innerText);
      array.splice(index, 1);
      this.setState({genderPref: array });
    }
  }

  ageSlider = (event, props) => {
    this.setState({
      ageRange: [event.min, event.max]
    })
  }

  name = (event) => { 
    this.setState({ name: event.target.value }) ;
  }

  area = (event) => { 
    this.setState({ area: event.target.value.toLowerCase() }) ;
  }


  genderChange = (event) => { 
    this.setState({ gender: event.target.value }) 
  }

  genderPreference = (event) => {
    if (!this.state.genderPref.includes(event.target.name)) {
      this.setState({
        genderPref: [...this.state.genderPref, event.target.name]
      })
    }
  }

  validateForm = () => {
    
  }


  render() {

    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };

    const buttonStyle = {
      margin: 12,
    };
    
    
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: orange500,
        accent1Color: deepOrange500
        
      }
    });

    return (
      <BrowserRouter>
        <section className="container">
          <form>

      <div>
      <TextField
            errorText={(this.state.name.match(/[0-9]/g)) ? "NO!" : null}     
      type="text"
        hintText="eg. David"
        floatingLabelText="Your name"
        onBlur={this.name.bind(this)}
      /><br />
      </div>

            <br />

            <div>
            <TextField
errorText={(this.state.name.match(/[0-9]/g)) ? "NO!" : null}
        hintText="eg. Manchester, London, Paris etc."
        floatingLabelText="Your location"
        onBlur={this.area.bind(this)}
      /><br />
      </div>

            {/* <RadioButtonExampleSimple /> */}

            <div>
    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.genderChange.bind(this)}>
      <RadioButton
        value="Woman"
        label="Woman"
        checkedIcon={<ActionFavorite style={{color: '#F44336'}} />}
        uncheckedIcon={<ActionFavoriteBorder />}
        style={styles.radioButton}
        labelStyle={{position: 'relative', right: '300px'}}
        
      />
      <RadioButton
        value="Man"
        label="Man"
        checkedIcon={<ActionFavorite style={{color: '#F44336'}} />}
        uncheckedIcon={<ActionFavoriteBorder />}
        style={styles.radioButton}
        labelStyle={{position: 'relative', right: '300px'}}        
      />
    </RadioButtonGroup>
    </div>


            <br />
            <br />

            <div className="age-slider">
            <AgeSlider action={this.ageSlider.bind(this)}/>
            </div>

            <br />
            <br />

          <DropDownMenuSimpleExample action={this.genderPrefHandler.bind(this)}/>

          <br />
          <br />

          {/* <RaisedButtonExampleSimple /> */}

          <div>
  <MuiThemeProvider muiTheme={muiTheme}>
    <RaisedButton label="Submit" secondary={true} style={buttonStyle} onClick={this.validateForm.bind(this)} disabled={(this.state.name.length > 0 && this.state.area.length > 0 && this.state.gender.length > 0 && this.state.genderPref.length > 0)}/>
  </MuiThemeProvider>
  </div>

          <br />
          <br />


     
          </form>
        </section>
      </BrowserRouter>
    )
  }

}

export default Form;