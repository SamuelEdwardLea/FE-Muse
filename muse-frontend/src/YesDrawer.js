import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    // this.state = {open: true};
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.swipe === 'accepted') {
      this.handleToggle()
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <Drawer
        openSecondary={true}
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          containerStyle={{height: '300px', marginTop: '25vh', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
          <br /> <br /> <br />
          <MenuItem onClick={this.handleClose}><img src="https://image.flaticon.com/icons/svg/70/70401.svg"/></MenuItem>
        </Drawer>
      </div>
    );
  }
}