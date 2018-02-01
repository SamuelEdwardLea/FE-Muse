import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
        this.state = {open: false};
    // this.state = {open: true};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.swipe === 'rejection') {
      this.handleToggle()
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {

    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          containerStyle={{height: '300px', marginTop: '25vh', borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}
          >
          <br /> <br /> <br /> <br /> <br /> <br /> 
          <MenuItem onClick={this.handleClose}><img src="https://image.flaticon.com/icons/svg/70/70485.svg"/></MenuItem>
        </Drawer>
      </div>
    );



    

  }
}