import React, {Component} from 'react'
import Match from './Match';


class Matches extends Component {
  state = {
    email: 'dj_sam_lea@hotmai.com',
    matches: [],
    currentMatch: 0,
    loading: true
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/user/matches/${this.state.email}`)
      .then(buffer => buffer.json())
      .then(matches => {
        console.log(matches)
        this.setState({matches: matches, loading: false})
      })
  }

  render() {
    console.log(this.state.matches)
    return (
      <div>
  {!this.state.loading ? <Match rateMatch={this.rateMatch} match={this.state.matches[this.state.currentMatch]}/> : 
        <p>Loading...</p>}
      </div>
    )
  }

  rateMatch = (choice) => {
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
      this.setState({currentMatch: this.state.currentMatch + 1})
    })
    .catch(console.log)
  }
}

export default Matches