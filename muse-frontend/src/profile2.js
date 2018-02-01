render() {
    return this.state.loading ? (<p> loading.... </p>) :
      (
        <div className="container">
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
              <Divider />
              <MenuItem>{this.state.userProfile.Gender}</MenuItem>
              <MenuItem><strong>Gender Preference</strong></MenuItem>
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
                      <MenuItem value="Men" primaryText="Men"></MenuItem>
                      <MenuItem value="Women" primaryText="Women"></MenuItem>
                    </DropDownMenu>
                  </MenuItem>
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
        </div>
      )
  }