import React from 'react'
import Hammer from 'hammerjs'

class  Match extends React.Component {

  state = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    const card = document.getElementById('card')
    const swipeableImg = new Hammer(card)
    swipeableImg.on('pan', (ev) => {
      swipeableImg.style = {boxShadow: '0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)'}
      this.setState({x: ev.deltaX, y: ev.deltaY})
    })
    swipeableImg.on('panend', () => {
      const getDirection = () => {
        switch (true) {
          case (this.state.x < -300): return 'Left'
          case (this.state.x > 300): return 'Right'
          default: return false
        }
      }

      if (getDirection() === 'Left') this.props.rateMatch('rejection')
      if (getDirection() === 'Right') this.props.rateMatch('accepted')
      
      this.setState({
        x: 0,
        y: 0
      })
    })

    this.setState({
      x: 0,
      y: 0
    })
  }

  render() {
    const match = this.props.match
    const rateMatch = this.props.rateMatch
    if (!match) {
      return (
        <div>
          <p>Sorry, we've ran out of matches, try widening your preferences...</p>
        </div>
      )
    }
    else return (
    <div>
    <p>{match.Name}</p>
    {/* <object data={match.picture} ><img src={'https://s-media-cache-ak0.pinimg.com/736x/0e/b7/3f/0eb73fd0a870b647d7757bc3d979cb99--ed-sheeran-memes-random-stuff.jpg'} id='card' style={ {transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0px)`}}></img></object> */}
    <img src={match.picture} id='card' style={ {transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0px)`}} onError={this.defaultImg}></img> 
    <p>{match.Bio}</p>
    <p>You both like: </p>
    {match.matchingOn.tracks ? <p>{match.matchingOn.tracks.map(track => <p>{track}</p>)}</p> : null}
    {match.matchingOn.artists ? <p>{match.matchingOn.artists.map(artist => <p>{artist}</p>)}</p> : null}
    {match.matchingOn.genres ? <p>{match.matchingOn.genres.map(genre => <p>{genre}</p>)}</p> : null}  
    <button id="rejectButton"onClick={() => rateMatch('rejection')}>Nay!</button><button id="approveButton" onClick={() => rateMatch('accepted')}>Yay!</button>
    </div>
    )
  }

  defaultImg = (event) => {
    event.target.src = 'https://s-media-cache-ak0.pinimg.com/736x/0e/b7/3f/0eb73fd0a870b647d7757bc3d979cb99--ed-sheeran-memes-random-stuff.jpg'
  }
}

export default Match