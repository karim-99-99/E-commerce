import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, fetchByCategory, fetchCategories, deleteProduct, isAdmin } from "../services/api"; // API functions
import { getProductImages } from "../services/fakeApi";
import { addToCart } from "../services/cartService";
import ConfirmModal from "./ConfirmModal";
import Navigation from "./Navigation";

// Product Card Component with Image Carousel on Hover
function ProductCard({ product, onItemClick, onEdit, onDelete, isAdmin, onAddToCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const images = getProductImages(product);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentImageIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(product.id);
    setShowDeleteModal(false);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div 
        className="relative w-full h-64 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onItemClick(product)}
      >
        <img
          src={images[currentImageIndex] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-6 bg-orange-600"
                    : "w-2 bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg z-10">
          ${product.price}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-10 group/add"
          title="Add to cart"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
            {product.category?.name || "Uncategorized"}
          </span>
          <span className="text-gray-400 text-sm">
            Stock: {product.stock_quantity || 0}
          </span>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleEdit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you really sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

function Service() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(null);
  const navigate = useNavigate();

  // 🟧 Available categories - loaded from fake API
  const [categories, setCategories] = useState([
    { name: "All", slug: "all" },
  ]);

  // Load categories on mount and check admin status
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        const allCategories = [{ name: "All", slug: "all" }, ...res.data];
        setCategories(allCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
    setAdmin(isAdmin());
  }, []);

  // Load products on category change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  // Listen for storage changes (when product is added from another tab/window)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "fakeApi_products" || e.key === null) {
        console.log("🔄 Storage changed, reloading products...");
        loadProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🧠 Fetch products from API
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        selectedCategory === "all"
          ? await fetchProducts()
          : await fetchByCategory(selectedCategory); // fetch by slug if Django expects slug

      setProducts(response.data || []);
    } catch (error) {
      setError(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Filter products by search term (matches product name or category name)
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.category?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  // 🧭 Filter visible categories in dropdown by search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When a product is clicked - navigate to product detail page
  const handleItemClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setShowAddToCartMessage(product.name);
    setTimeout(() => setShowAddToCartMessage(null), 2000);
  };

  // Handle edit product
  const handleEdit = (product) => {
    try {
      console.log("Editing product:", product);
      sessionStorage.setItem("editingProduct", JSON.stringify(product));
      navigate("/add-item");
    } catch (error) {
      console.error("Error editing product:", error);
      setError("Failed to edit product. Please try again.");
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      await loadProducts(); // Reload products
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navigation 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={filteredCategories}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-gray-600 mt-2">Discover amazing products at great prices</p>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <span className="ml-4 text-gray-600">Loading products...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Add to Cart Success Message */}
        {showAddToCartMessage && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>{showAddToCartMessage} added to cart!</span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {filteredProducts.length === 0 && !loading && (
          <div className="col-span-full text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 font-medium">No products found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        )}

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onItemClick={handleItemClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCart={handleAddToCart}
            isAdmin={admin}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
