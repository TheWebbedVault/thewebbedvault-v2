/* ==========================================================
   THE WEBBED VAULT
   SHOP.JS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTS
========================================================== */

const productsContainer = document.getElementById("productsContainer");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.getElementById("searchInput");

/* ==========================================================
PAGE CATEGORY
========================================================== */

function getPageCategory() {

    const page = window.location.pathname.toLowerCase();

    if (page.includes("masks")) {

        return "Masks";

    }

    if (page.includes("gloves")) {

        return "Gloves";

    }

    if (page.includes("webshooters")) {

        return "Web Shooters";

    }

    if (page.includes("comics")) {

        return "Comics";

    }

    if (page.includes("collectibles")) {

        return "Collectibles";

    }

    return null;

}

/* ==========================================================
CREATE PRODUCT CARD
========================================================== */

function createProductCard(product) {

    return `

        <article class="product">

            <a
                href="Product.html?id=${product.id}"
                class="product-image">

                <img
                    src="../${product.image}"
                    alt="${product.name}"
                    loading="lazy">

            </a>

            <span class="product-badge">

                ${product.badge}

            </span>

            <h3>

                <a href="Product.html?id=${product.id}">

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

        </article>

    `;

}

/* ==========================================================
RENDER PRODUCTS
========================================================== */

function renderProducts(productList) {

    if (!productsContainer) return;

    if (productList.length === 0) {

        productsContainer.innerHTML = `

            <div class="no-products">

                <h2>

                    No products found

                </h2>

                <p>

                    Try another search or browse a different category.

                </p>

            </div>

        `;

        return;

    }

    productsContainer.innerHTML = productList

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

                Store.showToast("Already in your wishlist ❤️");

            }

            if (typeof Store.updateWishlistCount === "function") {

                Store.updateWishlistCount();

            }

        });

    });

    document.querySelectorAll(".cart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            Store.addToCart(id);

            Store.showToast("Added to cart 🛒");

            if (typeof Store.updateCartCount === "function") {

                Store.updateCartCount();

            }

        });

    });

}

/* ==========================================================
CATEGORY FILTER
========================================================== */

function filterProducts(category) {

    let products = Store.getProducts();

    if (category !== "All") {

        products = products.filter(product => product.category === category);

    }

    renderProducts(products);

}

if (filterButtons.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            filterProducts(button.dataset.filter);

        });

    });

}

/* ==========================================================
SEARCH
========================================================== */

function searchProducts(query) {

    const search = query.trim().toLowerCase();

    let products = Store.getProducts();

    const pageCategory = getPageCategory();

    if (pageCategory) {

        products = products.filter(product => product.category === pageCategory);

    }

    if (search !== "") {

        products = products.filter(product => {

            const searchableText = [

                product.name,
                product.category,
                product.badge || "",
                product.description || "",
                ...(product.features || [])

            ]

            .join(" ")

            .toLowerCase();

            return searchableText.includes(search);

        });

    }

    renderProducts(products);

}

if (searchInput) {

    searchInput.addEventListener("input", () => {

        searchProducts(searchInput.value);

    });

}

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    let products = Store.getProducts();

    /* ======================================================
       PAGE CATEGORY
    ====================================================== */

    const pageCategory = getPageCategory();

    if (pageCategory) {

        products = products.filter(product => {

            return product.category === pageCategory;

        });

    }

    /* ======================================================
       SEARCH FROM URL
    ====================================================== */

    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");

    if (search) {

        if (searchInput) {

            searchInput.value = search;

        }

        const query = search.toLowerCase();

        products = products.filter(product => {

            const searchableText = [

                product.name,
                product.category,
                product.badge || "",
                product.description || "",
                ...(product.features || [])

            ]

                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);

        });

    }

    /* ======================================================
       RENDER PRODUCTS
    ====================================================== */

    renderProducts(products);

    /* ======================================================
       UPDATE COUNTS
    ====================================================== */

    if (typeof Store.updateCartCount === "function") {

        Store.updateCartCount();

    }

    if (typeof Store.updateWishlistCount === "function") {

        Store.updateWishlistCount();

    }

});