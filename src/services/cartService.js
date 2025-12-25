// Cart Service - Manages shopping cart using localStorage
const CART_STORAGE_KEY = "shopping_cart";

// Get all cart items
export const getCartItems = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

// Add item to cart (or update quantity if already exists)
export const addToCart = (product, quantity = 1) => {
  try {
    const cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Item already in cart, update quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // New item, add to cart
      cartItems.push({
        product,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return cartItems;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return getCartItems();
  }
};

// Remove item from cart
export const removeFromCart = (productId) => {
  try {
    const cartItems = getCartItems();
    const filteredItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return filteredItems;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return getCartItems();
  }
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId, quantity) => {
  try {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const cartItems = getCartItems();
    const updatedItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return updatedItems;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return getCartItems();
  }
};

// Clear entire cart
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

// Get total number of items in cart
export const getCartItemCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Get total price of cart
export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price || 0) * item.quantity,
    0
  );
};


