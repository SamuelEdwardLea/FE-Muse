import React from 'react';
import Hammer from 'hammerjs';
import Paper from 'material-ui/Paper';

import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { injectGlobal } from 'styled-components';

injectGlobal`
@font-face {
font-family: 'CabinSketch-Regular';
font-style: normal;
font-weight: 400;
src: local('../public/fonts/cabin-sketch-v1.02/CabinSketch-Regular.tff'), url('../public/fonts/cabin-sketch-v1.02/CabinSketch-Regular.tff') format('tff');
}
`

class  Match extends React.Component {

  state = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    console.log(this.props.match)
  if (document.getElementById('card') === null) return 
  const card = (document.getElementById('card'))
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

    const paperStyle = {
      position: 'relative',
      left: '270px',
      height: '70vh',
      width: '60vw',
      margin: 20,
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(6, 1fr)',
      dp: 8,
      radius: '200px'
    };

    const match = this.props.match
    const rateMatch = this.props.rateMatch
    if (!match) {
      return (
        <div>
          <p style={{color: "black"}}>Sorry, we've ran out of matches, try widening your preferences...</p>
        </div>
      )
    }
    else return (
    <div>

      
      


    <div id='card' style={{ margin: 'auto', backgroundColor: 'yellow', position: 'absolute', transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0px)`}}>




    <Paper style={paperStyle} zDepth={5} rounded={false}>

      <div className="profile-image" style={{gridColumn: '1/3',
      gridRow: '2/5'}}>

<ListItem
      disabled={true}
      leftAvatar={
        <Avatar
          src={match.picture}
          onError={this.defaultImg} 
          size={240}
          style={{pointerEvents: 'none', marginLeft: '70px', objectFit: 'cover', boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.2), 5px 7px 10px 0 rgba(0, 0, 0, 0.2)'}}

        />
      }
    >
    </ListItem>

      {/* <Paper style={imagePaper} zDepth={2} circle={true}
      elevation={4} style={{overflow:'hidden'}} >
      <img src='https://s-media-cache-ak0.pinimg.com/736x/0e/b7/3f/0eb73fd0a870b647d7757bc3d979cb99--ed-sheeran-memes-random-stuff.jpg' style={{width:'50%', height:'auto'}}/>
      </Paper> */}


      </div>

<div className="cresc-left" style={{gridColumn: '1',
      gridRow: '6', draggable: "false"}}>
 
 <input type="image" src="https://image.flaticon.com/icons/svg/222/222778.svg" alt="cresc-left" onClick={() => rateMatch('rejection')} style={{height: '8vh', width: 'auto'}}   />
      </div>

<div className="treble-clef" style={{gridColumn: '2/4',
      gridRow: '6'}}>
      <img src="https://image.flaticon.com/icons/svg/222/222765.svg" alt="treble-clef" style={{height: '8vh', width: 'auto', draggable: "false"}} />      
      </div>

<div className="cresc-right" style={{gridColumn: '4',
      gridRow: '6'}}>
      <input type="image" src="https://image.flaticon.com/icons/svg/222/222777.svg" alt="cresc-right" onClick={() => rateMatch('accepted')} style={{height: '8vh', width: 'auto', draggable: "false"}}/>
      </div>

<div className="playlist-div" style={{gridColumn: '3/5',
      gridRow: '2/5'}}/>

<div className="match-name" style={{gridColumn: '3/5',
      gridRow: '2', textAlign: 'left'}}>
      <h1 style={{position: 'relative', top: '27px', fontFamily: 'Hind Siliguri,  sans-serif'}}>{match.Name}</h1>
      </div>

<div className="match-bio" style={{gridColumn: '3/5',
      gridRow: '3/5', textAlign: 'left'}}>
      <h2 style={{fontFamily: 'Hind Siliguri, sans-serif'}}>{match.Age}</h2> 
      <h3 style={{marginRight: '50px', fontFamily: 'Hind Siliguri, sans-serif'}}>{match.Bio}</h3>
      </div>

    </Paper>

    
    </div>





    
 


    <p>You both like: </p>
    {match.matchingOn.tracks ? <p>{match.matchingOn.tracks.map(track => <p>{track}</p>)}</p> : null}
    {match.matchingOn.artists ? <p>{match.matchingOn.artists.map(artist => <p>{artist}</p>)}</p> : null}
    {match.matchingOn.genres ? <p>{match.matchingOn.genres.map(genre => <p>{genre}</p>)}</p> : null}  
    </div>

    )
  }

  defaultImg = (event) => {
    event.target.src = 'https://s-media-cache-ak0.pinimg.com/736x/0e/b7/3f/0eb73fd0a870b647d7757bc3d979cb99--ed-sheeran-memes-random-stuff.jpg'
  }
}

export default Match