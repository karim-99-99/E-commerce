// Fake API Service - Uses localStorage for data persistence
// No backend connection required
//
// IMPORTANT: localStorage persists data across browser sessions!
// - Data is saved in the browser's local storage
// - Products, categories, and users will remain even after closing the website
// - Data is stored per domain (e.g., localhost:5173)
// - To clear data: Use browser's Developer Tools > Application > Local Storage
// - Data persists until manually cleared or browser data is cleared

// Admin email - only this email can access admin features
const ADMIN_EMAIL = "admin@example.com"; // Change this to your admin email

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: "fakeApi_products",
  CATEGORIES: "fakeApi_categories",
  USERS: "fakeApi_users",
  CURRENT_USER: "fakeApi_currentUser",
};

// Check if current user is admin
export const isAdmin = () => {
  try {
    const currentUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!currentUserStr) return false;
    const currentUser = JSON.parse(currentUserStr);
    return currentUser.email === ADMIN_EMAIL;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const currentUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!currentUserStr) return null;
    return JSON.parse(currentUserStr);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return false;
    }
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.error("localStorage is not available:", e);
    return false;
  }
};

// Helper functions with error handling and persistence guarantees
const getData = (key) => {
  try {
    if (!isLocalStorageAvailable()) {
      console.error(`localStorage is not available. Cannot read ${key}`);
      return [];
    }
    const data = localStorage.getItem(key);
    if (!data) {
      console.log(`No data found for key: ${key}`);
      return [];
    }
    const parsed = JSON.parse(data);
    console.log(`✅ Successfully read ${key}, items:`, parsed.length);
    return parsed;
  } catch (error) {
    console.error(`❌ Error reading ${key} from localStorage:`, error);
    return [];
  }
};

const setData = (key, data) => {
  try {
    if (!isLocalStorageAvailable()) {
      throw new Error("localStorage is not available");
    }

    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);

    // Verify the data was saved
    const saved = localStorage.getItem(key);
    if (!saved) {
      console.error(
        `❌ Failed to save ${key} to localStorage - verification failed`
      );
      throw new Error(`Failed to save ${key} to localStorage`);
    }

    // Verify the saved data matches
    const savedParsed = JSON.parse(saved);
    if (JSON.stringify(savedParsed) !== JSON.stringify(data)) {
      console.error(`❌ Data mismatch for ${key}`);
      throw new Error(`Data verification failed for ${key}`);
    }

    console.log(
      `✅ Successfully saved ${key}, items:`,
      Array.isArray(data) ? data.length : 1
    );
    return true;
  } catch (error) {
    console.error(`❌ Error saving ${key} to localStorage:`, error);
    // If localStorage is full, try to clear old data or notify user
    if (error.name === "QuotaExceededError") {
      console.error("localStorage quota exceeded. Please clear some space.");
      alert("Storage is full. Please clear browser data or contact support.");
    } else if (error.message.includes("not available")) {
      alert(
        "localStorage is disabled in your browser. Please enable it to save data."
      );
    }
    throw error;
  }
};

// Initialize with sample data if storage is empty
const initializeData = () => {
  // Initialize categories
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    const defaultCategories = [
      { id: 1, name: "Men's Clothing", slug: "mens-clothes" },
      { id: 2, name: "Women's Clothing", slug: "womens-clothes" },
      { id: 3, name: "Electronics", slug: "electronics" },
      { id: 4, name: "Jewelery", slug: "jewelery" },
      { id: 5, name: "Home & Garden", slug: "home-garden" },
    ];
    localStorage.setItem(
      STORAGE_KEYS.CATEGORIES,
      JSON.stringify(defaultCategories)
    );
  }

  // Initialize products
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    const defaultProducts = [
      {
        id: 1,
        name: "Classic White T-Shirt",
        description: "Comfortable cotton t-shirt perfect for everyday wear",
        price: 19.99,
        category: { id: 1, name: "Men's Clothing", slug: "mens-clothes" },
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
        ],
        stock_quantity: 50,
      },
      {
        id: 2,
        name: "Elegant Summer Dress",
        description: "Beautiful floral dress for warm weather occasions",
        price: 49.99,
        category: { id: 2, name: "Women's Clothing", slug: "womens-clothes" },
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
        ],
        stock_quantity: 30,
      },
      {
        id: 3,
        name: "Wireless Bluetooth Headphones",
        description: "High-quality sound with noise cancellation",
        price: 129.99,
        category: { id: 3, name: "Electronics", slug: "electronics" },
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
          "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
        ],
        stock_quantity: 25,
      },
      {
        id: 4,
        name: "Silver Pendant Necklace",
        description: "Elegant silver necklace with beautiful pendant",
        price: 79.99,
        category: { id: 4, name: "Jewelery", slug: "jewelery" },
        images: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
          "https://images.unsplash.com/photo-1603561596112-405e06f3c3b1?w=400",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        ],
        stock_quantity: 15,
      },
      {
        id: 5,
        name: "Smartphone Case",
        description: "Protective case with wireless charging support",
        price: 24.99,
        category: { id: 3, name: "Electronics", slug: "electronics" },
        images: [
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400",
          "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400",
        ],
        stock_quantity: 100,
      },
      {
        id: 6,
        name: "Denim Jeans",
        description: "Classic fit jeans in blue denim",
        price: 59.99,
        category: { id: 1, name: "Men's Clothing", slug: "mens-clothes" },
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400",
          "https://images.unsplash.com/photo-1582418702059-97ebaf8bf3d2?w=400",
        ],
        stock_quantity: 40,
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.PRODUCTS,
      JSON.stringify(defaultProducts)
    );
  } else {
    // Migrate existing products to support images array (backward compatibility)
    // Only migrate if migration flag is not set
    const migrationFlag = localStorage.getItem("fakeApi_migration_complete");
    if (!migrationFlag) {
      const products = getData(STORAGE_KEYS.PRODUCTS);
      const migrated = products.map((product) => {
        if (product.image && !product.images) {
          return { ...product, images: [product.image] };
        }
        if (!product.images) {
          return {
            ...product,
            images: [product.image || "https://via.placeholder.com/400"],
          };
        }
        return product;
      });
      setData(STORAGE_KEYS.PRODUCTS, migrated);
      // Mark migration as complete
      localStorage.setItem("fakeApi_migration_complete", "true");
    }
  }

  // Initialize users
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: 1,
        username: "admin",
        email: ADMIN_EMAIL, // Admin user - email must match ADMIN_EMAIL above
        password: "admin123", // In real app, this would be hashed
      },
      {
        id: 2,
        username: "demo",
        email: "demo@example.com",
        password: "demo123", // In real app, this would be hashed
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
};

// Ensure admin user exists (in case it was missing)
// MUST be defined BEFORE initialization code that calls it
const ensureAdminUser = () => {
  try {
    const users = getData(STORAGE_KEYS.USERS);
    const adminExists = users.find((u) => u.email === ADMIN_EMAIL);

    if (!adminExists) {
      console.log("🔧 Admin user not found, creating admin user...");
      const adminUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        username: "admin",
        email: ADMIN_EMAIL,
        password: "admin123",
      };
      users.push(adminUser);
      setData(STORAGE_KEYS.USERS, users);
      console.log("✅ Admin user created:", adminUser);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error ensuring admin user:", error);
    return false;
  }
};

// Initialize on import - ensures data persists across sessions
// localStorage persists data even after closing the browser
if (typeof window !== "undefined" && window.localStorage) {
  console.log("🔧 Initializing fakeApi...");

  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    console.error("❌ localStorage is not available! Data will not be saved.");
    alert(
      "⚠️ localStorage is disabled in your browser. Please enable it to save products."
    );
  } else {
    console.log("✅ localStorage is available");

    // Always run initialization check (it only initializes if data doesn't exist)
    initializeData();
    console.log("✅ Initialization complete");

    // Run migration check if needed (only once)
    const migrationFlag = localStorage.getItem("fakeApi_migration_complete");
    if (!migrationFlag) {
      console.log("🔄 Running migration...");
      const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (products) {
        try {
          const productList = JSON.parse(products);
          const needsMigration = productList.some(
            (p) => !p.images || (p.image && !p.images)
          );

          if (needsMigration) {
            console.log("📦 Migrating products to new format...");
            const migrated = productList.map((product) => {
              if (product.image && !product.images) {
                return { ...product, images: [product.image] };
              }
              if (!product.images) {
                return {
                  ...product,
                  images: [product.image || "https://via.placeholder.com/400"],
                };
              }
              return product;
            });
            setData(STORAGE_KEYS.PRODUCTS, migrated);
            console.log("✅ Migration complete");
          }
          localStorage.setItem("fakeApi_migration_complete", "true");
        } catch (error) {
          console.error("❌ Error during migration:", error);
        }
      } else {
        // No products to migrate
        localStorage.setItem("fakeApi_migration_complete", "true");
      }
    }

    // Ensure admin user exists
    ensureAdminUser();

    // Run diagnostics after a short delay (to ensure all functions are loaded)
    setTimeout(() => {
      try {
        const products = getData(STORAGE_KEYS.PRODUCTS);
        const categories = getData(STORAGE_KEYS.CATEGORIES);
        const users = getData(STORAGE_KEYS.USERS);
        console.log(
          `📊 Storage Status: ${products.length} products, ${categories.length} categories, ${users.length} users`
        );
        console.log(
          "👤 Users:",
          users.map((u) => ({ username: u.username, email: u.email }))
        );
      } catch (e) {
        console.error("Error in diagnostics:", e);
      }
    }, 100);
  }
} else {
  console.error("❌ Window or localStorage not available");
}

// Helper to get product images (supports both old and new format)
export const getProductImages = (product) => {
  if (
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    return product.images;
  }
  if (product.image) {
    return [product.image];
  }
  return ["https://via.placeholder.com/400"];
};

// Simulate API delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// ======= AUTH ENDPOINTS ======= //
export const loginUser = async (data) => {
  await delay();

  // Ensure admin user exists before login
  ensureAdminUser();

  const users = getData(STORAGE_KEYS.USERS);
  console.log("🔍 Attempting login for username:", data.username);
  console.log(
    "📋 Available users:",
    users.map((u) => ({ username: u.username, email: u.email }))
  );

  // Trim whitespace from input
  const username = data.username?.trim();
  const password = data.password?.trim();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    console.log("✅ Login successful for user:", user.username);
    const token = `fake_token_${Date.now()}_${user.id}`;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem("token", token);
    return { data: { token, user } };
  } else {
    console.error("❌ Login failed - Invalid username or password");
    console.error("Tried username:", username);
    throw new Error("Invalid username or password");
  }
};

export const registerUser = async (data) => {
  await delay();
  const users = getData(STORAGE_KEYS.USERS);

  // Check if username already exists
  if (users.find((u) => u.username === data.username)) {
    throw new Error("Username already exists");
  }

  // Check if email already exists
  if (users.find((u) => u.email === data.email)) {
    throw new Error("Email already exists");
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username: data.username,
    email: data.email,
    password: data.password, // In real app, this would be hashed
  };

  users.push(newUser);
  setData(STORAGE_KEYS.USERS, users);

  return { data: { message: "Registration successful", user: newUser } };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// ======= PRODUCT ENDPOINTS ======= //
export const fetchProducts = async () => {
  await delay();
  const products = getData(STORAGE_KEYS.PRODUCTS);
  return { data: products };
};

export const fetchProductById = async (id) => {
  await delay();
  const products = getData(STORAGE_KEYS.PRODUCTS);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    throw new Error("Product not found");
  }

  return { data: product };
};

export const fetchByCategory = async (categorySlug) => {
  await delay();
  const products = getData(STORAGE_KEYS.PRODUCTS);
  const filtered = products.filter((p) => p.category?.slug === categorySlug);
  return { data: filtered };
};

export const updateProduct = async (productId, formData) => {
  console.log("🔄 Starting updateProduct...");

  if (!isAdmin()) {
    throw new Error("Only admin can update products");
  }

  await delay();

  const products = getData(STORAGE_KEYS.PRODUCTS);
  const categories = getData(STORAGE_KEYS.CATEGORIES);

  const productIndex = products.findIndex((p) => p.id === parseInt(productId));
  if (productIndex === -1) {
    throw new Error("Product not found");
  }

  // Get category by ID
  const categoryId = parseInt(formData.get("category_id"));
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  // Handle multiple images
  const images = [];
  const imageFiles = formData.getAll("images[]");

  if (imageFiles.length > 0) {
    for (const imageFile of imageFiles) {
      if (imageFile instanceof File) {
        const imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => resolve("https://via.placeholder.com/400");
          reader.readAsDataURL(imageFile);
        });
        images.push(imageUrl);
      } else if (typeof imageFile === "string") {
        images.push(imageFile);
      }
    }
  } else {
    // Keep existing images if no new ones provided
    images.push(...products[productIndex].images);
  }

  if (images.length === 0) {
    images.push("https://via.placeholder.com/400");
  }

  // Update product
  products[productIndex] = {
    ...products[productIndex],
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")) || 0,
    stock_quantity: parseInt(formData.get("stock_quantity")) || 0,
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },
    images: images,
    image: images[0],
  };

  setData(STORAGE_KEYS.PRODUCTS, products);
  console.log("✅ Product updated successfully!");

  return { data: products[productIndex] };
};

export const deleteProduct = async (productId) => {
  console.log("🔄 Starting deleteProduct...");

  if (!isAdmin()) {
    throw new Error("Only admin can delete products");
  }

  await delay();

  const products = getData(STORAGE_KEYS.PRODUCTS);
  const filtered = products.filter((p) => p.id !== parseInt(productId));

  if (filtered.length === products.length) {
    throw new Error("Product not found");
  }

  setData(STORAGE_KEYS.PRODUCTS, filtered);
  console.log("✅ Product deleted successfully!");

  return { data: { message: "Product deleted successfully" } };
};

export const addProduct = async (formData) => {
  console.log("🔄 Starting addProduct...");

  // Check localStorage availability first
  if (!isLocalStorageAvailable()) {
    throw new Error(
      "localStorage is not available. Please enable it in your browser settings."
    );
  }

  await delay();

  console.log("📦 Loading existing products...");
  const products = getData(STORAGE_KEYS.PRODUCTS);
  console.log(`📦 Found ${products.length} existing products`);

  const categories = getData(STORAGE_KEYS.CATEGORIES);

  // Get category by ID
  const categoryId = parseInt(formData.get("category_id"));
  console.log(`🔍 Looking for category ID: ${categoryId}`);
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    console.error(`❌ Category not found for ID: ${categoryId}`);
    throw new Error("Category not found");
  }
  console.log(`✅ Found category: ${category.name}`);

  // Handle multiple images - support both single image and images array
  const images = [];

  // Check for multiple images (images[])
  const imageFiles = formData.getAll("images[]");
  console.log(`📸 Processing ${imageFiles.length} image(s)...`);

  if (imageFiles.length > 0) {
    // Process multiple images
    for (const imageFile of imageFiles) {
      if (imageFile instanceof File) {
        console.log(`📸 Converting image file: ${imageFile.name}`);
        const imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => {
            console.error("Error reading image file:", e);
            resolve("https://via.placeholder.com/400");
          };
          reader.readAsDataURL(imageFile);
        });
        images.push(imageUrl);
        console.log(`✅ Image converted successfully`);
      } else if (typeof imageFile === "string") {
        images.push(imageFile);
      }
    }
  } else {
    // Fallback to single image for backward compatibility
    const imageFile = formData.get("image");
    if (imageFile instanceof File) {
      console.log(`📸 Converting single image file: ${imageFile.name}`);
      const imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => {
          console.error("Error reading image file:", e);
          resolve("https://via.placeholder.com/400");
        };
        reader.readAsDataURL(imageFile);
      });
      images.push(imageUrl);
    } else if (typeof imageFile === "string" && imageFile) {
      images.push(imageFile);
    }
  }

  // Ensure at least one image
  if (images.length === 0) {
    console.log("⚠️ No images provided, using placeholder");
    images.push("https://via.placeholder.com/400");
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")) || 0,
    stock_quantity: parseInt(formData.get("stock_quantity")) || 0,
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },
    images: images,
    // Keep image for backward compatibility
    image: images[0],
  };

  console.log("🆕 New product created:", newProduct.name, "ID:", newProduct.id);

  products.push(newProduct);
  console.log(`💾 Saving ${products.length} products to localStorage...`);

  try {
    setData(STORAGE_KEYS.PRODUCTS, products);
    console.log("✅ Products saved successfully!");
  } catch (error) {
    console.error("❌ Failed to save products:", error);
    throw error;
  }

  // Double-check the product was saved
  console.log("🔍 Verifying product was saved...");
  const savedProducts = getData(STORAGE_KEYS.PRODUCTS);
  const savedProduct = savedProducts.find((p) => p.id === newProduct.id);

  if (!savedProduct) {
    console.error(
      "❌ Product verification failed - product not found after save"
    );
    throw new Error("Failed to save product. Please try again.");
  }

  console.log("✅ Product verified successfully!");
  console.log(`📊 Total products in storage: ${savedProducts.length}`);

  return { data: newProduct };
};

// ======= CATEGORY ENDPOINTS ======= //
export const fetchCategories = async () => {
  await delay();
  const categories = getData(STORAGE_KEYS.CATEGORIES);
  return { data: categories };
};

export const addCategory = async (categoryData) => {
  await delay();
  const categories = getData(STORAGE_KEYS.CATEGORIES);

  // Check if category with same name or slug exists
  if (
    categories.find(
      (c) => c.name === categoryData.name || c.slug === categoryData.slug
    )
  ) {
    throw new Error("Category already exists");
  }

  const newCategory = {
    id:
      categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
    name: categoryData.name,
    slug:
      categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, "-"),
  };

  categories.push(newCategory);
  setData(STORAGE_KEYS.CATEGORIES, categories);

  return { data: newCategory };
};

export const deleteCategory = async (categoryId) => {
  await delay();
  const categories = getData(STORAGE_KEYS.CATEGORIES);
  const products = getData(STORAGE_KEYS.PRODUCTS);

  // Check if any products use this category
  const productsUsingCategory = products.filter(
    (p) => p.category?.id === parseInt(categoryId)
  );

  if (productsUsingCategory.length > 0) {
    throw new Error(
      `Cannot delete category. ${productsUsingCategory.length} product(s) are using it.`
    );
  }

  const filtered = categories.filter((c) => c.id !== parseInt(categoryId));
  setData(STORAGE_KEYS.CATEGORIES, filtered);

  return { data: { message: "Category deleted successfully" } };
};

// ======= UTILITY FUNCTIONS ======= //
// Diagnostic function to check localStorage status
export const diagnoseStorage = () => {
  const diagnostics = {
    localStorageAvailable: isLocalStorageAvailable(),
    productsCount: 0,
    categoriesCount: 0,
    usersCount: 0,
    storageSize: 0,
    errors: [],
  };

  if (diagnostics.localStorageAvailable) {
    try {
      const products = getData(STORAGE_KEYS.PRODUCTS);
      const categories = getData(STORAGE_KEYS.CATEGORIES);
      const users = getData(STORAGE_KEYS.USERS);

      diagnostics.productsCount = products.length;
      diagnostics.categoriesCount = categories.length;
      diagnostics.usersCount = users.length;

      // Calculate approximate storage size
      const productsSize = JSON.stringify(products).length;
      const categoriesSize = JSON.stringify(categories).length;
      const usersSize = JSON.stringify(users).length;
      diagnostics.storageSize = productsSize + categoriesSize + usersSize;

      console.log("📊 Storage Diagnostics:", diagnostics);
    } catch (error) {
      diagnostics.errors.push(`Error reading data: ${error.message}`);
      console.error("❌ Diagnostic error:", error);
    }
  } else {
    diagnostics.errors.push("localStorage is not available");
  }

  return diagnostics;
};

// Export data backup (for user to download)
export const exportData = () => {
  const data = {
    products: getData(STORAGE_KEYS.PRODUCTS),
    categories: getData(STORAGE_KEYS.CATEGORIES),
    users: getData(STORAGE_KEYS.USERS),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

// Import data backup
export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    if (data.products) setData(STORAGE_KEYS.PRODUCTS, data.products);
    if (data.categories) setData(STORAGE_KEYS.CATEGORIES, data.categories);
    if (data.users) setData(STORAGE_KEYS.USERS, data.users);
    return { success: true };
  } catch (error) {
    console.error("Error importing data:", error);
    return { success: false, error: error.message };
  }
};

// Verify data persistence
export const verifyPersistence = () => {
  const products = getData(STORAGE_KEYS.PRODUCTS);
  const categories = getData(STORAGE_KEYS.CATEGORIES);
  return {
    productsCount: products.length,
    categoriesCount: categories.length,
    isPersisted: products.length > 0 || categories.length > 0,
  };
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  fetchProducts,
  fetchProductById,
  fetchByCategory,
  addProduct,
  fetchCategories,
  addCategory,
  deleteCategory,
  exportData,
  importData,
  verifyPersistence,
  diagnoseStorage,
};
