import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadPhoto from "../Features/UploadPhoto";
import { addProduct, updateProduct, fetchCategories, addCategory, deleteCategory } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import Navigation from "../components/Navigation";

function AddItem() {
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock_quantity: "",
    Photos: [], // Changed to array for multiple photos
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!input.name.trim()) {
      newErrors.name = "Please enter a name";
      isValid = false;
    }
    if (!input.description.trim()) {
      newErrors.description = "Please enter a description";
      isValid = false;
    }
    if (!input.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }
    if (!input.price || parseFloat(input.price) <= 0) {
      newErrors.price = "Please enter a valid price";
      isValid = false;
    }
    if (!input.stock_quantity || parseInt(input.stock_quantity) < 0) {
      newErrors.stock_quantity = "Please enter a valid stock quantity";
      isValid = false;
    }
    if (!input.Photos || input.Photos.length === 0) {
      newErrors.Photos = "Please upload at least one photo";
      isValid = false;
    }

    setError(newErrors);
    if (!isValid) return;

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("stock_quantity", input.stock_quantity);
      formData.append("category_id", Number(input.category));
      
      // Append all photos (if new ones uploaded)
      if (input.Photos.length > 0) {
        input.Photos.forEach((photo) => {
          formData.append("images[]", photo);
        });
      } else if (editingProduct && editingProduct.images) {
        // If editing and no new photos, keep existing images
        editingProduct.images.forEach((img) => {
          formData.append("images[]", img);
        });
      }

      console.log("🔄 Submitting product...");
      
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, formData);
        setSuccessMessage("✅ Product updated successfully!");
        sessionStorage.removeItem("editingProduct");
        setTimeout(() => {
          navigate("/service");
        }, 1500);
      } else {
        // Add new product
        const result = await addProduct(formData);
        console.log("✅ Product added successfully:", result.data);
        setSuccessMessage("✅ Product added successfully!");
        setInput({ name: "", description: "", category: "", price: "", stock_quantity: "", Photos: [] });
      }
      
      setError({});
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Trigger storage event to notify other components
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Error adding product:", err.message);
      setError({
        submit: err.message || "Failed to add product.",
      });
    }
  };

  useEffect(() => {
    loadCategories();
    
    // Check if editing a product
    const editingProductStr = sessionStorage.getItem("editingProduct");
    if (editingProductStr) {
      const product = JSON.parse(editingProductStr);
      setEditingProduct(product);
      setInput({
        name: product.name || "",
        description: product.description || "",
        category: product.category?.id?.toString() || "",
        price: product.price?.toString() || "",
        stock_quantity: product.stock_quantity?.toString() || "",
        Photos: [], // Don't preload images for editing
      });
    }
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError({ category: "Please enter a category name" });
      return;
    }

    try {
      const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-");
      await addCategory({ name: newCategoryName.trim(), slug });
      setNewCategoryName("");
      setShowAddCategory(false);
      setError({});
      await loadCategories(); // Reload categories
      setSuccessMessage("✅ Category added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError({ category: err.message || "Failed to add category" });
    }
  };

  const handleDeleteCategoryClick = (categoryId, categoryName) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setShowDeleteCategoryModal(true);
  };

  const handleConfirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      await loadCategories(); // Reload categories
      setSuccessMessage("✅ Category deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      // Clear category selection if deleted category was selected
      if (input.category === categoryToDelete.id.toString()) {
        setInput((prev) => ({ ...prev, category: "" }));
      }
      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
    } catch (err) {
      setError({ category: err.message || "Failed to delete category" });
      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navigation />

      {editingProduct && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mx-auto w-3/5 mt-4">
          <p className="font-semibold">✏️ Editing: {editingProduct.name}</p>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("editingProduct");
              setEditingProduct(null);
              setInput({ name: "", description: "", category: "", price: "", stock_quantity: "", Photos: [] });
            }}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Cancel editing
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-600">Fill in the details below to {editingProduct ? "update" : "add"} your product</p>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {editingProduct && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
              <p className="font-semibold text-blue-800">✏️ Editing: {editingProduct.name}</p>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("editingProduct");
                  setEditingProduct(null);
                  setInput({ name: "", description: "", category: "", price: "", stock_quantity: "", Photos: [] });
                }}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                Cancel editing
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
              {error?.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all resize-none"
              />
              {error?.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                >
                  {showAddCategory ? "✕ Cancel" : "+ Add New Category"}
                </button>
              </div>

              {showAddCategory && (
                <div className="mb-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter new category name"
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg mb-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    ➕ Add Category
                  </button>
                </div>
              )}

              <select
                name="category"
                value={input.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-700 font-medium cursor-pointer transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {error?.category && <p className="text-red-500 text-sm mt-1">{error.category}</p>}

            {categories.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold mb-3 text-gray-700">Manage Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategoryClick(cat.id, cat.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-all"
                        title="Delete category"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                />
                {error?.price && <p className="text-red-500 text-sm mt-1">{error.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={input.stock_quantity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                />
                {error?.stock_quantity && <p className="text-red-500 text-sm mt-1">{error.stock_quantity}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Photos <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setInput((prev) => ({ ...prev, Photos: [...prev.Photos, ...files] }));
                      setError((prev) => ({ ...prev, Photos: "" }));
                    }
                  }}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="text-4xl mb-2">📸</div>
                  <span className="text-orange-600 font-semibold">Click to upload photos</span>
                  <span className="text-sm text-gray-500 mt-1">Multiple photos allowed</span>
                </label>
              </div>
              {error?.Photos && <p className="text-red-500 text-sm mt-1">{error.Photos}</p>}
              
              {/* Display selected photos */}
              {input.Photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-3 text-gray-700">
                    Selected Photos ({input.Photos.length}):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {input.Photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPhotos = input.Photos.filter((_, i) => i !== index);
                            setInput((prev) => ({ ...prev, Photos: newPhotos }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all"
                          title="Remove photo"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {editingProduct ? "✏️ Update Product" : "➕ Add Product"}
              </button>

              {error?.submit && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700 text-sm font-medium">{error.submit}</p>
                </div>
              )}
              {successMessage && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-700 text-sm font-medium">{successMessage}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Delete Category Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteCategoryModal}
        onClose={() => {
          setShowDeleteCategoryModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDeleteCategory}
        title="Delete Category"
        message={categoryToDelete ? `Are you really sure you want to delete the category "${categoryToDelete.name}"? This action cannot be undone.` : ""}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default AddItem;
