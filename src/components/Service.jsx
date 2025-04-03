import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData, fetchDataCategory } from "../services/fetchDataAPI";

function Service() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectCategory, setSelectCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/service">Service</Link>
        <Link to="/service/registration">Registration</Link>
      </nav>

      <div>
        <h1>Store Products</h1>
        <div className="category-search">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            {filteredCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
      </div>
      {/* Product Grid */}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <div>
              <img src={product.image} alt={product.title} />
              <div>
                <p>{product.title}</p>
                <p>{product.description}</p>
              </div>
              <div>
                <span>${product.price}</span>
                <span>{product.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
