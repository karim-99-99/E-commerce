import React from "react";
import { Link } from "react-router-dom";
import { logoutUser, isAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const admin = isAdmin();
  
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                ShopHouse
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/service" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-3">
              <Link 
                to="/service" 
                className="text-gray-700 hover:text-orange-600 text-sm font-medium"
              >
                Products
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-red-600 text-sm font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                Shop
              </span>
              <br />
              <span className="text-gray-800">House</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-light">
              Whatever you wish,
              <br />
              <span className="font-semibold text-orange-600">you will find in our store</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/service"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">🛒 Buy Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              {admin && (
                <Link
                  to="/add-item"
                  className="group relative px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl border-2 border-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-orange-50"
                >
                  <span className="relative z-10">➕ Sell Products</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-delay">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
                alt="e-commerce"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600">Safe and encrypted transactions</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">Premium products only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
