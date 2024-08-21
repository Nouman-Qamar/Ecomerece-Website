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