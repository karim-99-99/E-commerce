import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Service">Service</Link>
      </nav>
      <h1>Shop House</h1>
      <p> what ever you wish you will find in our store</p>
      <img
        src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
        alt="e-commerce photo"
      />
        <Link to="/Service">View Items</Link>
        <Link to="/AddItem">Add Your Item</Link>

        </div>
  );
}

export default Home;
