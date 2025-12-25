import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import { getProductImages } from "../services/fakeApi";
import { addToCart, getCartItemCount } from "../services/cartService";
import Navigation from "./Navigation";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    loadProduct();
    setCartItemCount(getCartItemCount());
  }, [productId]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItemCount(getCartItemCount());
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts();
      const foundProduct = response.data.find((p) => p.id === parseInt(productId));
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const productImages = product ? getProductImages(product) : [];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setCartItemCount(getCartItemCount());
      setShowAddToCartMessage(true);
      setTimeout(() => setShowAddToCartMessage(false), 2000);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link
            to="/service"
            className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navigation />

      {/* Add to Cart Success Message */}
      {showAddToCartMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>{product.name} added to cart!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={productImages[currentImageIndex] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
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

              {/* Image Counter */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                  Image {currentImageIndex + 1} of {productImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 overflow-hidden transition-all shadow-md hover:shadow-lg ${
                      index === currentImageIndex
                        ? "border-orange-600 ring-4 ring-orange-200 scale-110"
                        : "border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {product.category?.name || "Uncategorized"}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.stock_quantity !== undefined && (
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    product.stock_quantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock_quantity > 0
                      ? `In Stock (${product.stock_quantity} available)`
                      : "Out of Stock"}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, val));
                    }}
                    className="w-20 h-12 text-center font-semibold text-gray-800 border-0 focus:outline-none focus:ring-0"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-12 flex items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">Subtotal: </span>
                  <span className="text-xl font-bold text-orange-600">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity !== undefined && product.stock_quantity === 0}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                product.stock_quantity !== undefined && product.stock_quantity === 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-600 to-orange-500 text-white"
              }`}
            >
              {product.stock_quantity !== undefined && product.stock_quantity === 0
                ? "Out of Stock"
                : "➕ Add to Cart"}
            </button>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-gray-800 mb-4">Product Details</h3>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold text-gray-800">
                  {product.category?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-800">${product.price}</span>
              </div>
              {product.stock_quantity !== undefined && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Stock Available:</span>
                  <span className="font-semibold text-gray-800">
                    {product.stock_quantity} units
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

