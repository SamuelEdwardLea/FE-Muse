import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AgeSlider from './ageSlider.js';
import './form.css'

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';
import { orange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class Form extends Component {

  state = {
    email: this.props.email,
    name: '',
    age: 0,
    ageRange: [],
    gender: 'Female',
    genderPref: [],
    area: ''
  }


  genderChange = (event) => {
    let value;
    if (event.target.value === 'both') value = ["Male", "Female"]
    else value = [event.target.value]

    this.setState({
      genderPref: value
    })

    // if (!this.state.genderPref.includes(event.target.innerText)) {
    //   this.setState({
    //     genderPref: [...this.state.genderPref, event.target.innerText]
    //   })
    // } else {
    //   var array = this.state.genderPref;
    //   var index = array.indexOf(event.target.innerText);
    //   array.splice(index, 1);
    //   this.setState({ genderPref: array });
    // }
  }

  ageSlider = (event) => {
    this.setState({
      ageRange: [event.min, event.max]
    })
  }

  name = (event) => {
    this.setState({ name: event.target.value });
  }

  age = (event) => {
    this.setState({ age: +event.target.value });
  }

  area = (event) => {
    this.setState({ area: event.target.value.toLowerCase() });
  }

  gender = (event, index, value) => {
    this.setState({ gender: value })
  }

  // genderPreference = (event) => {
  //   if (!this.state.genderPref.includes(event.target.name)) {
  //     this.setState({
  //       genderPref: [...this.state.genderPref, event.target.name]
  //     })
  //   }
  // }

  validateForm = () => {
    console.log('getting here!', this.state.email)
    return fetch(`http://localhost:3000/api/user/profile/${this.state.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        Email: this.state.email,
        Name: this.state.name,
        AgeRange: this.state.ageRange,
        Gender: this.state.gender,
        GenderPref: this.state.genderPref,
        Area: this.state.area,
        Age: this.state.age,
      })
    })
      .catch(console.log)
  }


  render() {

    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
        gridRow: 5,
        gridColumn: 1,
        // marginLeft: 550
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
        <form className="formContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(11, 1fr)' }}>
          <div style={{ gridColumn: "2/5", gridRow: "3" }}>
            <div style={{ width: "10vw", height: "auto", backgroundColor: "blue" }} />

            <TextField
              errorText={(this.state.name.match(/[0-9]/g)) ? "NO!" : null}
              type="text"
              hintText="eg. David"
              floatingLabelText="Your name"
              onBlur={this.name.bind(this)}
            />
            <br />
          </div>

          <br />

          <div style={{ gridColumn: "2/5", gridRow: "6" }}>
            <div style={{ width: "10px", height: "auto", backgroundColor: "red" }} />
            <TextField
              errorText={(this.state.name.match(/[0-9]/g)) ? "NO!" : null}
              hintText="eg. Manchester, London, Paris etc."
              floatingLabelText="Your location"
              onBlur={this.area.bind(this)}
            /><br />
          </div>

          <div style={{ gridColumn: "2/5", gridRow: "4" }}>
            <TextField
              hintText="eg. 25"
              floatingLabelText="Your Age"
              onBlur={this.age.bind(this)}
            /><br />
          </div>

          <div style={{ gridColumn: "2/5", gridRow: "5" }}>
            <DropDownMenu value={this.state.gender} onChange={this.gender.bind(this)} autoWidth={false}>
              <MenuItem value="Male" primaryText="Male" checked={this.genderCheck} />
              <MenuItem value="Female" primaryText="Female" checked={this.genderCheck} />
            </DropDownMenu>
            <br />
          </div>

          <br />
          <br />

          <div className="age-slider" style={{ gridColumn: "2/5", gridRow: "9", alignItems: "end" }}>
            <AgeSlider action={this.ageSlider.bind(this)} />
          </div>

          <br />
          <br />

          <div style={{ gridColumn: "3", gridRow: "8", alignItems: "end" }}>
            <RadioButtonGroup className="genderButtons" defaultSelected="not_light" onChange={this.genderChange.bind(this)} >
              <RadioButton
                value="Female"
                label="Women"
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
                labelStyle={{ position: 'relative', right: '300px' }}
              />
              <RadioButton
                value="Male"
                label="Men"
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
                labelStyle={{ position: 'relative', right: '300px' }}
              />
              <RadioButton
                value="both"
                label="Both"
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
                labelStyle={{ position: 'relative', right: '300px' }}
              />
            </RadioButtonGroup>
          </div>

          <br />
          <br />

          <div style={{ gridColumn: "2/5", gridRow: "10" }}>
            <MuiThemeProvider muiTheme={muiTheme} >
              <RaisedButton label="Submit" secondary={true} style={buttonStyle} onClick={this.validateForm.bind(this)} disabled={(this.state.name.length > 0 && this.state.age > 17 && this.state.area.length > 0 && this.state.gender.length > 0 && this.state.genderPref.length > 0) ? false : true} />
            </MuiThemeProvider>
          </div>

          <br />
          <br />



        </form>
      </BrowserRouter>
    )
  }

}

export default Form;