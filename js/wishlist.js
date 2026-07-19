/* ==========================================================
   THE WEBBED VAULT
   WISHLIST.JS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTS
========================================================== */

const wishlistContainer = document.querySelector("#wishlistItems");

const wishlistTotal = document.querySelector("#wishlistTotal");

/* ==========================================================
WISHLIST ITEM
========================================================== */

function createWishlistItem(product) {

    return `

        <div class="cart-item">

            <img
                src="../${product.image}"
                alt="${product.name}">

            <div class="cart-info">

                <h3>

                    <a href="product.html?id=${product.id}">

                        ${product.name}

                    </a>

                </h3>

                <p>

                    £${product.price.toFixed(2)}

                </p>

                <div class="wishlist-actions">

                    <button
                        class="cart-btn move-to-cart"
                        data-id="${product.id}">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Move to Cart

                    </button>

                    <button
                        class="remove-item"
                        data-id="${product.id}">

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>

            </div>

        </div>

    `;

}

/* ==========================================================
RENDER WISHLIST
========================================================== */

function renderWishlist() {

    if (!wishlistContainer) return;

    const wishlist = Store.getWishlist();

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-regular fa-heart"></i>

                <h2>

                    Your wishlist is empty

                </h2>

                <p>

                    Save your favourite Spider-Man items here.

                </p>

                <a
                    href="shop.html"
                    class="continue-shopping">

                    Continue Shopping

                </a>

            </div>

        `;

        if (wishlistTotal) {

            wishlistTotal.textContent = "0 Items";

        }

        return;

    }

    wishlistContainer.innerHTML = wishlist
        .map(createWishlistItem)
        .join("");

            if (wishlistTotal) {

        const count = wishlist.length;

        wishlistTotal.textContent = `${count} Item${count !== 1 ? "s" : ""}`;

    }

    Store.updateWishlistCount();

}

/* ==========================================================
WISHLIST EVENTS
========================================================== */

document.addEventListener("click", event => {

    const moveButton = event.target.closest(".move-to-cart");

    if (moveButton) {

        const id = Number(moveButton.dataset.id);

        const product = Store.getProduct(id);

        Store.addToCart(id);

        Store.removeFromWishlist(id);

        renderWishlist();

        Store.updateCartCount();

        Store.updateWishlistCount();

        if (product) {

            Store.showToast(`${product.name} moved to cart 🛒`);

        }

        return;

    }

    const removeButton = event.target.closest(".remove-item");

    if (removeButton) {

        const id = Number(removeButton.dataset.id);

        const product = Store.getProduct(id);

        Store.removeFromWishlist(id);

        renderWishlist();

        Store.updateWishlistCount();

        if (product) {

            Store.showToast(`${product.name} removed from wishlist ❤️`);

        }

    }

});

/* ==========================================================
CLEAR WISHLIST
========================================================== */

const clearWishlistButton = document.querySelector("#clearWishlist");

if (clearWishlistButton) {

    clearWishlistButton.addEventListener("click", () => {

        if (Store.getWishlist().length === 0) return;

        Store.clearWishlist();

        renderWishlist();

        Store.updateWishlistCount();

        Store.showToast("Wishlist cleared ❤️");

    });

}

/* ==========================================================
SYNC ACROSS TABS
========================================================== */

window.addEventListener("storage", () => {

    Store.reset();

    renderWishlist();

});

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Store.updateWishlistCount();

    renderWishlist();

});