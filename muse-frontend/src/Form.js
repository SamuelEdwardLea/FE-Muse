import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';



class Form extends Component {

  state = {
    name: '',
    ageRange: [],
    gender: '',
    genderPref: [],
    Area: ''
  }

  name = (event) => { this.setState({ name: event.target.value }) }
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
            <label id="user-name">Name</label>
            <input type="text" id="userName" onBlur={this.name.bind(this)} />
            <br />
            <br />
            <div id="gender">
              <span className="checkmark">Male</span>
              <input type="radio" name="radio" value="male" onBlur={this.genderChange.bind(this)} />
              <span className="checkmark">Female</span>
              <input type="radio" name="radio" value="female" onBlur={this.genderChange.bind(this)} />
            </div>
            <br />
            <br />

          <div id="user-ageRange">
          <label id="user-name">Min Age</label>
          <input type="number" id="min" className="minimum" onBlur={this.ageLimit.bind(this)} />
          <label id="user-name">Max Age</label>
          <input type="number" id="max" onBlur={this.ageLimit.bind(this)} />
          </div>


          <div id="user-genderPref">
            <div className="dropdown">
              <button className="dropbtn">Gender Preference</button>
              <div className="dropdown-content">
                <a name="Male" onClick = {this.genderPreference.bind(this)}>Male</a>
                <a name="Female" onClick={this.genderPreference.bind(this)}>Female</a>
              </div>
            </div>
          </div>


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