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




class Incoming extends React.Component {
  state = {
    likedYou: [],
    mutual: [],
    loading: true,
    user: [],
    opened: true,
    isOpened: false,
    tracksIsOpened: false,
    artistsIsOpened: false,
    genresIsOpened: false,
    genresDisplay: 'none'
    // slideHeight: 9000
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
  


  clickedAvatar = (user) => {
    this.setState({
      user: user
    })
  }

  toggleSlide = () => {
    console.log('BANG')
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


  render() {

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
        <div className="body" style={{ display: "grid", width: "75vw", height: "auto", gridTemplateColumns: "1fr", gridTemplateRows: "2vh 10vh 2vh 1fr" }}>

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

          <div className="user-info" style={{ gridRow: "4", gridColumn: "1", margin: 'auto' }}>

            <Paper style={paperStyle} zDepth={5} rounded={false}>


              {/* <button className="submit">{this.state.user.Email}</button> */}

              <div className="paper-column1" style={{ height: '70vh', display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "50% 8% 5% 1fr" }}>

                <div style={{ gridRow: "1" }}>
                  <ListItem
                    disabled={true}
                    style={{ objectFit: 'fill' }}
                    leftAvatar={
                      <Avatar
                        src={this.state.user.picture}
                        onError={this.defaultImg}
                        size={200}
                        style={{
                          pointerEvents: 'none', display: 'block', objectFit: 'cover', boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.2), 5px 7px 10px 0 rgba(0, 0, 0, 0.2)'
                        }} />
                    }>
                  </ListItem>
                </div>

                <div style={{ gridRow: "2" }}>{this.state.user.Name}</div>
                <div style={{ gridRow: "3" }}>{this.state.user.Age}, {this.state.user.Area}</div>
                <div style={{ gridRow: "4" }}>{this.state.user.Bio}</div>
              </div>





              <div className="paper-column2" style={{ height: '70vh', display: "grid", gridTemplateColumns: "30% 1fr", gridTemplateRows: "33% 33% 33%", overflow: "scroll" }}>

                  <div className="tracks-button" style={{ gridColumn: "1", gridRow: "1" }} >
                    <label className="label" style={{ position: "relative", backgroundColor: "white", width: '100%' }}>
                      Tracks:
            <input className="input"
                        type="checkbox"
                        checked={tracksIsOpened}
                        onChange={({ target: { checked } }) => this.setState({ tracksIsOpened: checked })} />
                    </label>
                  </div>

                  <div className="tracks-dropdown" style={{ gridColumn: "2", gridRow: "1" }}>
                    <Collapse isOpened={tracksIsOpened} style={{ overflow: 'scroll', backgroundColor: "white" }}>
                      <div className="blob"> {/* DON'T GIVE THIS A HEIGHT */}
                        {this.state.user.matchingOn.tracks.map((track, i) => (
                          <PlayWidget
                            width={300}
                            height={80}
                            uri={track.songUri}
                            lightTheme={true} />
                        ))}
                      </div>
                    </Collapse>
                </div>

                {/* ------------------------------------------------------------------------------------------------------------------------------------- */}



                <div className="artists-button" style={{ gridColumn: "1", gridRow: "2" }} >

                    <label className="label">
                      Artists:
<input className="input"
                        type="checkbox"
                        checked={artistsIsOpened}
                        onChange={({ target: { checked } }) => this.setState({ artistsIsOpened: checked })} />
                    </label>
                  </div>


                  <div className="artists-dropdown" style={{ gridColumn: "2", gridRow: "2", zIndex: "999" }}>
                  <Collapse isOpened={artistsIsOpened} style={{ overflow: 'scroll', backgroundColor: "white"}}>
                    <div className="blob" style={{backgroundColor: "blue"}}> {/* DON'T GIVE THIS A HEIGHT */}

                 
                    {this.state.user.matchingOn.artists.map((artist, i) => (
                         <p>{artist}</p>
                        ))}

                    </div>
                  </Collapse>
                </div>


                {/* ------------------------------------------------------------------------------------------------------------------------------------- */}



                  <div className="genres -button" style={{ gridColumn: "1", gridRow: "3" }}>
                    <label className="label">
                      Genres:
<input className="input"
                        type="checkbox"
                        checked={genresIsOpened}
                        onChange={this.displayChanger} />
                    </label>
                  </div>

                  
                  <div className="genres-dropdown" style={{ gridColumn: "2", gridRow: "3", position: "relative" }}>
                  <Collapse isOpened={genresIsOpened} style={{ overflow: 'scroll', backgroundColor: "white" }}>
                    <div className="blob" style={{backgroundColor: "grey", display: this.state.genresDisplay}}> {/* DON'T GIVE THIS A HEIGHT */}

                      HELLO?
                      <ReactTag genres={this.state.mutual} />
                    
                    </div>

                  </Collapse>
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