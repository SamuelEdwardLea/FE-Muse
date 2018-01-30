import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class BioDialog extends React.Component {

  state = {
    currentBio: '',
    oldBio: this.props.oldBio
  }

  componentWillReceiveProps() {
    this.setState({
      oldBio: this.props.oldBio
    })
  }

  render() {
    return (
    <Dialog open={this.props.dialogueopen} onRequestClose={this.props.handleBioToggle} style={{height:' 300px'}}>    
      <TextField defaultValue={this.state.oldBio} onChange={this.updateBio} style={{width: '100%'}} multiLine='true'></TextField> 
      <div className="cancelContainer">
      <RaisedButton label="Cancel" style={{height: '36px'}} onClick={this.props.handleBioToggle}></RaisedButton> 

      <RaisedButton label="Submit" style={{height: '36px'}} onClick={() => this.props.submitBio(this.state.currentBio)}></RaisedButton>
      </div>
    </Dialog>
    )
  }

  updateBio = (event) => {
    this.setState({
      currentBio: event.target.value
    })
  }

}

export default BioDialog