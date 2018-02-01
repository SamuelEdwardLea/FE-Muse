import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

  return (
    <div>
      <div className="nav-bar" style={{display: "grid", gridTemplateColumns: "repeat(10, 1fr)", alignSelf: "center" }}>
        <div style={{ gridColumn: "1", marginLeft: "2vw", marginRight: "9vw", marginTop: "1vh" }}>
          <img style={{ height: '50px', width: '50px', display: 'inline-block' }} src={require("./Spotify_Icon_RGB_Green.png")} alt="Spotify" />
        </div>
        <NavLink exact to="/profile" style={{ gridColumn: "2", margin: "auto"}}><img src="https://image.flaticon.com/icons/svg/118/118781.svg" style={{ height: '40px', width: "auto" }}></img></NavLink>
        <NavLink exact to="/" style={{ gridColumn: "5/ span 2", margin: "auto" }}><img src="https://image.flaticon.com/icons/svg/89/89560.svg" style={{ height: '40px', width: 'auto' }}></img></NavLink>
        <NavLink exact to="/incoming" style={{ gridColumn: "9", margin: "auto" }}><img src="https://image.flaticon.com/icons/svg/535/535285.svg" style={{ height: '40px', width: "auto" }}></img></NavLink>
      </div>
    </div>
  )
}

export default Navbar