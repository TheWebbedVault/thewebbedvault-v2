/* ==========================================================
   THE WEBBED VAULT
   PRODUCT PAGE
========================================================== */

"use strict";

/* ==========================================================
GET PRODUCT
========================================================== */

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = Store.getProduct(productId);

/* ==========================================================
PRODUCT NOT FOUND
========================================================== */

if (!product) {

    document.body.innerHTML = `

        <h1 style="text-align:center;margin-top:100px;">

            Product not found.

        </h1>

    `;

    throw new Error("Product not found.");

}

/* ==========================================================
ELEMENTS
========================================================== */

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productDescription = document.getElementById("productDescription");

const productBadge = document.getElementById("productBadge");

const productShipping = document.getElementById("productShipping");

const productReturns = document.getElementById("productReturns");

const productFeatures = document.getElementById("productFeatures");

const productCartBtn = document.getElementById("productCartBtn");

const productWishlistBtn = document.getElementById("productWishlistBtn");

const mainImage = document.getElementById("mainImage");

const thumbnails = document.getElementById("thumbnails");

const relatedProducts = document.getElementById("relatedProducts");

/* ==========================================================
PRODUCT INFORMATION
========================================================== */

productName.textContent = product.name;

productPrice.textContent = `£${product.price.toFixed(2)}`;

productDescription.textContent = product.description;

productBadge.textContent = product.badge;

productShipping.textContent = product.shipping;

productReturns.textContent = product.returns;

if (productCartBtn) {

    productCartBtn.dataset.id = product.id;

}

if (productWishlistBtn && Store.isInWishlist(product.id)) {

    productWishlistBtn.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

}
/* ==========================================================
FEATURES
========================================================== */

if (product.features && productFeatures) {

    productFeatures.innerHTML = "";

    product.features.forEach(feature => {

        const li = document.createElement("li");

        li.textContent = `✓ ${feature}`;

        productFeatures.appendChild(li);

    });

}

/* ==========================================================
MAIN IMAGE
========================================================== */

mainImage.src = `../${product.image}`;

mainImage.alt = product.name;

/* ==========================================================
IMAGE GALLERY
========================================================== */

function setMainImage(image) {

    mainImage.classList.add("changing");

    setTimeout(() => {

        mainImage.src = `../${image}`;

    }, 150);

}

mainImage.addEventListener("load", () => {

    mainImage.classList.remove("changing");

});

if (thumbnails && product.images) {

    thumbnails.innerHTML = "";

    product.images.forEach((image, index) => {

        const thumbnail = document.createElement("img");

        thumbnail.src = `../${image}`;

        thumbnail.alt = `${product.name} ${index + 1}`;

        thumbnail.classList.add("thumbnail");

        if (index === 0) {

            thumbnail.classList.add("active");

        }

        thumbnail.addEventListener("click", () => {

            setMainImage(image);

            document
                .querySelectorAll(".thumbnail")
                .forEach(img => img.classList.remove("active"));

            thumbnail.classList.add("active");

        });

        thumbnails.appendChild(thumbnail);

    });

}

/* ==========================================================
ADD TO CART
========================================================== */

if (productCartBtn) {

    productCartBtn.addEventListener("click", () => {

        Store.addToCart(product.id);

        Store.showToast("Added to cart 🛒");

    });

}

if (productWishlistBtn) {

    productWishlistBtn.addEventListener("click", () => {

        if (Store.isInWishlist(product.id)) {

            Store.removeFromWishlist(product.id);

            Store.showToast("Removed from wishlist ❤️");

            productWishlistBtn.innerHTML =
                '<i class="fa-regular fa-heart"></i>';

        } else {

            Store.addToWishlist(product.id);

            Store.showToast("Added to wishlist ❤️");

            productWishlistBtn.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

        }

    });

}
/* ==========================================================
RELATED PRODUCTS
========================================================== */

function renderRelatedProducts() {

    if (!relatedProducts) return;

    const related = Store.getProducts()

        .filter(item => {

            return (
                item.category === product.category &&
                item.id !== product.id
            );

        })

        .slice(0, 4);

    relatedProducts.innerHTML = related.map(item => `

        <div class="product-card">

            <a href="product.html?id=${item.id}">

                <img
                    src="../${item.image}"
                    alt="${item.name}">

            </a>

            <span class="badge">

                ${item.badge}

            </span>

            <h3>${item.name}</h3>

            <p>£${item.price.toFixed(2)}</p>

            <button
                class="cart-btn"
                data-id="${item.id}">

                🛒 Add to Cart

            </button>

        </div>

    `).join("");

    relatedProducts
        .querySelectorAll(".cart-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                Store.addToCart(id);

                Store.showToast("Added to cart 🛒");

            });

        });

}

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderRelatedProducts();

});
/* ==========================================================
   TEST IMAGE HOVER
========================================================== */

const imageContainer = document.querySelector(".main-product-image");

console.log(imageContainer);

imageContainer.addEventListener("mouseenter", () => {

    console.log("ENTER");

    mainImage.classList.add("zoomed");

});

imageContainer.addEventListener("mouseleave", () => {

    console.log("LEAVE");

    mainImage.classList.remove("zoomed");

});