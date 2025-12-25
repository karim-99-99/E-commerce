import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    { name: "Adam Khalil", role: "CEO", img: "https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_960_720.jpg", delay: "0s" },
    { name: "Lina Saeed", role: "COO", img: "https://images.hindustantimes.com/tech/img/2023/01/19/1600x900/AI_generated_art_1674113313038_1674113318035_1674113318035.jpg", delay: "0.2s" },
    { name: "Omar Hassan", role: "CMO", img: "https://cdn.pixabay.com/photo/2023/02/08/14/02/ai-generated-7776701_640.jpg", delay: "0.4s" }
  ];

  const reviews = [
    { text: "Great variety of products and fast delivery.", author: "Sarah Johnson", rating: 5, delay: "0s" },
    { text: "Easy to use website with good deals.", author: "Michael Chen", rating: 5, delay: "0.1s" },
    { text: "Reliable service and smooth shopping experience.", author: "Emily Davis", rating: 5, delay: "0.2s" },
    { text: "Excellent customer support and quality products.", author: "David Wilson", rating: 5, delay: "0.3s" }
  ];

  const features = [
    { icon: "🚀", title: "Fast Delivery", description: "Quick shipping worldwide", delay: "0s" },
    { icon: "🔒", title: "Secure Payment", description: "100% safe transactions", delay: "0.1s" },
    { icon: "💎", title: "Quality Products", description: "Premium selection only", delay: "0.2s" },
    { icon: "🎯", title: "Best Prices", description: "Competitive pricing", delay: "0.3s" },
    { icon: "📞", title: "24/7 Support", description: "Always here to help", delay: "0.4s" },
    { icon: "🔄", title: "Easy Returns", description: "Hassle-free returns", delay: "0.5s" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white relative overflow-hidden">
      <Navigation />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 animate-fade-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block">
              <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                Welcome to ShopHouse
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent animate-gradient-text">
                About
              </span>
              <span className="text-gray-800"> Us</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Our e-commerce platform offers a wide range of products including
              electronics, fashion, home goods, and more — all in one place. We
              provide a convenient, secure, and fast shopping experience with
              detailed product information, customer reviews, and multiple payment
              options. Customers enjoy regular discounts, free shipping on select
              orders, and easy return policies to ensure satisfaction with every
              purchase.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-2xl">✅</span>
                <span className="font-semibold text-gray-700">Trusted by 100K+</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold text-gray-700">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          <div className={`relative animate-fade-in-delay ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
                  alt="e-commerce Company"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-orange-300/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-200/40 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Everything you need for the best shopping experience</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-orange-100 hover:border-orange-300 relative overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Our Amazing Team
            </span>
          </h2>
          <p className="text-gray-600 text-lg">The people behind your shopping experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center transform hover:-translate-y-4 hover:scale-105 border border-orange-100 hover:border-orange-300 relative overflow-hidden"
              style={{ animationDelay: member.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-orange-200 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative">
                    <img
                      src={member.img}
                      alt={member.role}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400/30 to-transparent group-hover:from-orange-500/50 transition-colors"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-semibold text-lg">{member.role}</p>
                <div className="mt-4 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce animation-delay-2000"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce animation-delay-4000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Real feedback from real customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-orange-500 hover:border-orange-600 relative overflow-hidden"
              style={{ animationDelay: review.delay }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce-slow" style={{ animationDelay: `${i * 0.1}s` }}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 font-medium text-lg mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-gray-600 font-semibold">{review.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[
              { number: "100K+", label: "Happy Customers", icon: "😊" },
              { number: "50K+", label: "Products", icon: "📦" },
              { number: "99%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "24/7", label: "Customer Support", icon: "💬" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.number}</div>
                <div className="text-orange-100 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
