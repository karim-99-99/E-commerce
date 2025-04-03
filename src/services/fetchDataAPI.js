import axios from "axios";

const FAKE_STORE_API = "https://fakestoreapi.com/products";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw new Error("Error fetching product");
  }
};

export const fetchDataID = async (id) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching id", error);
    throw new Error("Error fetching id");
  }
};

export const fetchDataCategory = async (category) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category", error);
    throw new Error("Error fetching category");
  }
};
