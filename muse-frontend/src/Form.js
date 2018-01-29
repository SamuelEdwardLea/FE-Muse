import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DropDownMenuSimpleExample from './Menu.js';
import RaisedButtonExampleSimple from './RaisedButtons.js';
import AgeSlider from './ageSlider.js';
import RadioButtonExampleSimple from './genderButtons.js';
import TextFieldExampleSimple from './signupFields.js';



class Form extends Component {  

  state = {
    name: '',
    ageRange: [],
    gender: '',
    genderPref: [],
    Area: '',
    test: false,
    value: { min: 2, max: 10 }
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
    console.log('boo')
    // this.setState({ name: event.target.value }) ;
  }


  genderChange = (event) => { this.setState({ gender: event.target.value }) }
  location = (event) => { this.setState({ Area: event.target.value }) }
  ageLimit = (event) => {
    if (event.target.value < 18) event.target.className = 'invalid'
    else if (event.target.value > 100) event.target.className = 'invalid'
    else event.target.className = 'valid'
if (event.target.id === "min") this.setState({ageRange: [event.target.value, this.state.ageRange[1]]})
else if (event.target.id === "max") this.setState({ ageRange: [this.state.ageRange[0], event.target.value]})
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
    return (
      <BrowserRouter>
        <section className="container">
          <form onSubmit={this.handleForm}>
            {/* <label id="user-name">Name</label>
            <input type="text" id="userName" onBlur={this.name.bind(this)} />
            <br /> */}

            <TextFieldExampleSimple onChange={this.name.bind(this)}/>

            <br />


            <RadioButtonExampleSimple />


            {/* <div id="gender">
              <span className="checkmark">Male</span>
              <input type="radio" name="radio" value="male" onBlur={this.genderChange.bind(this)} />
              <span className="checkmark">Female</span>
              <input type="radio" name="radio" value="female" onBlur={this.genderChange.bind(this)} />
            </div> */}



            <br />
            <br />

            <div className="age-slider">
            <AgeSlider action={this.ageSlider.bind(this)} stater={this.state.genderPref.length}/>
            </div>

            <br />
            <br />

       

          <DropDownMenuSimpleExample action={this.genderPrefHandler.bind(this)}/>

          <br />
          <br />

          <RaisedButtonExampleSimple />

      


          <div id="user-area">
          <label id="user-name">City</label>
          <input type="text" id="location" onBlur={this.location.bind(this)} />
          </div>

          <br />
          <br />


          <div id="button">
            <button type="submit" disabled="true" onClick={this.validateForm.bind(this)}>Submit</button>
          </div>
          </form>
        </section>
      </BrowserRouter>
    )
  }

}

export default Form;