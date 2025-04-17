import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UploadPhoto from "../Features/UploadPhoto";
function AddItem() {
  const [input, setinput] = useState({
    name: "",
    description: "",
    category: "",
    Photo: "",
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;
    if (!input.name.trim()) {
      newErrors.name = "Please Enter Your Name";
      isValid = false;
    }
    if (!input.description) {
      newErrors.Describtion = "Please Enter Your Describtion";
      isValid = false;
    }
    if (!input.category) {
      newErrors.category = "Please Enter Your category";
      isValid = false;
    }
    if (!input.Photo) {
      newErrors.Photo = "Please Enter Your Photo";
      isValid = false;
    }
    seterror(newErrors);
    if (isValid) {
      const registrationData = {
        name: input.name,
        Describtion: input.Describtion,
        category: input.category,
        Photo: input.Photo,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
      );

      setSuccessMessage("Data has been successfully stored in sessionStorage.");
      setinput({
        name: "",
        Describtion: "",
        categary: "",
        Photo: "",
      });
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setinput((prevstate) => ({ ...prevstate, [name]: value }));
  };
  return (
    <div>
      <nav className="grid grid-cols-3 w-80 ml-auto text-orange-600 text-xl font-semibold ">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/service">Service</Link>
        <Link to="/about">About</Link>
      </nav>

      <form
        onSubmit={handlesubmit}
        className="flex flex-col w-3/5 mt-10 gap-4 mx-auto"
      >
        <label htmlFor="name" className=" font-semibold ">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handlechange}
          placeholder="Name"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        {error?.name && <p> {error.name}</p>}
        <label htmlFor="Describtion" className=" font-semibold ">
          Describtion
        </label>
        <textarea
          type="text"
          name="description"
          value={input.Describtion}
          onChange={handlechange}
          placeholder="Describtion"
          className="border-2 border-gray-300 rounded-md p-2"

        />
        {error?.Describtion && <p> {error.Describtion}</p>}
        <label htmlFor="category" className=" font-semibold ">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={input.category}
          onChange={handlechange}
          placeholder="categary"
          className="border-2 border-gray-300 rounded-md p-2"

        />
        {error.category && <p> {error.category}</p>}
        <label className=" font-semibold ">Upload your Photo</label>
      <UploadPhoto />
        {error?.Photo && <p> {error.Photo}</p>}
        <button type="submit" className="border-2 border-orange-500 bg-orange-500 rounded-md p-2 font-semibold">Submit</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default AddItem;
