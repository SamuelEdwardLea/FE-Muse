import React, { Component } from 'react';
import './profile.css'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'



class Profile extends Component {
  state = {
    userProfile: '',
    draweropen: false,
    dialogueopen: false,
    loading: true
  }

  componentDidMount = event => {
    this.fetchUserProfile(this.props.email)
  }

  handleDrawerToggle = () => {
    this.setState({
      draweropen: !this.state.draweropen
    })
  }

  handleDialogueToggle = () => {
    this.setState({
      dialogueopen: !this.state.dialogueopen
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
      <div className="titleContainer">
      <p className="title">Your Profile</p>
      <RaisedButton
      label="Edit"
      onClick={this.handleDrawerToggle}
      />
      </div>
      <div className="header">
      <div className="headerPic">
      <center>
      <object className="profilePic" data={this.state.userProfile.picture}>
        <img className="profilePic" src="https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170"/>
      </object>
      </center>
        <i onClick={this.handleDialogueToggle}className="material-icons" id="picBuild">build</i>
      </div>
      <div className="headerInfo">
      <p className="labels">Name</p>
      <p className="userName">{this.state.userProfile.Name}</p>
      <p className="labels">Age</p>      
      <p className="userAge">{this.state.userProfile.Age}</p>
      </div>
      </div>
      <div className="userBody">
      <article className="bio">
      <div className="bioText">
        {this.state.userProfile.Bio}
        <div id="bioBuild"><i onClick={this.handleDialogueToggle}className="material-icons">build</i></div>
        </div>
      </article>
      <p className="userEmail">{this.state.userProfile.Email}</p>
  
      <Drawer open={this.state.draweropen}>
        <MenuItem className="aboutLabel" style={{color: '#1db954'}}><strong>About</strong><i id="menuBuild" onClick={this.changeUserDetails} className="material-icons">build</i></MenuItem>
        <MenuItem><strong>Gender</strong> </MenuItem>
        <Divider/>
        <MenuItem>{this.state.userProfile.Gender}</MenuItem>
        <MenuItem><strong>Account Overview</strong></MenuItem>
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
