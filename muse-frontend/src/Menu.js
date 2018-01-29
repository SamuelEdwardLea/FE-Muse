import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 400,
  },
  genderPrefs: {
    width: 400
  }
};

// this.props.action



export default class DropDownMenuSimpleExample extends React.Component {

  componentDidMount = () => {
    this.setState({
      menChecked: false,
      womenChecked: false
    })
  }
 

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  state = {
    menChecked: true,
    womenChecked: true
  }

// componentWillReceiveProps(nextProps) {
//   console.log(nextProps);
//   console.log(this.state.menChecked)
//   if (!this.state.menChecked) {
//     this.setState({
//       menChecked: true
//     })
//   } else {
//     this.setState({
//       menChecked: false
//     })
//   }
// }


menCheck = (event, props) => {
  if (this.state.menChecked === false) {
    this.setState({menChecked: true}) 
  } else {this.setState({menChecked: false}) }
}

womenCheck = (event, props) => {
  if (this.state.womenChecked === false) {
    this.setState({womenChecked: true}) 
  } else {this.setState({womenChecked: false}) }
}

  

  // handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange} style={styles.genderPrefs} autoWidth={false}>
          <MenuItem value={1} primaryText="Men" onClick={
            props => {
              this.menCheck();
              this.props.action(props);
            }
          }
           checked={this.state.menChecked}/>

          <MenuItem value={2} primaryText="Women" onClick={
            props => {
              this.womenCheck();
              this.props.action(props);
            }
          }
          checked={this.state.womenChecked}/>
        </DropDownMenu>
        <br />
      </div>
    );
  }
}