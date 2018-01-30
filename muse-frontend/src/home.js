import React, { Component } from 'react';
import Matches from './Matches';


class Home extends Component {
  

  componentDidMount = () => {
    console.log(this.props, 'home');
    let currentEmail = this.props.location.search.slice(7);
    this.props.getEmail(currentEmail);
  }

  render() {
    
    return (
      <div>
      <Matches email={this.props.email}/>
      
      </div>

    )
  }
}

export default Home;
