import React, { Component } from 'react';
import './App.css';
import {Browser, Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';

class Form extends Component {

  state = {
    name: '',
    ageRange: [],
    gender: '',
    genderPref: [],
    Area: ''
  }

  // handleForm = (event) => {

  //   console.log(event.target)
  //   event.preventDefault();
  //   this.setState({
  //     name: event.target.value
  //   });
  // }
  
  name = (event) => { this.setState({ name: event.target.value }) }

  genderChange = (event) => { this.setState({ gender: event.target.value }) }
  
  


  render () {
    return (
      <section className="container">

      <form>
      <label id="user-name">Name</label>      
      <input type="text" id="userName" onBlur={this.name.bind(this)}/> 

      <br />
      <br />

        <div id="gender">
        <input type="radio" name="radio" value="male" onClick={this.genderChange.bind(this)}/>
        <span class="checkmark">Male</span>
        <input type="radio" name="radio" value="female" onClick={this.genderChange.bind(this)}/>
        <span class="checkmark">Female</span>
        </div>

      <br />
      <br />
        

      <div id="user-ageRange"></div>

      <div id="user-genderPref"></div>

      <div id="user-area"></div>
 
      <div id="user-gender">
      <button type="button" onClick={this.handleForm}>Submit</button>
      </div>
    </form>
    
    </section>
    )
  }

}

export default Form;