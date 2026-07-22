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

const searchInput =
    document.getElementById("shopSearch") ||
    document.getElementById("searchInput");

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

        <div class="product-image-wrapper">

            <span class="product-badge">

                ${product.badge}

            </span>

            <button
                class="wishlist-floating wishlist-btn"
                data-id="${product.id}"
                aria-label="Add to Wishlist">

                <i class="fa-regular fa-heart"></i>

            </button>

            <a
                href="Product.html?id=${product.id}"
                class="product-image">

                <img
                    src="../${product.image}"
                    alt="${product.name}"
                    loading="lazy">

            </a>

        </div>

        <div class="product-content">

            <div class="product-rating">

                ⭐⭐⭐⭐⭐

                <span>(4.9)</span>

            </div>

            <h3>

                <a href="Product.html?id=${product.id}">

                    ${product.name}

                </a>

            </h3>

            <p class="price">

                £${product.price.toFixed(2)}

            </p>

            <button
                class="cart-btn full-cart-btn"
                data-id="${product.id}">

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
   SHOP STATE
========================================================== */

let selectedCategory = "All";
let searchQuery = "";
let sortOption = "featured";

/* ==========================================================
   EXTRA ELEMENTS
========================================================== */

const sortSelect = document.getElementById("sortProducts");
const productCount = document.getElementById("productCount");

/* ==========================================================
   UPDATE SHOP
========================================================== */

function updateShop() {

    let products = [...Store.getProducts()];

    const pageCategory = getPageCategory();

    if (pageCategory) {

        products = products.filter(product =>
            product.category === pageCategory
        );

    }

    if (selectedCategory !== "All") {

        products = products.filter(product =>
            product.category === selectedCategory
        );

    }

    if (searchQuery !== "") {

        const query = searchQuery.toLowerCase();

        products = products.filter(product => {

            const text = [

                product.name,
                product.category,
                product.badge || "",
                product.description || "",
                ...(product.features || [])

            ].join(" ").toLowerCase();

            return text.includes(query);

        });

    }

    switch (sortOption) {

        case "low-high":

            products.sort((a,b)=>a.price-b.price);

            break;

        case "high-low":

            products.sort((a,b)=>b.price-a.price);

            break;

        case "name":

            products.sort((a,b)=>
                a.name.localeCompare(b.name)
            );

            break;

        case "newest":

            products.reverse();

            break;

        default:

            break;

    }

    renderProducts(products);

    if(productCount){

        productCount.textContent = products.length;

    }

}

/* ==========================================================
   FILTER BUTTONS
========================================================== */

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        updateShop();

    });

});

/* ==========================================================
   SEARCH
========================================================== */

if(searchInput){

    searchInput.addEventListener("input",e=>{

        searchQuery = e.target.value.trim();

        updateShop();

    });

}

/* ==========================================================
   SORT
========================================================== */

if(sortSelect){

    sortSelect.addEventListener("change",e=>{

        sortOption = e.target.value;

        updateShop();

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

    updateShop();

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