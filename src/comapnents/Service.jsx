import React from 'react'
import { Link } from 'react-router-dom'
function Service() {
  return (
    <div>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Service">Service</Link>
        <Link to= "/Service/Registeration">Registeration</Link>
      </nav>
      <p>service</p>
    </div>
  )
}

export default Service
