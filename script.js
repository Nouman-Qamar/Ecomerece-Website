
// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Function to display featured products
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (featuredProductsContainer) {
        featuredProductsContainer.innerHTML = products.map(createProductCard).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const techProducts = [
        { id: 1, name: 'Wireless Mouse', price: 29.99, category: 'tech', image: 'https://source.unsplash.com/random/300x300?wireless+mouse' },
        { id: 2, name: 'Mechanical Keyboard', price: 89.99, category: 'tech', image: 'https://source.unsplash.com/random/300x300?keyboard' },
        { id: 3, name: 'Bluetooth Earbuds', price: 59.99, category: 'tech', image: 'https://source.unsplash.com/random/300x300?earbuds' },
        { id: 4, name: 'Smart Watch', price: 199.99, category: 'tech', image: 'https://source.unsplash.com/random/300x300?smartwatch' },
        { id: 5, name: 'Portable SSD', price: 79.99, category: 'tech', image: 'https://source.unsplash.com/random/300x300?ssd' }
    ];

    const jewelryProducts = [
        { id: 6, name: 'Diamond Necklace', price: 499.99, category: 'jewelry', image: 'https://source.unsplash.com/random/300x300?necklace' },
        { id: 7, name: 'Gold Ring', price: 299.99, category: 'jewelry', image: 'https://source.unsplash.com/random/300x300?ring' },
        { id: 8, name: 'Pearl Earrings', price: 149.99, category: 'jewelry', image: 'https://source.unsplash.com/random/300x300?earrings' },
        { id: 9, name: 'Silver Bracelet', price: 89.99, category: 'jewelry', image: 'https://source.unsplash.com/random/300x300?bracelet' },
        { id: 10, name: 'Gemstone Pendant', price: 179.99, category: 'jewelry', image: 'https://source.unsplash.com/random/300x300?pendant' }
    ];

    const products = [...techProducts, ...jewelryProducts];

    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function displayProducts(category = 'all') {
        productGrid.innerHTML = '';
        products.forEach(product => {
            if (category === 'all' || product.category === category) {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <button onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                `;
                productGrid.innerHTML += productCard;
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displayProducts(filter);
        });
    });

    // Initial display of all products
    displayProducts();
});

// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(productId, name, price) {
    // Find if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // If the product is already in the cart, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1
        cart.push({ id: productId, name: name, price: price, quantity: 1 });
    }

    // Save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} has been added to the cart!`);
}

function addToCart(id, name, price) {
    // Get the existing cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;  // Increment quantity if already in cart
    } else {
        // If not in the cart, add the new item
        cart.push({ id, name, price, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, give feedback to the user
    alert(`${name} has been added to your cart.`);
}

// Function to display the cart items in the cart.html page
function displayCartItems() {
    const cartItemsElement = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Load cart from local storage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach(product => {
        const productTotalPrice = product.price * product.quantity;
        subtotal += productTotalPrice;

        cartHTML += `
            <div class="cart-item">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Total: $${productTotalPrice.toFixed(2)}</p>
            </div>
        `;
    });

    cartItemsElement.innerHTML = cartHTML;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + 0).toFixed(2)}`; // Assuming free shipping for simplicity
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cartItems');
    let subtotal = 0;

    cartItems.innerHTML = '';  // Clear any existing content

    cart.forEach(item => {
        let totalItemPrice = item.price * item.quantity;
        subtotal += totalItemPrice;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${totalItemPrice.toFixed(2)}</p>
            </div>
        `;
    });

    // Update the subtotal and total in the cart summary
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

window.onload = loadCart;  // Load the cart items when the page is loaded



// Function to display products in a specific section
function displayProducts(sectionId, productList) {
    const container = document.getElementById(sectionId);
    if (container) {
        container.innerHTML = productList.map(createProductCard).join('');
    }
}

// Display products when the page loads
window.addEventListener('load', () => {
    displayProducts('newArrivals', products.slice(0, 4));
    displayProducts('trendingProducts', products.slice(2, 6));
    displayProducts('topRatedProducts', products.slice(1, 5));
});

// Function to add a product to the cart (to be implemented)
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement cart functionality here
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would typically send a request to your server to authenticate the user
    console.log('Login attempt:', { email, password });

    // For demonstration purposes, we'll just log the user in
    alert('Login successful!');
    // Redirect to home page or dashboard
    window.location.href = 'index.html';
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically send a request to your server to create a new user
    console.log('Signup attempt:', { name, email, password });

    // For demonstration purposes, we'll just log the user in
    alert('Signup successful!');
    // Redirect to home page or dashboard
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHtml = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItems.innerHTML += cartItemHtml;
        });

        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    displayCart();
});

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}



document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const countrySelect = document.getElementById('country');
    const postcodeInput = document.getElementById('postcode');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItems.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" width="50">
                    ${item.name}
                    <button onclick="removeItem(${index})">×</button>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value - ${item.quantity})">
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartItems.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        updateTotal();
    }

    function updateTotal() {
        const subtotal = parseFloat(subtotalElement.textContent.slice(1));
        let shipping = 0;

        const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
        if (selectedShipping === 'flat') {
            shipping = 5;
        }

        const total = subtotal + shipping;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function updateQuantity(index, change) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    shippingRadios.forEach(radio => {
        radio.addEventListener('change', updateTotal);
    });

    countrySelect.addEventListener('change', updateTotal);
    postcodeInput.addEventListener('input', updateTotal);

    updateCart();
});

// These functions need to be global to be called from inline event handlers
window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};

window.updateQuantity = function(index, change) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};
