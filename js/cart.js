/* ==========================================================
   THE WEBBED VAULT
   CART.JS
========================================================== */

"use strict";

const ECWID_PRODUCT_IDS = {
    "Amazing 1 Mask": 846610119,
    "Amazing 2 Mask": 846610118,
    "Black Symbiote Mask": 846610124,
    "Brand New Day Mask": 846610122,
    "Spider-Verse Mask": 846610125,
    "Tobey Red Mask": 846610126,

    "Amazing 1 Gloves": 849846652,
    "Amazing 2 Gloves": 849849183,
    "Black Spider Gloves": 846610121,
    "Brand New Day Gloves": 849849194,
    "Tobey Red Gloves": 849846654,

    "Amazing 2 Web Shooters": 846610120,
    "Brand New Day Web Shooters": 846610123,
    "Web Shooters": 849846650
};
/* ==========================================================
ELEMENTS
========================================================== */

const cartItemsContainer = document.querySelector("#cartItems");

const subtotalElement = document.querySelector("#subtotal");

const totalElement = document.querySelector("#total");

/* ==========================================================
ADD TO CART
========================================================== */

document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();

        const id = Number(button.dataset.id);

        const product = Store.getProduct(id);

        if (!product) return;

        Store.addToCart(id);

        Store.showToast(`${product.name} added to cart 🛒`);

    });

});

/* ==========================================================
CART ITEM
========================================================== */

function createCartItem(item) {

    return `

        <div class="cart-item">

            <img
                src="../${item.image}"
                alt="${item.name}">

            <div class="cart-info">

                <h3>

                    ${item.name}

                </h3>

                <p>

                    £${item.price.toFixed(2)}

                </p>

                <div class="quantity">

                    <button
                        class="minus"
                        data-id="${item.id}">

                        −

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button
                        class="plus"
                        data-id="${item.id}">

                        +

                    </button>

                    <button
                        class="remove-item"
                        data-id="${item.id}"
                        aria-label="Remove ${item.name}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

    `;

}

/* ==========================================================
RENDER CART
========================================================== */

function renderCart() {

    if (!cartItemsContainer) return;

    const cart = Store.getCart();

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Your cart is empty</h2>

                <p>

                    Looks like you haven't added anything yet.

                </p>

                <a
                    href="shop.html"
                    class="continue-shopping">

                    Continue Shopping

                </a>

            </div>

        `;

        if (subtotalElement) {

            subtotalElement.textContent = "£0.00";

        }

        if (totalElement) {

            totalElement.textContent = "£0.00";

        }

        Store.updateCartCount();

        return;

    }

    cartItemsContainer.innerHTML = cart
        .map(createCartItem)
        .join("");

           
    /* ==========================================================
    TOTALS
    ========================================================== */

    const subtotal = Store.getCartTotal();

    if (subtotalElement) {

        subtotalElement.textContent = `£${subtotal.toFixed(2)}`;

    }

    if (totalElement) {

        totalElement.textContent = `£${subtotal.toFixed(2)}`;

    }

    Store.updateCartCount();

}

/* ==========================================================
CART EVENTS
========================================================== */

document.addEventListener("click", event => {

    const plusButton = event.target.closest(".plus");

    if (plusButton) {

        const id = Number(plusButton.dataset.id);

        Store.updateQuantity(id, 1);

        renderCart();

        return;

    }

    const minusButton = event.target.closest(".minus");

    if (minusButton) {

        const id = Number(minusButton.dataset.id);

        Store.updateQuantity(id, -1);

        renderCart();

        return;

    }

    const removeButton = event.target.closest(".remove-item");

    if (removeButton) {

        const id = Number(removeButton.dataset.id);

        const product = Store.getProduct(id);

        Store.removeFromCart(id);

        renderCart();

        if (product) {

            Store.showToast(`${product.name} removed from cart 🗑️`);

        }

    }

});

/* ==========================================================
CLEAR CART
========================================================== */

const clearCartButton = document.querySelector("#clearCart");

if (clearCartButton) {

    clearCartButton.addEventListener("click", () => {

        if (Store.getCart().length === 0) return;

        Store.clearCart();

        renderCart();

        Store.showToast("Cart cleared 🛒");

    });

}

/* ==========================================================
CHECKOUT
========================================================== */

const checkoutButton = document.querySelector("#checkoutBtn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (Store.getCart().length === 0) {

            Store.showToast("Your cart is empty.");

            return;

        }

        Store.showToast("Checkout coming soon 💳");

        // Future Stripe / PayPal checkout goes here

    });

}

/* ==========================================================
REFRESH COUNTERS
========================================================== */

window.addEventListener("storage", () => {

    Store.reset();

    renderCart();

});

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Store.updateCartCount();

    renderCart();

});