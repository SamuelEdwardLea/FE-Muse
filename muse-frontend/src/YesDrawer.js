import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
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
          containerStyle={{height: '100px', marginTop: '50vh'}}>
          <MenuItem onClick={this.handleClose}>YES!</MenuItem>
        </Drawer>
      </div>
    );
  }
}