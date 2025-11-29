import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductImages } from "../services/fakeApi";

function Registeration() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    quantity: "", // ✅ Added number of items
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Get the selected product from sessionStorage
    const productData = sessionStorage.getItem("selectedProduct");
    if (productData) {
      setSelectedProduct(JSON.parse(productData));
      setCurrentImageIndex(0);
    }
  }, []);

  const productImages = selectedProduct ? getProductImages(selectedProduct) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // ✅ Validation
    if (!input.name.trim()) {
      newErrors.name = "Please Enter Your Name";
      isValid = false;
    }
    if (!input.email) {
      newErrors.email = "Please Enter Your Email";
      isValid = false;
    }
    if (!input.phonenumber) {
      newErrors.phonenumber = "Please Enter Your Phone Number";
      isValid = false;
    }
    if (!input.location) {
      newErrors.location = "Please Enter Your Location";
      isValid = false;
    }
    if (!input.quantity || input.quantity <= 0) {
      newErrors.quantity = "Please Enter a Valid Number of Items";
      isValid = false;
    }

    seterror(newErrors);

    if (isValid) {
      // ✅ Store registration data in sessionStorage
      const registrationData = {
        name: input.name,
        email: input.email,
        phonenumber: input.phonenumber,
        location: input.location,
        quantity: input.quantity,
        product: selectedProduct,
        timestamp: new Date().toISOString(),
      };

      const existingRegistrations = JSON.parse(
        sessionStorage.getItem("registrations") || "[]"
      );
      existingRegistrations.push(registrationData);
      sessionStorage.setItem(
        "registrations",
        JSON.stringify(existingRegistrations)
      );

      // ✅ Prepare WhatsApp message
      const message = `Hello, I just registered for the product: ${
        selectedProduct?.name || "N/A"
      }.
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phonenumber}
Location: ${input.location}
Quantity: ${input.quantity}`;

      // ✅ Replace this with your real WhatsApp number (include country code, no '+')
      const whatsappNumber = "+201126811159"; // Example: Egypt (+20)
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // ✅ Open WhatsApp chat
      window.open(whatsappUrl, "_blank");

      setSuccessMessage("Registration successful! Redirecting to WhatsApp...");

      // ✅ Reset form
      setinput({
        name: "",
        email: "",
        phonenumber: "",
        location: "",
        quantity: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                ShopHouse
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/service" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-8 text-center">
          Product Registration
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          {selectedProduct && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Selected Product</h2>
              <div className="flex flex-col items-center">
                {/* Image Display with Navigation */}
                <div className="relative w-full mb-6">
                  <div className="relative h-80 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-inner">
                    <img
                      src={productImages[currentImageIndex] || "/placeholder.png"}
                      alt={selectedProduct.name || "Product"}
                      className="max-h-80 max-w-full object-contain"
                    />
                  </div>
                
                {/* Image Navigation Controls */}
                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev - 1 + productImages.length) % productImages.length
                        )
                      }
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % productImages.length
                        )
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                  {/* Image Thumbnail Selector */}
                  {productImages.length > 1 && (
                    <div className="flex gap-3 justify-center mt-4 overflow-x-auto pb-2">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all shadow-md hover:shadow-lg ${
                            index === currentImageIndex
                              ? "border-orange-600 ring-4 ring-orange-200 scale-110"
                              : "border-gray-300 hover:border-orange-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${selectedProduct.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  {productImages.length > 1 && (
                    <div className="text-center text-sm text-gray-500 mt-3 font-medium">
                      Image {currentImageIndex + 1} of {productImages.length}
                    </div>
                  )}
                </div>

                <div className="w-full space-y-4">
                  <h3 className="font-bold text-2xl text-gray-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-3xl font-bold text-green-600">
                        ${selectedProduct.price}
                      </span>
                    </div>
                    <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
                      {selectedProduct.category?.name || "Uncategorized"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter your full name"
                />
                {error.name && (
                  <p className="text-red-500 text-sm mt-1">{error.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter your email"
                />
                {error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  value={input.phonenumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter your phone number"
                />
                {error.phonenumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.phonenumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter your location"
                />
                {error.location && (
                  <p className="text-red-500 text-sm mt-1">{error.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={input.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter number of items"
                  min="1"
                />
                {error.quantity && (
                  <p className="text-red-500 text-sm mt-1">{error.quantity}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mt-6"
              >
                📝 Submit Registration
              </button>

              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
                  <p className="text-green-700 font-medium">{successMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registeration;
