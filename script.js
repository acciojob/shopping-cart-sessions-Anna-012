// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Helper: Update session storage
const updateSessionStorage = (cart) => {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
};

// Helper: Get cart from session storage
const getCartFromSession = () => {
  const cart = sessionStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
};

// Render product list
const renderProducts = () => {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });
};

// Render shopping cart
const renderCart = () => {
  const cart = getCartFromSession();
  cartList.innerHTML = ""; // Clear previous cart items

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(index));
    li.appendChild(removeButton);
    cartList.appendChild(li);
  });
};

// Add product to cart
const addToCart = (product) => {
  const cart = getCartFromSession();
  cart.push(product);
  updateSessionStorage(cart);
  renderCart();
};

// Remove item from cart
const removeFromCart = (index) => {
  const cart = getCartFromSession();
  cart.splice(index, 1); // Remove the item at the specified index
  updateSessionStorage(cart);
  renderCart();
};

// Clear the cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("shoppingCart");
  renderCart();
});

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart(); // Restore cart from session storage
});
