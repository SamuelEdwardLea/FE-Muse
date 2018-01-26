import React from 'react'

const Match = ({match, rateMatch}) => {
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
  <object data={match.picture}><img src={'https://s-media-cache-ak0.pinimg.com/736x/0e/b7/3f/0eb73fd0a870b647d7757bc3d979cb99--ed-sheeran-memes-random-stuff.jpg'}></img></object>
  <p>{match.Bio}</p>
  <p>You both like: </p>
  {match.matchingOn.tracks ? <p>{match.matchingOn.tracks.map(track => <p>{track}</p>)}</p> : null}
  {match.matchingOn.artists ? <p>{match.matchingOn.artists.map(artist => <p>{artist}</p>)}</p> : null}
  {match.matchingOn.genres ? <p>{match.matchingOn.genres.map(genre => <p>{genre}</p>)}</p> : null}  
  <button id="rejectButton"onClick={() => rateMatch('rejection')}>Nay!</button><button id="approveButton" onClick={() => rateMatch('accepted')}>Yay!</button>
  </div>
  )
}

export default Match