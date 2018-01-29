import React, { Component } from 'react';
import Matches from './Matches'


class Home extends Component {

  componentDidMount = () => {
    console.log(this.props);
    let currentEmail = this.props.location.search.slice(7);
    this.props.getEmail(currentEmail);
  }

  render() {
    
    return (
      <div>
      <Matches/>
      <h1>This is the Home Page!</h1>
      </div>
    )
  }
}

export default Home;
