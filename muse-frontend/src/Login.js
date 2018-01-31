import React from 'react'

const Login = () => {
  return (
    <div>
      <img src={require('./Spotify_Logo_RGB_Green.png')} style={{height:' 30px'}}/>
      <a href="http://localhost:3000/api/authorise"><button>Log in</button></a>
    </div>
  )
}

export default Login