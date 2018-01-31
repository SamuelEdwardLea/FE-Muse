import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    width: 300,
    textAlign: "left"
};

class DropDownMenuSimpleExample extends React.Component {

    state = {
      value: 'Female'
  }


  handleChange = (event, index, value) => {
  this.setState({value});
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.gender} style={styles} autoWidth={false}>
          <MenuItem value="Male" primaryText="Male" checked={this.genderCheck} />
           <MenuItem value="Female" primaryText="Female" checked={this.genderCheck} />
        </DropDownMenu>
        <br />
      </div>
    );
  }
}

export default DropDownMenuSimpleExample;