import React from 'react'
import './incoming.css'
import './carousel.css'
import AliceCarousel from 'react-alice-carousel';
import Avatar from 'material-ui/Avatar';
import PlayWidget from 'react-spotify-widgets';
import Paper from 'material-ui/Paper';
import ListItem from 'material-ui/List/ListItem';
import { Collapse } from 'react-collapse';
import ReactTag from './ReactTag.js'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { NavLink } from 'react-router-dom'
import Toggle from 'material-ui/Toggle';
import randomColor from 'randomcolor';

import './App.css';




import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import ActionVisibility from 'material-ui/svg-icons/action/visibility';

let currentUserTracks = ''

class Incoming extends React.Component {
  state = {
    likedYou: [],
    mutual: [],
    loading: true,
    user: {matchingOn: {tracks: [], artists: [], genres: []}},
    opened: true,
    isOpened: false,
    tracksIsOpened: false,
    artistsIsOpened: false,
    genresIsOpened: false,
    genresDisplay: 'none',
    // slideHeight: 9000
    tracksOpen: false,
    artistsOpen: false,
    genresOpen: false,
    noTracks: 'hidden',
    noArtists: 'hidden'
  }

  componentWillMount() {
    fetch(`http://localhost:3000/api/user/incoming/${this.props.email}`)
      .then(buffer => buffer.json())
      .then(({ likedYou, mutual }) => {
        this.setState({
          likedYou: likedYou,
          mutual: mutual,
          loading: false,
          user: mutual[0]
        })
      })
  }




  displayChanger = (event) => {
    if (this.state.genresDisplay === 'none') {
      this.setState({
        genresDisplay: 'block'
      })
    } else {
      this.setState({
        genresDisplay: 'none'
      })
    }
  }

  tracksToggle = () => {
    if ((this.state.user.matchingOn.tracks.length === 0)&&(this.state.noTracks === 'hidden')) {
      this.setState({noTracks: 'visible'})
    } else if ((this.state.user.matchingOn.tracks.length === 0)&&(this.state.noTracks === 'visible')){
      this.setState({noTracks: 'hidden'})
    } else {
      this.setState({ tracksOpen: !this.state.tracksOpen });
    }
  }


  artistsToggle = () => {
    if ((this.state.user.matchingOn.artists.length === 0)&&(this.state.noArtists === 'hidden')) {
      this.setState({noArtists: 'visible'})
    } else if ((this.state.user.matchingOn.artists.length === 0)&&(this.state.noArtists === 'visible')){
      this.setState({noArtists: 'hidden'})
    } else {
      this.setState({ artistsOpen: !this.state.artistsOpen });
    }
  }


  genresToggle = () => {
    this.setState({ genresOpen: !this.state.genresOpen });
  }


  clickedAvatar = (user) => {
    this.setState({
      user: user
    })
  }

  toggleSlide = () => {
    if (this.state.opened === true) {
      this.setState({
        opened: false
      })
    } else {
      this.setState({
        opened: true
      })
    }
  }

  defaultImg = (event) => {
    event.target.src = "https://lh3.googleusercontent.com/B4Rmc8NPG7fHIGmN65214ppzNGHNa_wuLSSJ6Dz85KJoZ0zlBFnpH16pOJBHpwA0fCs=w170"
  }


  render() {


      let currentGenres = this.state.user.matchingOn.genres



    if (!this.state.user) {
      return (
        <div>
          <p style={{ marginTop: '400px', color: 'rgb(38, 206, 44)', fontWeight: 'bold', fontSize: '20px' }}>Sorry,you've not matched anybody yet!<br /><br /> Why not see some people with good music taste?<br /></p>
          <NavLink to="/"><RaisedButton label="Get swiping!" backgroundColor="rgb(38, 206, 44)" /></NavLink>
        </div>
      )
    }




    const toggleStyles = {
      block: {
        maxWidth: 250,
        margin: 'auto'
      },
      toggle: {
        margin: 'auto'
      },
      thumbOff: {
        backgroundColor: '#ffcccc',
      },
      trackOff: {
        backgroundColor: '#ff9d9d',
      },
      thumbSwitched: {
        backgroundColor: 'red',
      },
      trackSwitched: {
        backgroundColor: '#ff9d9d',
      },
      labelStyle: {
        color: 'red',
        fontFamily: 'sans-serif', fontStyle: 'italic'
      },
    };

    const cloudStyles = {
      large: {
        fontSize: 60,
        fontWeight: 'bold'
      },
      small: {
        opacity: 0.7,
        fontSize: 16
      }
    };




    const { isOpened } = this.state;
    const { tracksIsOpened } = this.state;
    const { artistsIsOpened } = this.state;
    const { genresIsOpened } = this.state;
    const { genresDisplay } = this.state;



    const responsive = {
      0: {
        items: 6
      }
    }

    const paperStyle = {
      position: 'relative',
      // left: '270px',
      height: '100%',
      width: '60vw',
      margin: 20,
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: '25vw 1fr',
      gridTemplateRows: '1fr',
      dp: 8,
      radius: '200px'
    };

    return (
      (!this.state.loading) ? (
        <div className="body" style={{ display: "grid", width: "75vw", height: "40%", gridTemplateColumns: "1fr", gridTemplateRows: "2vh 10vh 2vh 1fr" }}>

          <div className="new-matches" style={{ gridRow: "1", gridColumn: "1" }}></div>

          {this.state.mutual.length ? (
            <div className="carousel-div" style={{ gridRow: "2", gridColumn: "1" }}>
              <AliceCarousel
                startIndex={1}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                responsive={responsive}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
              >
                {this.state.mutual.map(user => (
                  <Avatar
                    src={user.picture}
                    onError={this.defaultImg}
                    size={70}
                    onClick={() => this.clickedAvatar(user)}
                  />
                ))}
              </AliceCarousel>
            </div>
          ) : (null)}
          <div className="gap" style={{ gridRow: "3", gridColumn: "1" }}></div>

          <div className="user-info" style={{ gridRow: "4", gridColumn: "1", margin: 'auto', position: 'relative', bottom: '40px' }}>

            <Paper style={paperStyle} zDepth={5} rounded={false}>


              {/* <button className="submit">{this.state.user.Email}</button> */}

              <div className="paper-column1" style={{ height: '70vh', display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "50% 1.5% 8% 5% 1fr", gridRowGap: "0.85em", paddingTop: '50px' }}>

                <div style={{
                  gridRow: "1", gridColumn: "1",
                  // display:'tableCell',
                  verticalAlign: 'middle',
                  textAlign: 'center'
                }}>





                  <img src={this.state.user.picture} style={{
                    borderRadius: '50%',
                    marginTop: '3vmin',
                    width: '75%',
                    height: 'auto',
                    pointerEvents: 'none', objectFit: 'cover', boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.2), 5px 7px 10px 0 rgba(0, 0, 0, 0.2)'
                  }} />

                </div>

                <div style={{ gridRow: "3", fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "5vmin", margin: "auto" }}>{this.state.user.Name}</div>
                <div style={{ gridRow: "4", fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "3vmin", margin: "auto" }}>{this.state.user.Age}, {this.state.user.Area}</div>
                <div style={{ gridRow: "5", fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: "2vmin" }}>{this.state.user.Bio}</div>
              </div>

              <div className="paper-column2" style={{ height: '70vh', display: "grid", gridTemplateColumns: "30% 1fr", gridTemplateRows: "33% 33% 33%", overflowY: "scroll", maxWidth: '100%',
    overflowX: 'hidden', paddingTop: '40px' }}>




                <div className="tracks-button" style={{ gridColumn: "1", gridRow: "1" }} >

                  <label className="label" style={{ position: "relative", backgroundColor: "white", width: '100%', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4.5vmin", color: "rgba(104, 145, 161, 0.5)" }}>
                    Tracks:
  <RaisedButton
icon={<ActionVisibility />}
                      onClick={this.tracksToggle}
                      buttonStyle={{position: "relative"}}
                      labelStyle={{margin: "auto"}}
                      
                    />
                  </label>
                </div>


                <div className="tracks-dropdown" style={{ gridColumn: "2", gridRow: "1", zIndex: "999"}}>

<h3 style={{visibility: this.state.noTracks, fontStyle: 'italic', color: 'rgba(129, 79, 168, 0.5)', marginTop: '0px', lineHeight: '20px'}}>You don't currently match any tracks with {this.state.user.Name}. Keep listening...</h3>
                
                  <Drawer width={350} openSecondary={true} open={this.state.tracksOpen}
                    containerStyle={{ background: '-webkit-linear-gradient(-45deg, rgba(255, 0, 0, 0.8) 0%, rgba(255,255,0, 1) 100%)', position: 'relative', }}>

{this.state.user.matchingOn.tracks.map((track, i) => (
                        <PlayWidget
                          width={300}
                          height={80}
                          uri={track.songUri}
                          lightTheme={true} />
                      ))}


                  </Drawer>
                </div>







                {/* ------------------------------------------------------------------------------------------------------------------------------------- */}



                <div className="artists-button" style={{ gridColumn: "1", gridRow: "2" }} >

                  <label className="label" style={{ position: "relative", backgroundColor: "white", width: '100%', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4.5vmin", color: "rgba(129, 79, 168, 0.5)" }}>
                    Artists:
                    <RaisedButton
icon={<ActionVisibility />}
                      onClick={this.artistsToggle}
                    />
                  </label>
                </div>


                <div className="artists-dropdown" style={{ gridColumn: "2", gridRow: "2", zIndex: "999", position: "relative", bottom: '50px'}}>

                <h3 style={{visibility: this.state.noArtists, fontStyle: 'italic', color: 'rgba(129, 79, 168, 0.5)', marginTop: '0px', lineHeight: '20px'}}>You don't currently match any artists with {this.state.user.Name}. Keep listening...</h3>



                  <Drawer width={350} openSecondary={true} open={this.state.artistsOpen}
                    containerStyle={{ background: '-webkit-linear-gradient(-45deg, rgba(255, 0, 0, 1) 0%, rgba(255,255,0, 1) 100%)', position: 'relative', bottom: '400px' }}>
                    {this.state.user.matchingOn.artists.map((artist, i) => (
                      <p style={{ fontSize: "3vmin" }}>{artist}</p>
                    ))}
                  </Drawer>
                </div>


                {/* ------------------------------------------------------------------------------------------------------------------------------------- */}

                <div className="genres-button" style={{ gridColumn: "1", gridRow: "3" }}>

                  <label className="label" style={{ position: "relative", backgroundColor: "white", width: '100%', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: "4.5vmin", color: 'rgba(85, 183, 160, 0.5)'}}>
                    Genres:
                    <RaisedButton
icon={<ActionVisibility />}
                      onClick={this.genresToggle}
                    />
                  </label>
                </div>


                <div className="genres-dropdown" style={{ gridColumn: "2", gridRow: "3", position: "relative", zIndex: "999" }}>
                  <Drawer width={350} openSecondary={true} open={this.state.genresOpen}
                    containerStyle={{ position: 'relative', backgroundColor: "white", height: '42vh' }}>

                    <p></p>

                    <ReactTag genres={currentGenres} />






                  </Drawer>
                </div>









                {/* ------------------------------------------------------------------------------------------------------------------------------------- */}








              </div>

            </Paper>


          </div>

        </div>

      ) : (<div></div>)
    )
  }
}

// {this.state.user.matchingOn.genres.map(genre => (
//   <p>{genre}</p>
// ))}

// {this.state.user.matchingOn.artists.map(artist => (
//   <p>{artist}</p>
// ))}







export default Incoming



{/* <div className='App' >
{this.state.user.matchingOn.tracks.map((track, i) => (
  <PlayWidget
    width={300}
    height={80}
    uri={track.songUri} />
))}
</div> */}