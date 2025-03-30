import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function Registeration() {
    const [input,setinput] = useState({name:"" , email : "" , phonenumber : "" , location: "" })
    const [error , seterror] =useState({});

    const handleChange = (e) => {
        const {name , value} = e.target
       setinput((prevstate) => ({...prevstate , [name] : value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let newErrors = {}
         if (!input.name.trim()) {
            newErrors.name= "Please Enter Your Name"
         }
         if (!input.email) {
            newErrors.email= "Please Enter Your email"
         }
         if (!input.number) {
            newErrors.number= "Please Enter Your number"
         }
         if (!input.location) {
            newErrors.location= "Please Enter Your location"
         }
         seterror(newErrors)
    }
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Service">Service</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        name='name'
        value={input.name}
        onChange={handleChange}
        className='shadow'
        />
        {error.name && <p>{error.name}</p>}
        <input 
        type='email'
        name='email'
        value={input.email}
        onChange={handleChange}
        className='shadow'

        />
        {error.email && <p>{error.email}</p>}
        <input 
        type='tel'
        name='phonenumber'
        value={input.phonenumber}
        onChange={handleChange}
        className='shadow'

        />
        {error.number && <p>{error.number}</p>}
        <input 
        type='text'
        name='location'
        value={input.location}
        onChange={handleChange}
        className='shadow'

        />
        {error.location && <p>{error.location}</p>}
        <button type="submit">Submit</button>

        </form>     
      
    </div>
  )
}

export default Registeration
