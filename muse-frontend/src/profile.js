import React, { Component } from 'react';
import './profile.css'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'



class Profile extends Component {
  state = {
    userProfile: '',
    open: false,
    loading: true
  }

  componentDidMount = event => {
    this.fetchUserProfile(this.props.email)
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }


  fetchUserProfile = (email) => {
    return fetch(`http://localhost:3000/api/user/profile/${email}`)
    .then(buffer => buffer.json())
    .then(userProfile => {
      console.log(userProfile)
      this.setState({
        userProfile: userProfile,
      loading: false
      })
    })
  }

  changeUserDetails = event => {
    console.log('hiya')
  }

  render() {
  return this.state.loading ? (<p> loading.... </p>) :
    (
      <div className="profilePage">
      <div className="header">
      <div className="headerPic">
      <object className="profilePic" data={this.state.userProfile.picture}>
        <img className="profilePic" src="https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170"/>
      </object>
      </div>
      <div className="headerInfo">
      <p className="userName">{this.state.userProfile.Name}</p>
      <p className="userAge">{this.state.userProfile.Age}</p>
      </div>
      </div>
      <div className="userBody">
      <article className="bio">
        {this.state.userProfile.Bio}
      </article>
      <h2 className="userEmail">{this.state.userProfile.Email}</h2>
      <RaisedButton
      label="Toggle Drawer"
      onClick={this.handleToggle}
      />
      <Drawer open={this.state.open}>
        <MenuItem className="aboutLabel">About<i onClick={this.changeUserDetails} className="material-icons">build</i></MenuItem>
        <MenuItem><strong>Gender</strong> </MenuItem>
        <Divider/>
        <MenuItem>{this.state.userProfile.Gender}</MenuItem>
        <MenuItem><strong> Your preferences</strong></MenuItem>
        <MenuItem>{this.state.userProfile.GenderPreference.reduce((acc, item)  => {
          { acc.push(`${item}`)
          return acc;}}, []).join(' | ')}</MenuItem>
        <Divider/>
        <MenuItem><strong> Location</strong> </MenuItem>
        <MenuItem>{this.state.userProfile.Area}</MenuItem>
        </Drawer>
      </div>
      </div>
    )
  }
}

export default Profile;
