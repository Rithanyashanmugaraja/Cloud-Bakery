let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    const product = document.querySelector(`.product[data-id="${id}"]`);
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert(`${name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function loadCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - $${item.price} 
            <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });

    cartTotal.textContent = total.toFixed(2); // Fix to two decimal places
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Checkout successful!");
    localStorage.removeItem("cart");
    cart = [];
    loadCart();
}

if (document.getElementById("cart-items")) {
    loadCart();
} else {
    updateCartCount();
}
