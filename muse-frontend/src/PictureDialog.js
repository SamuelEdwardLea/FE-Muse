import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './PictureDialog.css'

class PictureDialog extends React.Component {

  state = {
    url: '',
    currentPic: this.props.picture
  }

  render() {
    return (
    <Dialog open={this.props.dialogueopen} onRequestClose={this.props.handleDialogueToggle}>

      <div className="diaTop">
      <TextField hintText='Enter your picture address here.' onChange={this.enterURL} style={{width: '100%'}}></TextField>
      </div>
      <div className="diaBottom">
      <img src={this.state.url} onError={this.defaultPic} style={{height: '170px', display: 'block'}}/>
      <div className="cancelContainer">
      <RaisedButton label="Cancel" style={{height: '36px'}} onClick={this.props.handleDialogueToggle}></RaisedButton> 
      </div>
      <div className="submitContainer">
      <RaisedButton label="Submit" style={{height: '36px'}} onClick={() => this.props.submitPic(this.state.url)}></RaisedButton>
      </div>
      </div>         
    </Dialog>
    )
  }

  defaultPic = (event) => {
    event.persist()
    return fetch(this.state.currentPic)
      .then(res => {
        console.log(res)
        event.target.src=this.state.currentPic
      })
      .catch(() => event.target.src="https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170")
  }

  enterURL = (event) => {
    this.setState({
      url: event.target.value
    })
  }
}

export default PictureDialog