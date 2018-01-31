import React from 'react'
import './incoming.css'
import './carousel.css'
// import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import Avatar from 'material-ui/Avatar';

class Incoming extends React.Component {
  state = {
    likedYou: [],
    mutual: [],
    loading: true,
    user: []
  }

  componentWillMount() {
    fetch(`http://localhost:3000/api/user/incoming/${this.props.email}`)
      .then(buffer => buffer.json())
      .then(({likedYou, mutual}) => {
        // console.log(mutual[0].matchingOn.tracks)
        this.setState({
          likedYou: likedYou,
          mutual: mutual,
          loading: false,
          user: mutual[0]
})
      })
  }

clickedAvatar = (user) => {
  this.setState({
    user: user
  })
}

// UserProfile = () => {
//   this.state.user.length? ( 
//       <div>
//         <p> {this.state.user[0].Name}</p>
//         <p> {this.state.user[0].Bio} </p>
//       ))}
//       </div>
//     )
//     : (null)
//   }


  render() {
    const responsive = {
      0: {
        items: 6
      }
    }
    return (
      (!this.state.loading) ? (
        <div className="body" style={{display: "grid", width: "75vw", marginTop: "100px", gridTemplateColumns: "1fr", gridTemplateRows: "8vh 24vh 8vh 1fr"}}>
      <div className="new-matches" style={{gridRow: "1", gridColumn: "1"}}></div>
      {this.state.mutual.length? ( 
        <div className="carousel-div" style={{gridRow: "2", gridColumn: "1"}}>
      <AliceCarousel
        startIndex = {1}
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
  size={100}
  onClick={() => this.clickedAvatar(user)}
  />
))}
      </AliceCarousel>
      </div>
      ) : (null)}
      <div className="gap" style={{gridRow: "3", gridColumn: "1"}}></div>

      <div className="user-info" style={{gridRow: "4", gridColumn: "1"}}>

 <p>{this.state.user.Name}</p>
      <p>{this.state.user.Age}</p>

      <p>{this.state.user.Bio}</p> 
      <button className="submit">{this.state.user.Email}</button>
      {this.state.user.matchingOn.genres.map(genre => (
        <p>{genre}</p>
      ))}
      
      {this.state.user.matchingOn.artists.map(artist => (
        <p>{artist}</p>
      ))}

        {this.state.user.matchingOn.tracks.map((track, i) => (
        <p key={i}>{track.trackName}</p>
        ))}
      

  </div>
    </div>
) : (<div></div>)
)
}
}

export default Incoming