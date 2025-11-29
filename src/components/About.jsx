import React from "react";
import Navigation from "./Navigation";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
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
          </div>
          <div className="relative">
            <img
              src="https://f.hellowork.com/blogdumoderateur/2023/05/ECommerce-Fevad-2023-.jpg"
              alt="e-commerce Company"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Our Team
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Adam Khalil", role: "CEO", img: "https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_960_720.jpg" },
            { name: "Lina Saeed", role: "COO", img: "https://images.hindustantimes.com/tech/img/2023/01/19/1600x900/AI_generated_art_1674113313038_1674113318035_1674113318035.jpg" },
            { name: "Omar Hassan", role: "CMO", img: "https://cdn.pixabay.com/photo/2023/02/08/14/02/ai-generated-7776701_640.jpg" }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center transform hover:-translate-y-2">
              <div className="relative inline-block mb-4">
                <img
                  src={member.img}
                  alt={member.role}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-orange-200 shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400/20 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-orange-600 font-semibold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Customer Reviews
          </span>
        </h2>
        <div className="space-y-4">
          {[
            "Great variety of products and fast delivery.",
            "Easy to use website with good deals.",
            "Reliable service and smooth shopping experience."
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-orange-500"
            >
              <div className="flex items-start">
                <div className="text-2xl mr-4">⭐</div>
                <p className="text-gray-700 font-medium flex-1">{review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
