import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <ul className="nav-bar">
    <li  id="navImg"><img  style={{height: '50px', width: '50px', display: 'inline-block'}}src={require("./Spotify_Icon_RGB_Green.png")} alt="Spotify" /></li>
    <li className="navItem"><NavLink exact to ="/profile">Profile</NavLink></li>
    <li className="navItem"><NavLink exact to ="/incoming">Matches</NavLink></li>                                                                                       
    <li className="navItem"><NavLink exact to ="/" style={{marginLeft: "33vw"}}><img src="https://image.flaticon.com/icons/svg/89/89560.svg" style={{height: '10vh', width: 'auto'}}></img></NavLink></li>
    </ul>
  )
}

export default Navbar