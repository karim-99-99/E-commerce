import React from 'react'
import { Link } from 'react-router-dom'
function About() {
  return (
    <div>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Service">Service</Link>
      </nav>
      <p>About</p>
    </div>
  )
}

export default About
