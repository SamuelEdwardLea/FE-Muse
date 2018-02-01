import React, {Component} from 'react'
import Match from './Match';
import NoDrawer from './NoDrawer.js'
import YesDrawer from './YesDrawer.js'

class Matches extends Component {
  state = {
    email: this.props.email,
    matches: [],
    currentMatch: 0,
    loading: true,
    decision: ''
  }

  componentDidMount() {
    if (this.state.email === '') return
    fetch(`http://localhost:3000/api/user/matches/${this.state.email}`)
      .then(buffer => buffer.json())
      .then(matches => {
        // console.log(matches)
        this.setState({matches: matches, loading: false})
      })
  }

  render() {
    // console.log(this.state.matches)
    return (


      <div>
         <NoDrawer swipe={this.state.decision}/>
      <YesDrawer swipe={this.state.decision}/>
  {!this.state.loading ? <Match decision={this.state.decision} rateMatch={this.rateMatch} match={this.state.matches[this.state.currentMatch]}/> : 
        <p>Loading...</p>}
      </div>
    )
  }

  rateMatch = (choice) => {
    console.log(choice)
    return fetch(`http://localhost:3000/api/user/matches/${this.state.email}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        email: this.state.matches[this.state.currentMatch].Email,
        choice: choice
      })
    })
    .then(buffer => {
      this.setState({
        currentMatch: this.state.currentMatch + 1,
        decision: choice
      })      
    })
    .catch(console.log)
  }
}

export default Matches