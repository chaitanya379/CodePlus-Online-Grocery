
// ============================================
// CODEPLUS - ONLINE GROCERY
// Complete Frontend JavaScript
// 60 Products + Cart + Checkout + Orders
// ============================================

const USERS_KEY = "codePlusUsers";
const SESSION_KEY = "codePlusUser";
const CART_KEY = "codePlusCart";
const ORDERS_KEY = "codePlusOrders";

const $ = (id) => document.getElementById(id);

let currentUser = localStorage.getItem(SESSION_KEY) || "";
let isRegisterMode = false;
let selectedCategory = "All";
let searchText = "";

let users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
let orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

// ============================================
// 1. PRODUCT DATABASE - 60 PRODUCTS
// ============================================

const products = [
    // GRAINS - 10
    {id:1,name:"White Rice",category:"Grains",price:60,unit:"1 Kg",emoji:"🍚"},
    {id:2,name:"Basmati Rice",category:"Grains",price:110,unit:"1 Kg",emoji:"🍚"},
    {id:3,name:"Brown Rice",category:"Grains",price:90,unit:"1 Kg",emoji:"🌾"},
    {id:4,name:"Wheat Flour",category:"Grains",price:45,unit:"1 Kg",emoji:"🌾"},
    {id:5,name:"Maida",category:"Grains",price:40,unit:"1 Kg",emoji:"🌾"},
    {id:6,name:"Ragi Flour",category:"Grains",price:55,unit:"1 Kg",emoji:"🌾"},
    {id:7,name:"Jowar Flour",category:"Grains",price:65,unit:"1 Kg",emoji:"🌾"},
    {id:8,name:"Poha",category:"Grains",price:50,unit:"1 Kg",emoji:"🥣"},
    {id:9,name:"Sooji",category:"Grains",price:48,unit:"1 Kg",emoji:"🥣"},
    {id:10,name:"Dalia",category:"Grains",price:55,unit:"1 Kg",emoji:"🌾"},

    // VEGETABLES - 10
    {id:11,name:"Potato",category:"Vegetables",price:30,unit:"1 Kg",emoji:"🥔"},
    {id:12,name:"Tomato",category:"Vegetables",price:35,unit:"1 Kg",emoji:"🍅"},
    {id:13,name:"Onion",category:"Vegetables",price:40,unit:"1 Kg",emoji:"🧅"},
    {id:14,name:"Carrot",category:"Vegetables",price:50,unit:"1 Kg",emoji:"🥕"},
    {id:15,name:"Cabbage",category:"Vegetables",price:35,unit:"1 Kg",emoji:"🥬"},
    {id:16,name:"Cauliflower",category:"Vegetables",price:45,unit:"1 Kg",emoji:"🥦"},
    {id:17,name:"Brinjal",category:"Vegetables",price:40,unit:"1 Kg",emoji:"🍆"},
    {id:18,name:"Spinach",category:"Vegetables",price:20,unit:"1 Bunch",emoji:"🥬"},
    {id:19,name:"Cucumber",category:"Vegetables",price:30,unit:"1 Kg",emoji:"🥒"},
    {id:20,name:"Green Chilli",category:"Vegetables",price:60,unit:"1 Kg",emoji:"🌶️"},

    // FRUITS - 10
    {id:21,name:"Apple",category:"Fruits",price:160,unit:"1 Kg",emoji:"🍎"},
    {id:22,name:"Banana",category:"Fruits",price:50,unit:"1 Dozen",emoji:"🍌"},
    {id:23,name:"Orange",category:"Fruits",price:80,unit:"1 Kg",emoji:"🍊"},
    {id:24,name:"Mango",category:"Fruits",price:100,unit:"1 Kg",emoji:"🥭"},
    {id:25,name:"Grapes",category:"Fruits",price:90,unit:"1 Kg",emoji:"🍇"},
    {id:26,name:"Papaya",category:"Fruits",price:45,unit:"1 Kg",emoji:"🍈"},
    {id:27,name:"Pomegranate",category:"Fruits",price:180,unit:"1 Kg",emoji:"🍎"},
    {id:28,name:"Watermelon",category:"Fruits",price:35,unit:"1 Kg",emoji:"🍉"},
    {id:29,name:"Guava",category:"Fruits",price:60,unit:"1 Kg",emoji:"🍐"},
    {id:30,name:"Pineapple",category:"Fruits",price:70,unit:"1 Piece",emoji:"🍍"},

    // DAIRY - 8
    {id:31,name:"Fresh Milk",category:"Dairy",price:30,unit:"500 ml",emoji:"🥛"},
    {id:32,name:"Curd",category:"Dairy",price:35,unit:"500 g",emoji:"🥣"},
    {id:33,name:"Butter",category:"Dairy",price:55,unit:"100 g",emoji:"🧈"},
    {id:34,name:"Cheese",category:"Dairy",price:120,unit:"200 g",emoji:"🧀"},
    {id:35,name:"Paneer",category:"Dairy",price:100,unit:"200 g",emoji:"🧀"},
    {id:36,name:"Ghee",category:"Dairy",price:180,unit:"500 ml",emoji:"🧈"},
    {id:37,name:"Buttermilk",category:"Dairy",price:20,unit:"500 ml",emoji:"🥛"},
    {id:38,name:"Yogurt",category:"Dairy",price:40,unit:"400 g",emoji:"🥣"},

    // SNACKS - 8
    {id:39,name:"Biscuits",category:"Snacks",price:30,unit:"1 Pack",emoji:"🍪"},
    {id:40,name:"Potato Chips",category:"Snacks",price:20,unit:"1 Pack",emoji:"🍟"},
    {id:41,name:"Cookies",category:"Snacks",price:60,unit:"1 Pack",emoji:"🍪"},
    {id:42,name:"Popcorn",category:"Snacks",price:35,unit:"1 Pack",emoji:"🍿"},
    {id:43,name:"Instant Noodles",category:"Snacks",price:15,unit:"1 Pack",emoji:"🍜"},
    {id:44,name:"Pasta",category:"Snacks",price:65,unit:"500 g",emoji:"🍝"},
    {id:45,name:"Chocolate",category:"Snacks",price:40,unit:"1 Pack",emoji:"🍫"},
    {id:46,name:"Cornflakes",category:"Snacks",price:120,unit:"500 g",emoji:"🥣"},

    // OTHER - 14
    {id:47,name:"Sugar",category:"Other",price:45,unit:"1 Kg",emoji:"🧂"},
    {id:48,name:"Salt",category:"Other",price:25,unit:"1 Kg",emoji:"🧂"},
    {id:49,name:"Tea Powder",category:"Other",price:120,unit:"250 g",emoji:"🍵"},
    {id:50,name:"Coffee Powder",category:"Other",price:150,unit:"250 g",emoji:"☕"},
    {id:51,name:"Cooking Oil",category:"Other",price:140,unit:"1 Litre",emoji:"🫗"},
    {id:52,name:"Turmeric Powder",category:"Other",price:35,unit:"100 g",emoji:"🟡"},
    {id:53,name:"Chilli Powder",category:"Other",price:45,unit:"100 g",emoji:"🌶️"},
    {id:54,name:"Garam Masala",category:"Other",price:55,unit:"100 g",emoji:"🫙"},
    {id:55,name:"Honey",category:"Other",price:130,unit:"250 g",emoji:"🍯"},
    {id:56,name:"Almonds",category:"Other",price:180,unit:"250 g",emoji:"🥜"},
    {id:57,name:"Cashews",category:"Other",price:220,unit:"250 g",emoji:"🥜"},
    {id:58,name:"Coconut",category:"Other",price:35,unit:"1 Piece",emoji:"🥥"},
    {id:59,name:"Bread",category:"Other",price:40,unit:"1 Pack",emoji:"🍞"},
    {id:60,name:"Peanut Butter",category:"Other",price:150,unit:"340 g",emoji:"🥜"}
];

// ============================================
// 2. SAVE DATA
// ============================================

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ============================================
// 3. TOAST MESSAGE
// ============================================

function showToast(message) {
    const toast = $("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("hidden");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

// ============================================
// 4. LOGIN AND REGISTER
// ============================================

function updateAuthMode() {
    isRegisterMode = !isRegisterMode;

    $("authTitle").textContent = isRegisterMode
        ? "Create Account"
        : "Welcome Back!";

    $("authDescription").textContent = isRegisterMode
        ? "Register to start shopping."
        : "Login to continue shopping.";

    $("authSubmitBtn").textContent = isRegisterMode
        ? "Register"
        : "Login";

    $("authSwitchText").textContent = isRegisterMode
        ? "Already have an account?"
        : "New to CodePlus?";

    $("showRegister").textContent = isRegisterMode
        ? "Login"
        : "Create Account";
}

$("showRegister")?.addEventListener("click", function(e) {
    e.preventDefault();
    updateAuthMode();
});

$("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = $("email").value.trim().toLowerCase();
    const password = $("password").value.trim();

    if (!email || !password) {
        showToast("Please enter email and password.");
        return;
    }

    if (isRegisterMode) {
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            showToast("Account already exists. Please login.");
            return;
        }

        users.push({email, password});
        saveUsers();

        showToast("Account created successfully!");

        updateAuthMode();
        $("password").value = "";
        return;
    }

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        showToast("Invalid login. Please register first.");
        return;
    }

    currentUser = email;
    localStorage.setItem(SESSION_KEY, currentUser);

    openApplication();
});

function openApplication() {
    $("loginPage")?.classList.add("hidden");
    $("homePage")?.classList.remove("hidden");

    if ($("welcomeUser")) {
        $("welcomeUser").textContent =
            "Welcome, " + currentUser.split("@")[0];
    }

    renderAll();
    showPage("home");
}

$("logoutBtn")?.addEventListener("click", function() {
    localStorage.removeItem(SESSION_KEY);
    currentUser = "";

    $("homePage")?.classList.add("hidden");
    $("loginPage")?.classList.remove("hidden");

    $("loginForm")?.reset();
    showToast("Logged out successfully.");
});

// ============================================
// 5. PASSWORD EYE ICON
// ============================================

$("togglePassword")?.addEventListener("click", function() {
    const password = $("password");
    const eye = $("eyeIcon");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
        if (eye) eye.textContent = "🙈";
        this.setAttribute("aria-label", "Hide password");
    } else {
        password.type = "password";
        if (eye) eye.textContent = "👁";
        this.setAttribute("aria-label", "Show password");
    }
});

// ============================================
// 6. PAGE NAVIGATION
// ============================================

function showPage(page) {
    const pages = {
        home: "homeView",
        products: "productsView",
        cart: "cartView",
        checkout: "checkoutView",
        orders: "ordersView"
    };

    Object.values(pages).forEach(id => {
        $(id)?.classList.add("hidden");
    });

    if (pages[page]) {
        $(pages[page])?.classList.remove("hidden");
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    if (page === "cart") renderCart();
    if (page === "orders") renderOrders();
    if (page === "products") renderProducts();
    if (page === "home") renderHomeProducts();

    window.scrollTo({top: 0, behavior: "smooth"});
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

$("shopNowBtn")?.addEventListener("click", () => {
    selectedCategory = "All";
    showPage("products");
});

$("continueShoppingBtn")?.addEventListener("click", () => {
    showPage("products");
});

// ============================================
// 7. PRODUCT CARD
// ============================================

function createProductCard(product) {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return `
        <article class="product-card">
            <div class="product-image">
                <span>${product.emoji}</span>
                <span class="product-category">${product.category}</span>
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.unit}</p>

                <div class="product-bottom">
                    <strong>₹${product.price.toFixed(2)}</strong>

                    ${
                        quantity > 0
                        ? `<span class="in-cart-label">In cart: ${quantity}</span>`
                        : ""
                    }
                </div>

                <button
                    class="primary-btn add-cart-btn"
                    data-id="${product.id}"
                    type="button">
                    ${quantity > 0 ? "Add More +" : "Add to Cart"}
                </button>
            </div>
        </article>
    `;
}

// ============================================
// 8. DISPLAY PRODUCTS
// ============================================

function renderProducts() {
    const grid = $("productGrid");
    if (!grid) return;

    let filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filteredProducts.length
        ? filteredProducts.map(createProductCard).join("")
        : "";

    $("noProductsMessage")?.classList.toggle(
        "hidden",
        filteredProducts.length > 0
    );
}

function renderHomeProducts() {
    const grid = $("homeProducts");
    if (!grid) return;

    const popularProducts = products.slice(0, 8);

    grid.innerHTML = popularProducts
        .map(createProductCard)
        .join("");
}

// ============================================
// 9. CATEGORY FILTER
// ============================================

function selectCategory(category) {
    selectedCategory = category;

    document.querySelectorAll(".category-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === category
        );
    });

    showPage("products");
    renderProducts();
}

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectCategory(button.dataset.category);
    });
});

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        selectCategory(button.dataset.category);
    });
});

// ============================================
// 10. SEARCH
// ============================================

$("searchInput")?.addEventListener("input", function() {
    searchText = this.value.trim();

    if ($("productsView")?.classList.contains("hidden")) {
        showPage("products");
    } else {
        renderProducts();
    }
});

$("searchBtn")?.addEventListener("click", () => {
    searchText = $("searchInput")?.value.trim() || "";
    showPage("products");
});

// ============================================
// 11. ADD TO CART
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            emoji: product.emoji,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    renderAll();

    showToast(product.name + " added to cart!");
}

document.addEventListener("click", function(e) {
    const addButton = e.target.closest(".add-cart-btn");

    if (addButton) {
        const id = Number(addButton.dataset.id);
        addToCart(id);
    }
});

// ============================================
// 12. CART DISPLAY
// ============================================

function calculateSubtotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function renderCart() {
    const cartContainer = $("cartItems");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p class="empty-message">
                Your cart is empty. Start shopping!
            </p>
        `;
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-product-icon">${item.emoji}</div>

                <div class="cart-product-info">
                    <h3>${item.name}</h3>
                    <p>${item.unit}</p>
                    <strong>₹${item.price.toFixed(2)}</strong>
                </div>

                <div class="quantity-controls">
                    <button type="button"
                        class="quantity-btn"
                        data-action="decrease"
                        data-id="${item.id}">−</button>

                    <span>${item.quantity}</span>

                    <button type="button"
                        class="quantity-btn"
                        data-action="increase"
                        data-id="${item.id}">+</button>
                </div>

                <strong>
                    ₹${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button type="button"
                    class="remove-cart-btn"
                    data-id="${item.id}">
                    Remove
                </button>
            </div>
        `).join("");
    }

    const subtotal = calculateSubtotal();
    const delivery = subtotal > 0 ? 30 : 0;
    const total = subtotal + delivery;

    if ($("cartSubtotal")) {
        $("cartSubtotal").textContent = "₹" + subtotal.toFixed(2);
    }

    if ($("deliveryCharge")) {
        $("deliveryCharge").textContent = "₹" + delivery.toFixed(2);
    }

    if ($("cartTotal")) {
        $("cartTotal").textContent = "₹" + total.toFixed(2);
    }

    if ($("checkoutTotal")) {
        $("checkoutTotal").textContent = "₹" + total.toFixed(2);
    }

    if ($("checkoutBtn")) {
        $("checkoutBtn").disabled = cart.length === 0;
    }

    updateCartCount();
}

// ============================================
// 13. CHANGE CART QUANTITY
// ============================================

document.addEventListener("click", function(e) {
    const quantityButton = e.target.closest(".quantity-btn");

    if (!quantityButton) return;

    const id = Number(quantityButton.dataset.id);
    const action = quantityButton.dataset.action;

    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity += 1;
    }

    if (action === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }

    saveCart();
    renderAll();
});

document.addEventListener("click", function(e) {
    const removeButton = e.target.closest(".remove-cart-btn");

    if (!removeButton) return;

    const id = Number(removeButton.dataset.id);

    cart = cart.filter(item => item.id !== id);

    saveCart();
    renderAll();

    showToast("Product removed from cart.");
});

// ============================================
// 14. CART COUNT
// ============================================

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if ($("cartCount")) $("cartCount").textContent = count;
    if ($("pendingCount")) $("pendingCount").textContent = count;
}

// ============================================
// 15. CHECKOUT
// ============================================

$("checkoutBtn")?.addEventListener("click", function() {
    if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
    }

    $("checkoutTotal").textContent =
        "₹" + (calculateSubtotal() + 30).toFixed(2);

    showPage("checkout");
});

$("backToCartBtn")?.addEventListener("click", () => {
    showPage("cart");
});

// ============================================
// 16. PLACE ORDER
// ============================================

$("checkoutForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showToast("Please add products before checkout.");
        showPage("products");
        return;
    }

    const name = $("customerName").value.trim();
    const phone = $("phoneNumber").value.trim();
    const address = $("deliveryAddress").value.trim();
    const payment = $("paymentMethod").value;

    if (!name || !phone || !address) {
        showToast("Please complete all delivery details.");
        return;
    }

    const subtotal = calculateSubtotal();
    const delivery = 30;

    const newOrder = {
        orderId: "CP" + Date.now(),
        customerName: name,
        phone: phone,
        address: address,
        payment: payment,
        items: [...cart],
        subtotal: subtotal,
        delivery: delivery,
        total: subtotal + delivery,
        status: "Order Placed",
        date: new Date().toLocaleString()
    };

    orders.unshift(newOrder);
    saveOrders();

    cart = [];
    saveCart();

    $("checkoutForm").reset();

    renderAll();
    showPage("orders");

    showToast("Order placed successfully!");
});

// ============================================
// 17. DISPLAY ORDERS
// ============================================

function renderOrders() {
    const container = $("ordersList");
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                You haven't placed any orders yet.
            </p>
        `;
        return;
    }

    container.innerHTML = orders.map(order => `
        <article class="order-card">
            <div class="order-header">
                <div>
                    <h3>Order #${order.orderId}</h3>
                    <p>${order.date}</p>
                </div>
                <span class="order-status">${order.status}</span>
            </div>

            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Payment:</strong> ${order.payment}</p>

            <div class="order-products">
                ${order.items.map(item => `
                    <p>
                        ${item.emoji} ${item.name}
                        × ${item.quantity}
                        — ₹${(item.price * item.quantity).toFixed(2)}
                    </p>
                `).join("")}
            </div>

            <h3 class="order-total">
                Total: ₹${order.total.toFixed(2)}
            </h3>
        </article>
    `).join("");
}

// ============================================
// 18. DASHBOARD
// ============================================

function renderDashboard() {
    if ($("totalCount")) {
        $("totalCount").textContent = products.length;
    }

    if ($("pendingCount")) {
        $("pendingCount").textContent =
            cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if ($("purchasedCount")) {
        $("purchasedCount").textContent = orders.length;
    }

    if ($("frequentCount")) {
        $("frequentCount").textContent = 0;
    }
}

// ============================================
// 19. RENDER EVERYTHING
// ============================================

function renderAll() {
    renderHomeProducts();
    renderProducts();
    renderCart();
    renderOrders();
    renderDashboard();
    updateCartCount();
}

// ============================================
// 20. INITIAL APPLICATION LOAD
// ============================================

if (currentUser) {
    openApplication();
} else {
    $("loginPage")?.classList.remove("hidden");
    $("homePage")?.classList.add("hidden");
}

