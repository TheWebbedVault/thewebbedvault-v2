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

            <a
                href="Html/product.html?id=${product.id}"
                class="product-image">

                <span class="product-badge">

                    ${product.badge}

                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

            </a>

            <div class="product-content">

                <h3>

                    <a href="Html/product.html?id=${product.id}">

                        ${product.name}

                    </a>

                </h3>

                <p class="price">

                    £${product.price.toFixed(2)}

                </p>

                <div class="product-buttons">

                    <button
                        class="wishlist-btn"
                        data-id="${product.id}"
                        aria-label="Add ${product.name} to wishlist">

                        <i class="fa-regular fa-heart"></i>

                    </button>

                    <button
                        class="cart-btn"
                        data-id="${product.id}"
                        aria-label="Add ${product.name} to cart">

                        🛒 Add to Cart

                    </button>

                </div>

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

    const wishlistButton = event.target.closest(".wishlist-btn");

    if (wishlistButton) {

        event.preventDefault();

        const id = Number(wishlistButton.dataset.id);

        if (Store.addToWishlist(id)) {

            Store.showToast("Added to wishlist ❤️");

        } else {

            Store.showToast("Already in wishlist ❤️");

        }

        return;

    }

    const cartButton = event.target.closest(".cart-btn");

    if (cartButton) {

        event.preventDefault();

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