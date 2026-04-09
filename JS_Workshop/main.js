// 1. Initialize State
let cart = [];
let currentSearch = "";
let currentCategories = [];

// 2. Select DOM Elements
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const cartCount = document.getElementById("cart-count");
const categoryFilters = document.querySelectorAll(".category-filter");

// 3. Render Products Function
function renderProducts(productsToRender) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <p class="col-span-full text-center text-slate-500 text-lg">
                No products found.
            </p>
        `;
        return;
    }

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.insertAdjacentHTML("beforeend", productCard);
    });
}

// 4. Create Product Card
function createProductCard(product) {
    return `
        <div class="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-400">
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                >

                <button 
                    onclick="addToCart(${product.id})"
                    class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:text-white scale-0 group-hover:scale-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14m-7-7v14"/>
                    </svg>
                </button>
            </div>

            <div class="flex flex-1 flex-col p-4">
                <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
                    ${product.category}
                </span>

                <h3 class="text-sm font-bold text-slate-900 line-clamp-1">
                    ${product.name}
                </h3>

                <p class="mt-1 text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed">
                    ${product.description}
                </p>

                <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="text-lg font-black text-slate-900">
                        $${product.price}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// 5. Add to Cart Function
function addToCart(productId) {
    const foundProduct = products.find(product => product.id === productId);

    if (foundProduct) {
        cart.push(foundProduct);
        saveCart();
        updateCartCount();
        showToast(`${foundProduct.name} added to cart!`);
    }
}

// 6. Save Cart to Local Storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 7. Update Cart Count UI
function updateCartCount() {
    if (!cartCount) return;

    cartCount.textContent = cart.length;

    if (cart.length > 0) {
        cartCount.style.display = "inline-block";
    } else {
        cartCount.style.display = "none";
    }
}

// 8. Apply Search + Category Filters Together
function applyFilters() {
    let filteredProducts = products;

    // Search filter
    if (currentSearch !== "") {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch)
        );
    }

    // Category filter
    if (
        currentCategories.length > 0 &&
        !currentCategories.includes("All Products")
    ) {
        filteredProducts = filteredProducts.filter(product =>
            currentCategories.includes(product.category)
        );
    }

    renderProducts(filteredProducts);
}

// 9. Search Event Listener
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        applyFilters();
    });
}

// 10. Category Filter Event Listeners
categoryFilters.forEach(filter => {
    filter.addEventListener("change", () => {
        // If "All Products" is checked, uncheck others
        if (filter.value === "All Products" && filter.checked) {
            categoryFilters.forEach(item => {
                if (item.value !== "All Products") {
                    item.checked = false;
                }
            });
        }

        // If another category is checked, uncheck "All Products"
        if (filter.value !== "All Products" && filter.checked) {
            categoryFilters.forEach(item => {
                if (item.value === "All Products") {
                    item.checked = false;
                }
            });
        }

        currentCategories = Array.from(categoryFilters)
            .filter(item => item.checked)
            .map(item => item.value);

        applyFilters();
    });
});

// 11. Toast Message
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = "1000";
    toast.style.fontSize = "14px";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// 12. Initial Load
document.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    updateCartCount();
    applyFilters();
});