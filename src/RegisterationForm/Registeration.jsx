import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductImages } from "../services/fakeApi";
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  getCartTotal,
  clearCart,
  getCartItemCount,
} from "../services/cartService";
import ConfirmModal from "../components/ConfirmModal";
import Navigation from "../components/Navigation";

function Registeration() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
  });
  const [error, seterror] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    // Load cart items
    const items = getCartItems();
    setCartItems(items);
    
    // If no items in cart, check for legacy selectedProduct
    if (items.length === 0) {
      const productData = sessionStorage.getItem("selectedProduct");
      if (productData) {
        const product = JSON.parse(productData);
        const items = [{ product, quantity: 1, addedAt: new Date().toISOString() }];
        setCartItems(items);
        // Clear legacy storage
        sessionStorage.removeItem("selectedProduct");
      }
    }
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const items = getCartItems();
      setCartItems(items);
      // Reset selection if current item was removed
      if (selectedProductIndex >= items.length) {
        setSelectedProductIndex(Math.max(0, items.length - 1));
      }
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [selectedProductIndex]);

  const selectedCartItem = cartItems[selectedProductIndex];
  const selectedProduct = selectedCartItem?.product;
  const productImages = selectedProduct ? getProductImages(selectedProduct) : [];

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    const items = getCartItems();
    setCartItems(items);
    if (selectedProductIndex >= items.length) {
      setSelectedProductIndex(Math.max(0, items.length - 1));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // Handle remove item click
  const handleRemoveItemClick = (productId, productName) => {
    setItemToDelete({ id: productId, name: productName });
    setShowDeleteModal(true);
  };

  const handleConfirmRemove = () => {
    if (itemToDelete) {
      handleRemoveItem(itemToDelete.id);
    }
  };

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
    if (cartItems.length === 0) {
      newErrors.cart = "Please add at least one item to your cart";
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
        cartItems: cartItems,
        totalAmount: getCartTotal(),
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
      const itemsList = cartItems
        .map((item) => `- ${item.product.name} (Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`)
        .join("\n");
      
      const message = `Hello, I would like to place an order:

Name: ${input.name}
Email: ${input.email}
Phone: ${input.phonenumber}
Location: ${input.location}

Order Items:
${itemsList}

Total Amount: $${getCartTotal().toFixed(2)}`;

      // ✅ Replace this with your real WhatsApp number (include country code, no '+')
      const whatsappNumber = "+201126811159"; // Example: Egypt (+20)
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // ✅ Open WhatsApp chat
      window.open(whatsappUrl, "_blank");

      setSuccessMessage("Registration successful! Redirecting to WhatsApp...");

      // ✅ Reset form and clear cart
      setinput({
        name: "",
        email: "",
        phonenumber: "",
        location: "",
      });
      clearCart();
      setCartItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-8 text-center">
          Order Registration
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart to continue</p>
            <Link
              to="/service"
              className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-between">
                  <span>Cart Items</span>
                  <span className="text-lg text-orange-600">({cartItems.length})</span>
                </h2>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.product.id}
                      className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                        index === selectedProductIndex
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                      onClick={() => {
                        setSelectedProductIndex(index);
                        setCurrentImageIndex(0);
                      }}
                    >
                      <div className="flex gap-3">
                        <img
                          src={getProductImages(item.product)[0] || "/placeholder.png"}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-gray-800 truncate mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-orange-600 font-semibold mb-2">
                            ${item.product.price}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.product.id, item.quantity - 1);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.product.id, item.quantity + 1);
                              }}
                              className="w-7 h-7 flex items-center justify-center bg-orange-200 hover:bg-orange-300 rounded-full text-orange-700 font-bold transition-colors"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItemClick(item.product.id, item.product.name);
                              }}
                              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors"
                              title="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Total Items:</span>
                    <span className="font-bold text-gray-800">{getCartItemCount()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details & Form */}
            <div className="lg:col-span-2 space-y-8">
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

              {error.cart && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700 font-medium">{error.cart}</p>
                </div>
              )}

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
        )}

        {/* Remove Item Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setItemToDelete(null);
          }}
          onConfirm={handleConfirmRemove}
          title="Remove from Cart"
          message={itemToDelete ? `Are you really sure you want to remove "${itemToDelete.name}" from your cart?` : ""}
          confirmText="Remove"
          cancelText="Cancel"
          type="warning"
        />
      </div>
    </div>
  );
}

export default Registeration;
