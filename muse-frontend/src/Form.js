import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DropDownMenuSimpleExample from './Menu.js';
import AgeSlider from './ageSlider.js';
import './form.css'

import TextField from 'material-ui/TextField';

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
    gender: '',
    genderPref: [],
    area: ''
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
      this.setState({ genderPref: array });
    }
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
        <section className="formContainer">
          <form style={{marginTop: "150px"}}>
            <div >
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

            <div>
              <TextField
                hintText="eg. 25"
                floatingLabelText="Your Age"
                onBlur={this.age.bind(this)}
              /><br />
            </div>

            <div>
              <RadioButtonGroup className="genderButtons" defaultSelected="not_light" onChange={this.genderChange.bind(this)} >
                <RadioButton
                  value="Woman"
                  label="Woman"
                  checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  style={styles.radioButton}
                  labelStyle={{ position: 'relative', right: '300px' }}

                />
                <RadioButton
                  value="Man"
                  label="Man"
                  checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  style={styles.radioButton}
                  labelStyle={{ position: 'relative', right: '300px' }}
                />
              </RadioButtonGroup>
            </div>


            <br />
            <br />

            <div className="slider">
            <div className="age-slider">
              <AgeSlider action={this.ageSlider.bind(this)} />
            </div>
            </div>

            <br />
            <br />

            <DropDownMenuSimpleExample action={this.genderPrefHandler.bind(this)} />

            <br />
            <br />

            <div>
              <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton label="Submit" secondary={true} style={buttonStyle} onClick={this.validateForm.bind(this)} disabled={(this.state.name.length > 0 && this.state.age > 17 && this.state.area.length > 0 && this.state.gender.length > 0 && this.state.genderPref.length > 0) ? false : true} />
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