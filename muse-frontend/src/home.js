import React, { Component } from 'react';



class Home extends Component {

  componentDidMount = () => {
    console.log(this.props);
    let currentEmail = this.props.location.search.slice(7);
    this.props.getEmail(currentEmail);
  }

  render() {
    
    return (
      <h1>This is the Home Page!</h1>
    )
  }
}

export default Home;
