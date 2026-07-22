/* ==========================================================
   THE WEBBED VAULT
   HOMEPAGE.JS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTS
========================================================== */

const featuredProductsContainer = document.querySelector("#featuredProducts");

const newDropsContainer = document.querySelector("#newDrops");

/* ==========================================================
PRODUCT CARD
========================================================== */

function createProductCard(product) {

    return `

        <article
            class="product"
            data-id="${product.id}">

            <div class="product-image-wrapper">

                <span class="product-badge">

                    ${product.badge}

                </span>

                <button
                    class="wishlist-floating"
                    data-id="${product.id}"
                    aria-label="Add ${product.name} to wishlist">

                    <i class="fa-regular fa-heart"></i>

                </button>

                <a
                    href="Html/product.html?id=${product.id}"
                    class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">

                </a>

            </div>

            <div class="product-content">

                <h3>

                    <a href="Html/product.html?id=${product.id}">

                        ${product.name}

                    </a>

                </h3>

                <p class="price">

                    £${product.price.toFixed(2)}

                </p>

                <button
                    class="full-cart-btn"
                    data-id="${product.id}"
                    aria-label="Add ${product.name} to cart">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

            </div>

        </article>

    `;

}

/* ==========================================================
RENDER PRODUCTS
========================================================== */

function renderProducts(container, filter) {

    if (!container) return;

    container.innerHTML = Store
        .getProducts()
        .filter(filter)
        .map(createProductCard)
        .join("");

}

/* ==========================================================
FEATURED PRODUCTS
========================================================== */

renderProducts(

    featuredProductsContainer,

    product => product.featured

);

/* ==========================================================
NEW DROPS
========================================================== */

renderProducts(

    newDropsContainer,

    product => product.badge === "New Drop"

);

/* ==========================================================
BEST SELLERS
(Ready if you add a section later)
========================================================== */

const bestSellersContainer = document.querySelector("#bestSellers");

renderProducts(

    bestSellersContainer,

    product => product.badge === "Best Seller"

);

/* ==========================================================
BUTTON EVENTS
========================================================== */

document.addEventListener("click", event => {

    const wishlistButton = event.target.closest(".wishlist-floating");

    if (wishlistButton) {

        event.preventDefault();

        event.stopPropagation();

        const id = Number(wishlistButton.dataset.id);

        if (Store.addToWishlist(id)) {

            Store.showToast("Added to wishlist ❤️");

        } else {

            Store.showToast("Already in wishlist ❤️");

        }

        return;

    }

    const cartButton = event.target.closest(".full-cart-btn");

    if (cartButton) {

        event.preventDefault();

        event.stopPropagation();

        const id = Number(cartButton.dataset.id);

        Store.addToCart(id);

        Store.showToast("Added to cart 🛒");

    }

});
/* ==========================================================
PRODUCT CARD NAVIGATION
========================================================== */

document.addEventListener("click", event => {

    const productCard = event.target.closest(".product");

    if (!productCard) return;

    if (event.target.closest("button")) return;

    if (event.target.closest("a")) return;

    window.location.href = `Html/product.html?id=${productCard.dataset.id}`;

});

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Store.updateCartCount();

    Store.updateWishlistCount();

});

/* ==========================================================
   HOMEPAGE SEARCH
========================================================== */

const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".nav-search button");

function performSearch() {

    if (!searchInput) return;

    const query = searchInput.value.trim();

    if (query === "") return;

    window.location.href =
        `Html/Shop.html?search=${encodeURIComponent(query)}`;

}

if (searchInput) {

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            performSearch();

        }

    });

}

if (searchButton) {

    searchButton.addEventListener("click", performSearch);

}

// =========================================
// Smooth Navbar Effects
// =========================================

const header = document.querySelector(".header");

let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {

    const currentScroll = window.scrollY;

    // Shrink
    if (currentScroll > 60) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }

    // Hide / Show
    if (currentScroll > lastScrollY && currentScroll > 150) {
        header.classList.add("hide");
    } else if (currentScroll < lastScrollY) {
        header.classList.remove("hide");
    }

    lastScrollY = currentScroll;
    ticking = false;
}

window.addEventListener("scroll", () => {

    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }

});