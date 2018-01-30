import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({
      open: true,
      reason: "clickaway"
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  
  render() {

    return (
      <div>

      <img src="https://image.flaticon.com/icons/svg/222/222765.svg" alt="treble-clef" style={{height: '8vh', width: 'auto', draggable: "false"}} onClick={this.handleClick} />      

        <Snackbar
          open={this.state.open}
          message={this.props.message}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{height: '350px', width: '600px'}}
          style={{ overflowY: "scroll", width: "30vw", backgroundColor: "black", marginLeft: "200px", marginBottom: "100px", textAlign: "center"}}
        />
      </div>
    );
  }
}
