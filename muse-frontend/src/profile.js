import React, { Component } from 'react';
import './profile.css'



class Profile extends Component {
  state = {
    userProfile: ''
  }

  componentDidMount = event => {
    this.fetchUserProfile(this.props.email)
  }

  fetchUserProfile = (email) => {
    return fetch(`http://localhost:3000/api/user/profile/${email}`)
    .then(buffer => buffer.json())
    .then(userProfile => {
      console.log(userProfile)
      this.setState({userProfile})
    })
  }


  render() {
    return (
      <div>
      <object data={this.state.userProfile.picture}>
        <img src="https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170"/>
      </object>
      <h1>{this.state.userProfile.Name}</h1>
      <h1>{this.state.userProfile.Age}</h1>
      <article>
        {this.state.userProfile.Bio}
      </article>
      <h2>{this.state.userProfile.Email}</h2>
      </div>
    )
  }
}

export default Profile;
