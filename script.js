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

// Helper function to update session storage
const updateSessionStorage = (cart) => {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
};

// Helper function to get cart from session storage
const getCartFromSession = () => {
  const cart = sessionStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
};

// Render products
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

// Render cart
const renderCart = () => {
  cartList.innerHTML = ""; // Clear previous cart items
  const cart = getCartFromSession();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
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

// Clear the cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("shoppingCart");
  renderCart();
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart(); // Restore cart from session storage
});
