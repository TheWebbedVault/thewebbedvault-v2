/* ==========================================================
   THE WEBBED VAULT
   STORE.JS
   Central Store Manager
========================================================== */

const Store = (() => {

    "use strict";

    /* ==========================================================
       STORAGE KEYS
    ========================================================== */

    const CART_KEY = "cart";
    const WISHLIST_KEY = "wishlist";

    /* ==========================================================
       LOCAL STORAGE
    ========================================================== */

    function load(key) {

        try {

            const data = localStorage.getItem(key);

            return data ? JSON.parse(data) : [];

        } catch (error) {

            console.error(`Failed to load ${key}:`, error);

            return [];

        }

    }

    function save(key, data) {

        try {

            localStorage.setItem(key, JSON.stringify(data));

        } catch (error) {

            console.error(`Failed to save ${key}:`, error);

        }

    }

    /* ==========================================================
       STORE STATE
    ========================================================== */

    let cart = load(CART_KEY);

    let wishlist = load(WISHLIST_KEY);

    /* ==========================================================
       PRODUCTS
    ========================================================== */

    function getProducts() {

        return products;

    }

    function getProduct(id) {

        return products.find(product => product.id === Number(id));

    }

    /* ==========================================================
       CART
    ========================================================== */

    function getCart() {

        return cart;

    }

    function addToCart(id) {

        const product = getProduct(id);

        if (!product) return false;

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                ...product,

                quantity: 1

            });

        }

        save(CART_KEY, cart);

        updateCartCount();

        return true;

    }

    function removeFromCart(id) {

        cart = cart.filter(item => item.id !== Number(id));

        save(CART_KEY, cart);

        updateCartCount();

    }

    function clearCart() {

        cart = [];

        save(CART_KEY, cart);

        updateCartCount();

    }

    function updateQuantity(id, change) {

        const item = cart.find(item => item.id === Number(id));

        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {

            removeFromCart(id);

            return;

        }

        save(CART_KEY, cart);

        updateCartCount();

    }

        /* ==========================================================
       WISHLIST
    ========================================================== */

    function getWishlist() {

        return wishlist;

    }

    function addToWishlist(id) {

        const product = getProduct(id);

        if (!product) return false;

        const exists = wishlist.some(item => item.id === product.id);

        if (exists) {

            return false;

        }

        wishlist.push(product);

        save(WISHLIST_KEY, wishlist);

        updateWishlistCount();

        return true;

    }

    function removeFromWishlist(id) {

        wishlist = wishlist.filter(item => item.id !== Number(id));

        save(WISHLIST_KEY, wishlist);

        updateWishlistCount();

    }

    function clearWishlist() {

        wishlist = [];

        save(WISHLIST_KEY, wishlist);

        updateWishlistCount();

    }

    /* ==========================================================
       COUNTERS
    ========================================================== */

    function updateCartCount() {

        const counter = document.querySelector("#cartCount");

        if (!counter) return;

        const totalItems = cart.reduce((total, item) => {

            return total + item.quantity;

        }, 0);

        counter.textContent = totalItems;

    }

    function updateWishlistCount() {

        const counter = document.querySelector("#wishlistCount");

        if (!counter) return;

        counter.textContent = wishlist.length;

    }

    /* ==========================================================
       HELPERS
    ========================================================== */

    function isInCart(id) {

        return cart.some(item => item.id === Number(id));

    }

    function isInWishlist(id) {

        return wishlist.some(item => item.id === Number(id));

    }

    function getCartTotal() {

        return cart.reduce((total, item) => {

            return total + (item.price * item.quantity);

        }, 0);

    }

    function getCartQuantity() {

        return cart.reduce((total, item) => {

            return total + item.quantity;

        }, 0);

    }

       /* ==========================================================
       TOAST NOTIFICATIONS
    ========================================================== */

    function showToast(message, duration = 2500) {

        const existingToast = document.querySelector(".toast");

        if (existingToast) {

            existingToast.remove();

        }

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.textContent = message;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, duration);

    }

    /* ==========================================================
       RESET
    ========================================================== */

    function reset() {

        cart = load(CART_KEY);

        wishlist = load(WISHLIST_KEY);

        updateCartCount();

        updateWishlistCount();

    }

    /* ==========================================================
       INITIALISE
    ========================================================== */

    function init() {

        reset();

    }

    init();

    /* ==========================================================
       PUBLIC API
    ========================================================== */

    return {

        /* Products */
        getProducts,
        getProduct,

        /* Cart */
        getCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotal,
        getCartQuantity,
        isInCart,

        /* Wishlist */
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,

        /* UI */
        updateCartCount,
        updateWishlistCount,
        showToast,

        /* Helpers */
        reset

    };

})();