// Sample product data
const products = [
    { id: 1, name: "Floral Dress", price: 59.99, image: "https://example.com/floral-dress.jpg" },
    { id: 2, name: "Denim Jacket", price: 79.99, image: "https://example.com/denim-jacket.jpg" },
    { id: 3, name: "Leather Boots", price: 129.99, image: "https://example.com/leather-boots.jpg" },
    { id: 4, name: "Silk Scarf", price: 29.99, image: "https://example.com/silk-scarf.jpg" }
];

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

// Call the function to display featured products when the page loads
window.addEventListener('load', displayFeaturedProducts);

// Function to add a product to the cart (to be implemented)
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement cart functionality here
}


// Sample product data


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
