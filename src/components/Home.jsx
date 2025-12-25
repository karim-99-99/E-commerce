import React from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../services/api";
import Navigation from "./Navigation";
import e1Image from "../assets/e1.png";

function Home() {
  const admin = isAdmin();
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Navigation />
      
      {/* Background Image with Parallax Effect */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${e1Image})`,
          backgroundAttachment: 'fixed',
          transform: 'scale(1.1)',
          filter: 'brightness(0.7) blur(2px)',
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-br from-orange-900/80 via-orange-800/70 to-orange-900/80 animate-gradient-overlay"></div>
      
      {/* Animated Mesh Gradient Overlay */}
      <div className="fixed inset-0 z-[2] bg-gradient-to-br from-orange-600/30 via-transparent to-orange-400/20 animate-pulse"></div>
      
      {/* Floating Animated Particles/Orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full mix-blend-screen filter blur-3xl animate-blob z-[2]"></div>
      <div className="fixed top-40 right-10 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000 z-[2]"></div>
      <div className="fixed bottom-20 left-1/2 w-80 h-80 bg-orange-200/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000 z-[2]"></div>
      
      {/* Shimmer Effect Overlay */}
      <div className="fixed inset-0 z-[3] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="text-center space-y-8 md:space-y-12 animate-fade-in">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent drop-shadow-2xl animate-gradient-text">
                Shop
              </span>
              <br />
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">House</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed font-light px-4 sm:px-0 drop-shadow-lg max-w-3xl mx-auto">
              Whatever you wish,
              <br />
              <span className="font-bold text-orange-200 drop-shadow-xl">you will find in our store</span>
            </p>
          </div>
          
          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-6 md:pt-8 px-4">
            <Link
              to="/service"
              className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden active:scale-95 backdrop-blur-sm border-2 border-white/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-2xl animate-bounce">🛒</span>
                <span>Buy Products</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </Link>
            {admin && (
              <Link
                to="/add-item"
                className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white/95 backdrop-blur-md text-orange-600 font-bold text-base sm:text-lg md:text-xl rounded-2xl border-2 border-white/30 shadow-2xl hover:shadow-white/50 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:bg-white active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-2xl">➕</span>
                  <span>Sell Products</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"></div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section with Glassmorphism */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="group bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 text-center transform hover:-translate-y-3 hover:scale-105 border border-white/20 hover:border-white/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl mb-4 transform hover:scale-125 transition-transform duration-300 animate-bounce-slow">🚚</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">Fast Delivery</h3>
              <p className="text-white/90 text-sm md:text-base drop-shadow">Quick and reliable shipping</p>
            </div>
          </div>
          <div className="group bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 text-center transform hover:-translate-y-3 hover:scale-105 border border-white/20 hover:border-white/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl mb-4 transform hover:scale-125 transition-transform duration-300 animate-bounce-slow animation-delay-2000">🔒</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">Secure Payment</h3>
              <p className="text-white/90 text-sm md:text-base drop-shadow">Safe and encrypted transactions</p>
            </div>
          </div>
          <div className="group bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 text-center transform hover:-translate-y-3 hover:scale-105 border border-white/20 hover:border-white/40 relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl mb-4 transform hover:scale-125 transition-transform duration-300 animate-bounce-slow animation-delay-4000">💯</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">Quality Guaranteed</h3>
              <p className="text-white/90 text-sm md:text-base drop-shadow">Premium products only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
