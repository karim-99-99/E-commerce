import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData, fetchDataCategory } from "../services/fetchDataAPI";

function Service() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectCategory, setSelectCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    loadproducts();
  }, [selectCategory]);

  const loadproducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data =
        selectCategory === "all"
          ? await fetchData()
          : await fetchDataCategory(selectCategory);
      setproducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const filterProduct = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (product) => {
    // Store the selected product in sessionStorage
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    // Navigate to the registration form
    navigate("/service/registration");
  };

  return (
    <div>
      <nav className="flex justify-end gap-5 text-orange-600  font-semibold">
        <Link to="/" className="text-lg">Home</Link>
        <Link to="/Service" className="text-lg">Service</Link>
        <Link to="/about" className="text-lg">About</Link>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden sm:block rounded-3xl w-28 p-1  focus:outline-none border border-orange-700   text-sm text-orange-600"
        />
        <select
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
          className="  focus:outline-none rounded-full w-14 sm:w-auto"
        >
          {filteredCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </nav>

      <div>
        <h1 className="text-5xl font-bold m-10 font-sans text-orange-600">
          Store Products
        </h1>
        <div className="category-search"></div>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filterProduct.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleItemClick(product)}
          >
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-80 w-auto mb-4"
              />
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span className="font-bold text-orange-600">
                  ${product.price}
                </span>
                <span className="text-gray-500">{product.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
