import React, { Component } from 'react';
import './profile.css'
import PictureDialog from './PictureDialog';
import BioDialog from './BioDialog'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import DropDownMenu from 'material-ui/DropDownMenu';
import DropDownMenuSimpleExample from './Menu'
import TextField from 'material-ui/TextField'
import AgeSlider from './ageSlider.js';


class Profile extends Component {
  state = {
    userProfile: '',
    draweropen: false,
    dialogueopen: false,
    loading: true,
    bioDialogOpen: false,
    preferencesActive: false,
    preferenceVals: {
      genderPrefs: ['Men'],
      location: '',
      ageRange: {min: 0, max: 0}
    }
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

  handleBioToggle = () => {
    this.setState({
      bioDialogOpen: !this.state.bioDialogOpen
    })
  }

  ageSlider = (event) => {
    this.setState({
      preferenceVals: {
        genderPrefs: this.state.preferenceVals.genderPrefs,
        location: this.state.preferenceVals.location, 
        ageRange: {min: event.min, max: event.max}
      } 
    })
  }


  fetchUserProfile = (email) => {
    return fetch(`http://localhost:3000/api/user/profile/${email}`)
      .then(buffer => buffer.json())
      .then(userProfile => {
        this.setState({
          userProfile: userProfile,
          loading: false,
            preferenceVals: {
              genderPrefs: userProfile.GenderPreference,
              location: userProfile.Area,
              ageRange: {min: userProfile.AgeRange[0].min, max: userProfile.AgeRange[0].max}
            }
          })
      })
  }

  toggleEditing = event => {
    this.setState({
      preferencesActive: !this.state.preferencesActive
    })
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
                  <img className="profilePic" src="https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170" alt="Edd Shearan!" />
                </object>
              </center>
              <i onClick={this.handleDialogueToggle} className="material-icons" id="picBuild" >build</i>
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
                <div id="bioBuild"><i onClick={this.handleBioToggle} className="material-icons">build</i></div>
              </div>
            </article>
            <p className="userEmail">{this.state.userProfile.Email}</p>

            <Drawer open={this.state.draweropen}>
              <MenuItem className="aboutLabel" style={{ color: '#1db954' }}><strong>About</strong><i id="menuBuild" onClick={this.toggleEditing} className="material-icons">build</i></MenuItem>
              <MenuItem><strong>Gender</strong> </MenuItem>
              <MenuItem>{this.state.userProfile.Gender}</MenuItem>
              <Divider />
              <p><strong>Gender Preference</strong></p>
              {!this.state.preferencesActive ? (
                <MenuItem>{this.state.userProfile.GenderPreference.reduce((acc, item) => {
                  {
                    acc.push(`${item}`)
                    return acc;
                  }
                }, []).join(' | ')}</MenuItem>

              ) : (
                  <MenuItem>
                    <DropDownMenu selectionRenderer={this.cb} onChange={this.handleChange} multiple='true' value={this.state.preferenceVals.genderPrefs} openImmediately={true}>
                      <MenuItem value="Male" primaryText="Male"></MenuItem>
                      <MenuItem value="Female" primaryText="Female"></MenuItem>
                    </DropDownMenu>
                  </MenuItem>
                )}

              <p><strong>Age Range</strong></p>
              {!this.state.preferencesActive ? (
            <AgeSlider disabled={true} action={this.ageSlider.bind(this)} />
          ) : (
              <AgeSlider disabled={false} action={this.ageSlider.bind(this)} />
          )}
              <Divider />
              <MenuItem><strong> Location</strong> </MenuItem>
              {!this.state.preferencesActive ? (
                <MenuItem>{this.state.userProfile.Area}</MenuItem>
              ) : (
                <div className="drawerInput">
                    <TextField defaultValue={this.state.userProfile.Area} onChange={this.drawerInput}></TextField>
                    <RaisedButton label="Save" onClick={this.saveDetails}></RaisedButton>
                  </div>
                )}
            </Drawer>

            <PictureDialog handleDialogueToggle={this.handleDialogueToggle} dialogueopen={this.state.dialogueopen} picture={this.state.userProfile.picture} submitPic={this.submitPic} />
            <BioDialog oldBio={this.state.userProfile.Bio} handleBioToggle={this.handleBioToggle} dialogueopen={this.state.bioDialogOpen} submitBio={this.submitBio}></BioDialog>
          </div>
        </div>
      )
  }

  drawerInput = (event) => {
    this.setState({
      preferenceVals: {
        location: event.target.value,
        genderPrefs: this.state.preferenceVals.genderPrefs,
        ageRange: this.state.preferenceVals.ageRange
      }
    })
  }

  handleChange = (event, index, value) => {
    this.setState({
      preferenceVals: {
        genderPrefs: value,
        location: this.state.preferenceVals.location,
        ageRange: this.state.preferenceVals.ageRange
      }
    })
  }

  submitPic = (url) => {
    fetch(`http://localhost:3000/api/user/profile/picture/${this.props.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        url: url
      })
    })
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          userProfile: res,
          dialogueopen: false
        })
      })
  }

  submitBio = (bio) => {
    fetch(`http://localhost:3000/api/user/profile/bio/${this.props.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        bio: bio
      })
    })
      .then(buffer => buffer.json())
      .then(profile => {
        this.setState({
          userProfile: profile,
          bioDialogOpen: false
        })
      })
  }

  saveDetails = () => {
    console.log(this.state.preferenceVals)
    if (this.state.preferenceVals.genderPrefs.length === 0) return
    const location = this.state.preferenceVals.location || this.state.userProfile.Area
    fetch(`http://localhost:3000/api/user/profile/preferences/${this.props.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        genderPrefs: this.state.preferenceVals.genderPrefs,
        location: location,
        ageRange: this.state.preferenceVals.ageRange
      })
    })
      .then(buffer => buffer.json())
      .then(profile => {
        console.log(profile)
        this.setState({
          userProfile: profile,
          preferencesActive: false
        })
      })
  }
}

export default Profile;
