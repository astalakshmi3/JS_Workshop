// main.js

// 1. Initialize State
let cart = [];

// 2. Select DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const categoryFilters = document.querySelectorAll('.category-filter');

// 3. Render Products Function
function renderProducts(productsToRender) {
    productGrid.innerHTML="";  // clears old content
    productsToRender.forEach(product => {  // goes through every product in the array, one by one
        const productCard = createProductCard(product);   // create a card and add to grid
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });
}
renderProducts(products);

// 4. Add to Cart Function
function addToCart(productId) {
    // TODO: Find product by id
    // TODO: Add to cart array
    // TODO: Update cart count UI
    // TODO: Save to localStorage
}

// 5. Update Cart Count UI
function updateCartCount() {
    // TODO: Set textContent of cartCount
    // TODO: Show/hide cartCount based on items
}

// 6. Event Listeners
// Search
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        // TODO: Filter products by name or description
    });
}

// Category Filters
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        // TODO: Collect active categories
        // TODO: Filter products and re-render
    });
});

// 7. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Load cart from localStorage
    // TODO: Update cart count UI
    // TODO: Render all products initially
    renderProducts(products);
});

function createProductCard (product)
{
    return  `
<div class="group relative bg-white rounded-lg shadow-md overflow-hidden">
<div class="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
<img src="${products.image}" alt="${products.name}" class="w-full h-48 object-cover rounded-t-lg group-hover:brightness-95 transition duration-300">
<button onclick="addToCart(${products.id})" class="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add to Cart</button>
<div class = "flex flex-1 flex-col p-4">
<span class="text- [10px] font-black uppercase tracking-widest text-blue-600 mb-1">${products.category}</span>
<h3 class="text-lg font-semibold mb-2">${products.name}</h3>
<p class="text-gray-600 mb-4">${products.description}</p>
<div class="mt-auto">
    <span class="text-xl font-bold text-gray-900 mb-4 block">${products.price} DKK</span>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">Add to Cart</button>
</div>`;
}