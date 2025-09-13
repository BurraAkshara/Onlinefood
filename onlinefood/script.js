let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sample restaurant menus
const menus = {
  burger: [
    { name: "Classic Burger", price: 150, img: "https://i.ibb.co/4sFZTXJ/burger.jpg" },
    { name: "Cheese Burger", price: 180, img: "https://i.ibb.co/4sFZTXJ/burger.jpg" },
  ],
  pizza: [
    { name: "Margherita Pizza", price: 250, img: "https://i.ibb.co/GPR5VJt/pizza.jpg" },
    { name: "Pepperoni Pizza", price: 300, img: "https://i.ibb.co/GPR5VJt/pizza.jpg" },
  ],
  pasta: [
    { name: "Creamy Alfredo Pasta", price: 200, img: "https://i.ibb.co/nCPSxhx/pasta.jpg" },
    { name: "Spaghetti Bolognese", price: 220, img: "https://i.ibb.co/nCPSxhx/pasta.jpg" },
  ]
};

// Add to cart
function addToCart(item, price) {
  cart.push({ item, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(item + " added to cart!");
}

// Load cart
function loadCart() {
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((c, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${c.item} - ₹${c.price} 
      <button onclick="removeItem(${i})">❌</button>`;
    cartItems.appendChild(li);
    total += c.price;
  });
  cartTotal.textContent = total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Checkout
function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Load menu dynamically
function loadMenu() {
  const params = new URLSearchParams(window.location.search);
  const restaurant = params.get("restaurant");
  const menuItems = document.getElementById("menu-items");
  const title = document.getElementById("restaurant-name");

  if (!menuItems || !restaurant || !menus[restaurant]) return;

  title.textContent = restaurant.charAt(0).toUpperCase() + restaurant.slice(1) + " Menu";
  menuItems.innerHTML = "";

  menus[restaurant].forEach(m => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
      <p>₹${m.price}</p>
      <button onclick="addToCart('${m.name}',${m.price})">Add to Cart</button>
    `;
    menuItems.appendChild(div);
  });
}

window.onload = () => {
  loadCart();
  loadMenu();
};
