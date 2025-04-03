import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Registeration() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!input.name.trim()) {
      newErrors.name = "Please Enter Your Name";
      isValid = false;
    }
    if (!input.email) {
      newErrors.email = "Please Enter Your email";
      isValid = false;
    }
    if (!input.phonenumber) {
      newErrors.phonenumber = "Please Enter Your phonenumber";
      isValid = false;
    }
    if (!input.location) {
      newErrors.location = "Please Enter Your location";
      isValid = false;
    }

    seterror(newErrors);

    if (isValid) {
      // Store data in sessionStorage
      const registrationData = {
        name: input.name,
        email: input.email,
        phonenumber: input.phonenumber,
        location: input.location,
        timestamp: new Date().toISOString(),
      };

      // Get existing registrations or initialize empty array
      const existingRegistrations = JSON.parse(
        sessionStorage.getItem("registrations") || "[]"
      );

      // Add new registrationkjkbkjbkjbkb
      existingRegistrations.push(registrationData);

      // Save back to sessionStorage
      sessionStorage.setItem(
        "registrations",
        JSON.stringify(existingRegistrations)
      );

      // Show success message
      setSuccessMessage("Registration successful!");

      // Clear form
      setinput({
        name: "",
        email: "",
        phonenumber: "",
        location: "",
      });
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/service">Service</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            className="shadow"
            placeholder="Enter your name"
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            className="shadow"
            placeholder="Enter your email"
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>
        <div>
          <input
            type="number"
            name="phonenumber"
            value={input.phonenumber}
            onChange={handleChange}
            className="shadow"
            placeholder="Enter your phone number"
          />
          {error.phonenumber && <p className="error">{error.phonenumber}</p>}
        </div>
        <div>
          <input
            type="text"
            name="location"
            value={input.location}
            onChange={handleChange}
            className="shadow"
            placeholder="Enter your location"
          />
          {error.location && <p className="error">{error.location}</p>}
        </div>
        <button type="submit">Submit</button>
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
}

export default Registeration;
