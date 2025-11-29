import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser, isAdmin } from "../services/api";
import { getCartItemCount } from "../services/cartService";

function Navigation({ 
  searchTerm = "", 
  setSearchTerm = null, 
  selectedCategory = "all", 
  setSelectedCategory = null, 
  categories = [] 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = isAdmin();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showSearch = location.pathname === "/service" && setSearchTerm && setSelectedCategory;

  // Update cart count
  React.useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(getCartItemCount());
    };
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
              ShopHouse
            </span>
          </Link>

          {/* Search and Category - Only on Service page */}
          {showSearch && (
            <div className="hidden lg:flex items-center space-x-2 flex-1 min-w-0 mx-2">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="🔍 Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
              >
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0 whitespace-nowrap">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                isActive("/")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/service"
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                isActive("/service")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                isActive("/about")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              About
            </Link>
            {admin && (
              <Link
                to="/add-item"
                className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                  isActive("/add-item")
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                Add Product
              </Link>
            )}
            <Link
              to="/service/registration"
              className="relative flex items-center space-x-1 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-md hover:shadow-lg text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden xl:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/service/registration"
              className="relative flex items-center space-x-1 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-fade-in">
            {/* Search and Category in Mobile Menu */}
            {showSearch && (
              <div className="px-4 space-y-2 pb-2 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                  />
                  <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all"
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/service"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/service")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/about")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              About
            </Link>
            {admin && (
              <Link
                to="/add-item"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/add-item")
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                Add Product
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

