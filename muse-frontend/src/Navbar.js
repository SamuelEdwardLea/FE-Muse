import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <ul className="nav-bar">
    <li  id="navImg"><img  style={{height: '50px', width: '50px', display: 'inline-block'}}src={require("./Spotify_Icon_RGB_Green.png")}/></li>
    <li className="navItem"><NavLink exact to ="/profile">Me</NavLink></li>
    <li className="navItem"><NavLink exact to ="/home">Home</NavLink></li>
    </ul>
  )
}

export default Navbar