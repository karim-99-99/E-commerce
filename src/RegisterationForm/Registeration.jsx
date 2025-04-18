import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Registeration() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Get the selected product from sessionStorage
    const productData = sessionStorage.getItem("selectedProduct");
    if (productData) {
      setSelectedProduct(JSON.parse(productData));
    }
  }, []);

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
        product: selectedProduct,
        timestamp: new Date().toISOString(),
      };

      // Get existing registrations or initialize empty array
      const existingRegistrations = JSON.parse(
        sessionStorage.getItem("registrations") || "[]"
      );

      // Add new registration
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
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex justify-end gap-10 mb-8">
        <Link to="/" className="text-orange-600 font-semibold">
          Home
        </Link>
        <Link to="/service" className="text-orange-600 font-semibold">
          Service
        </Link>
        <Link to="/about" className="text-orange-600 font-semibold">
          About
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Details */}
        {selectedProduct && (
          <div className="border rounded-lg p-4 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">Selected Product</h2>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-48 w-auto object-contain mb-4"
              />
              <h3 className="font-bold text-lg mb-2">
                {selectedProduct.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {selectedProduct.description}
              </p>
              <div className="flex justify-between w-full mt-2">
                <span className="font-bold text-green-600">
                  ${selectedProduct.price}
                </span>
                <span className="text-gray-500">
                  {selectedProduct.category}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="border rounded-lg p-6 bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your name"
              />
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your email"
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="number"
                name="phonenumber"
                value={input.phonenumber}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your phone number"
              />
              {error.phonenumber && (
                <p className="text-red-500 text-sm mt-1">{error.phonenumber}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow"
                placeholder="Enter your location"
              />
              {error.location && (
                <p className="text-red-500 text-sm mt-1">{error.location}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition-colors"
            >
              Submit
            </button>
            {successMessage && (
              <p className="text-green-500 text-center mt-2">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registeration;
