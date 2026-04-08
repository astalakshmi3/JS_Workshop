// main.js

// 1. Initialize State
let cart = [];

// 2. Select DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const categoryFilters = document.querySelectorAll('.category-filter');

// 3. Render Products Function
    // TODO: Clear productGrid
    // TODO: Loop through productsToRender
    // TODO: Generate HTML for each product card
    // TODO: Append to productGrid
function renderProducts(productsToRender) {
    productGrid.innerHTML="";  // clears old content
    productsToRender.forEach(product => {  // goes through every product in the array, one by one
        const productCard = createProductCard(product);   // create a card and add to grid
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });
}
renderProducts(products);   // function called

// 4. Add to Cart Function
    // TODO: Clear productGrid
    // TODO: Loop through productsToRender
    // TODO: Generate HTML for each product card
    // TODO: Append to productGrid
function addToCart(productId) {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
        cart.push(foundProduct);
        localStorage.setItem('cart', JSON.stringify(cart));  // save cart to localStorage
        updateCartCount();  // update cart count UI
    }
}

// 5. Update Cart Count UI
    // TODO: Clear productGrid
    // TODO: Loop through productsToRender
    // TODO: Generate HTML for each product card
    // TODO: Append to productGrid
function updateCartCount() {
    cartCount.textContent = cart.length;  // updates the number in the cart icon
    if (cart.length > 0) {
        cartCount.style.display = "inline-block";
    } else {
        cartCount.style.display = "none";
    }
}

// 6. Event Listeners
// Search
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        // TODO: Filter products by name or description
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
}

// Category Filters
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        // TODO: Collect active categories
        // TODO: Filter products and re-render
        const activeCategories = Array.from(categoryFilters)
            .filter(f => f.checked)
            .map(f => f.value);

        const filteredProducts = products.filter(product =>
            activeCategories.length === 0 || activeCategories.includes(product.category)
        );
        renderProducts(filteredProducts);
    });
});

// 7. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Load cart from localStorage
    // TODO: Update cart count UI
    // TODO: Render all products initially
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
    renderProducts(products);
});

// 8. Create Products
function createProductCard(product) {
    return `
        <div class="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-400">
            <!-- Image Container -->
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <!-- Add to Cart Overlay -->
                <button onclick="addToCart(${product.id})" class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:text-white scale-0 group-hover:scale-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                </button>
            </div>
            <!-- Info -->
            <div class="flex flex-1 flex-col p-4">
                <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">${product.category}</span>
                <h3 class="text-sm font-bold text-slate-900 line-clamp-1">${product.name}</h3>
                <p class="mt-1 text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed">${product.description}</p>
                <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="text-lg font-black text-slate-900">$${product.price}</span>
                </div>
            </div>
        </div>
    `;
}