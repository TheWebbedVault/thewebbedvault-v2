/* ==========================================================
   THE WEBBED VAULT
   SHOP.JS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTS
========================================================== */

const shopContainer = document.querySelector(".shop-products");
const filterButtons = document.querySelectorAll(".filter-btn");

/* ==========================================================
PRODUCT CARD
========================================================== */

function createProductCard(product) {

    return `

        <div class="product" data-category="${product.category}">

            <a href="product.html?id=${product.id}" class="product-image">

                <img
                    src="../${product.image}"
                    alt="${product.name}">

            </a>

            <span class="product-badge">

                ${product.badge}

            </span>

            <h3>

                <a href="product.html?id=${product.id}">

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

                    ❤ Wishlist

                </button>

                <button
                    class="cart-btn"
                    data-id="${product.id}"
                    aria-label="Add ${product.name} to cart">

                    🛒 Add to Cart

                </button>

            </div>

        </div>

    `;

}

/* ==========================================================
RENDER PRODUCTS
========================================================== */

function renderProducts(productList = Store.getProducts()) {

    if (!shopContainer) return;

    shopContainer.innerHTML = productList
        .map(createProductCard)
        .join("");

    initialiseButtons();

}

/* ==========================================================
BUTTON EVENTS
========================================================== */

function initialiseButtons() {

    document.querySelectorAll(".wishlist-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            if (Store.addToWishlist(id)) {

                Store.showToast("Added to wishlist ❤️");

            } else {

                Store.showToast("Already in wishlist ❤️");

            }

        });

    });

    document.querySelectorAll(".cart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            Store.addToCart(id);

            Store.showToast("Added to cart 🛒");

        });

    });

}

/* ==========================================================
CATEGORY FILTERS
========================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        if (filter === "All") {

            renderProducts();

            return;

        }

        renderProducts(

            Store.getProducts().filter(product => product.category === filter)

        );

    });

});

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

});