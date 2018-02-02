import React from 'react';
import Hammer from 'hammerjs';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { injectGlobal } from 'styled-components';
import SnackbarExampleSimple from './PlaylistDisplay';

import './App.css';




class Match extends React.Component {

  state = {
    x: 0,
    y: 0,
    upStyle: 'slider'
  }



  componentDidMount() {


    // console.log(this.props.match)
    if (document.getElementById('card') === null) return
    const card = (document.getElementById('card'))
    const swipeableImg = new Hammer(card)
    swipeableImg.on('pan', (ev) => {
      swipeableImg.style = { boxShadow: '0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)' }
      this.setState({ x: ev.deltaX, y: ev.deltaY })
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



  slideUp = (event) => { 
    if (this.state.upStyle === 'slider') {
      this.setState({ upStyle: 'slider.close' }) 
    } else {
      this.setState({ upStyle: 'slider' }) 
    }
  }


  // slideUp () {
  //   name = (event) => {
  //   this.setState({ name: event.target.value });
  // }

  render() {

    let matching1 = '';
    let matching2 = '';
    let matching3 = '';

    if (this.props.match !== undefined) {

      if ((this.props.match.matchingOn.artists.length !== 0)&&(this.props.match.matchingOn.tracks.length !== 0)&&(this.props.match.matchingOn.genres.length !== 0)) {
          matching1 = this.props.match.matchingOn.artists[0];
          matching2 = this.props.match.matchingOn.tracks[0];
          matching3 = this.props.match.matchingOn.genres[0];
      }
    
        if ((this.props.match.matchingOn.artists.length === 0)&&(this.props.match.matchingOn.tracks.length !== 0)&&(this.props.match.matchingOn.genres.length !== 0)) {
            matching1 = this.props.match.matchingOn.genres[0];
            matching2 = this.props.match.matchingOn.tracks[0];
            matching3 = this.props.match.matchingOn.genres[1]
        }
    
          if ((this.props.match.matchingOn.artists.length !== 0)&&(this.props.match.matchingOn.tracks.length === 0)&&(this.props.match.matchingOn.genres.length !== 0)) {
              matching1 = this.props.match.matchingOn.genres[0];
              matching2 = this.props.match.matchingOn.artists[0];
              matching3 = this.props.match.matchingOn.genres[1]
          }
    
          if ((this.props.match.matchingOn.artists.length === 0)&&(this.props.match.matchingOn.tracks.length > 0)&&(this.props.match.matchingOn.genres.length !== 0)) {
              matching1 = this.props.match.matchingOn.tracks[0];
              matching2 = this.props.match.matchingOn.genres[0];
              matching3 = this.props.match.matchingOn.tracks[1]
          }

          if ((this.props.match.matchingOn.artists.length === 0)&&(this.props.match.matchingOn.tracks.length === 0)&&(this.props.match.matchingOn.genres.length !== 0)) {
            matching1 = this.props.match.matchingOn.genres[0];
            matching2 = this.props.match.matchingOn.genres[1];
            matching3 = this.props.match.matchingOn.genres[2]
        }
    
    }




    const paperStyle = {
      position: 'relative',
      // left: '270px',
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
    
    if (!match) {
      return (
        <div>
          <p style={{ color: "black" }}>Sorry, we've ran out of matches, try widening your preferences...</p>
        </div>
      )
    }

    const music = {
      tracks: match.matchingOn.tracks.map(track => <p>{track.trackName}</p>),
      id: match.matchingOn.tracks.map(track => <p>{track.trackUri}</p>),
      artists: match.matchingOn.artists.map(artist => <p>{artist}</p>),
      genres: match.matchingOn.genres.map(genre => <p>{genre}</p>)
    }


    const message = [music.tracks, music.artists, music.genres]
    
    const rateMatch = this.props.rateMatch

    

    return (
      <div>

        <div id='card' style={{ marginTop: "15vh", marginLeft: "8vw", position: 'relative', height: "70vh", width: "62.5vw", transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0px)` }}>

        {/* <div className={this.state.upStyle}> */}
        {/* </div> */}

        
 
  
          <Paper style={paperStyle} zDepth={5} rounded={false}>
          
          {/* <button onClick={() => this.slideUp()}>
            Bring it
          </button> */}

            <div className="profile-image" style={{
              gridColumn: '1/3',
              gridRow: '2/5',
              padding: 'none'              
            }}>


            <img src={match.picture} style={{ 
              position: 'relative',
              bottom: '30px',
              borderRadius: '50%',
              margin: 'auto',
              padding: 'none',
              width: '25vmin',
              height: 'auto',
              pointerEvents: 'none', objectFit: 'cover', boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.2), 5px 7px 10px 0 rgba(0, 0, 0, 0.2)' 
                    }}/>

<h1 style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4vmin", position: 'relative', top: '25px', left: '230px'}}>You matched on...</h1>
            </div>

            <div className="matching-info" style={{gridRow: "5", gridColumn: "1/5"}}>
                    <div style={{display: "grid", height: "100%", gridTemplateRows: "1", gridTemplateColumns: "1fr 1fr 1fr"}}>
                      <div style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4vmin", color: "rgba(104, 145, 161, 0.5)", gridRow: "1", gridColumn: "1"}}>{matching1}</div>
                      <div style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4vmin", color: "rgba(129, 79, 168, 0.5)", gridRow: "1", gridColumn: "2"}}>{matching2}</div>
                      <div style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4vmin", color: 'rgba(85, 183, 160, 0.5)', gridRow: "1", gridColumn: "3"}}>{matching3}</div>
                      .
                </div>
            </div>

            <div className="cresc-left" style={{
              gridColumn: '1',
              gridRow: '6', draggable: "false"
            }}>

              <input type="image" src="https://image.flaticon.com/icons/svg/222/222778.svg" alt="cresc-left" onClick={() => rateMatch('rejection')} style={{ height: '8vh', width: 'auto' }} />
            </div>

            <div className="treble-clef" style={{ gridColumn: '2/4', gridRow: '6' }}>
              <SnackbarExampleSimple message={message} />
            </div>

            <div className="cresc-right" style={{
              gridColumn: '4',
              gridRow: '6'
            }}>
              <input type="image" src="https://image.flaticon.com/icons/svg/222/222777.svg" alt="cresc-right" onClick={() => rateMatch('accepted')} style={{ height: '8vh', width: 'auto', draggable: "false" }} />
            </div>

            <div className="playlist-div" style={{
              gridColumn: '3/5',
              gridRow: '2/5'
            }} />

            <div className="match-name" style={{
               position: 'relative',
               bottom: '20px',
              gridColumn: '3/5',
              gridRow: '2', textAlign: 'center', marginRight: '400px', color: 'black'
            }}>
              <h1 style={{textAlign: 'center',
verticalAlign: 'middle', width: "100%", top: '27px', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "7vmin", color: 'red'}}>{match.Name}</h1>
            </div>

            <div className="match-bio" style={{
              gridColumn: '3/5',
              gridRow: '3/5', textAlign: 'left', marginRight: '400px'
            }}>
              <h2 style={{ textAlign: 'center',
verticalAlign: 'middle', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "5vmin", position: 'relative', bottom: '45px' }}>{match.Age}</h2>
              <h3 style={{textAlign: 'center',
verticalAlign: 'middle', fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: "3vmin" }}></h3>

            </div>

          </Paper>


        </div>
        </div>


    )
  }

  defaultImg = (event) => {
    event.target.src = 'https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170'
  }
}

export default Match