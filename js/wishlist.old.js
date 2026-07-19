/*
WISHLIST DISABLED
*/


/* ==========================================================
   WISHLIST
========================================================== */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateWishlistCount() {
    const count = document.querySelector("#wishlistCount");

    if (count) {
        count.textContent = wishlist.length;
    }
}

updateWishlistCount();

/* ==========================================================
   ADD TO WISHLIST
========================================================== */

document.addEventListener("click", (e) => {
    console.log("Clicked:", e.target);

    console.log(e.target);

const button = e.target.closest(".wishlist-btn");

console.log(button);

if (!button) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = Number(button.dataset.id);

    const product = products.find(p => p.id === productId);

    if (!product) return;

    const exists = wishlist.find(item => item.id === productId);

    if (exists) {

        alert("Already in wishlist ❤️");
        return;

    }

    wishlist.push(product);

    saveWishlist();
    updateWishlistCount();

    alert("Added to wishlist ❤️");

});


/* ==========================================================
   WISHLIST PAGE
========================================================== */

const wishlistContainer = document.querySelector("#wishlistItems");

if (wishlistContainer) {

    renderWishlist();

}

function renderWishlist() {

    if (!wishlistContainer) return;

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your wishlist is empty ❤️</h2>
                <p>Start saving your favourite products.</p>
            </div>
        `;

    } else {

        wishlistContainer.innerHTML = wishlist.map(product => `

            <div class="cart-item">

                <img src="../${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>£${product.price}</p>

                    <div class="wishlist-actions">

                        <button class="cart-btn move-to-cart" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Move to Cart
                        </button>

                        <button class="remove-item" data-id="${product.id}">
                            <i class="fa-solid fa-trash"></i>
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

    }

    const total = document.querySelector("#wishlistTotal");

    if (total) {

        total.textContent = `${wishlist.length} Item${wishlist.length !== 1 ? "s" : ""}`;

    }

}


/* ==========================================================
   REMOVE FROM WISHLIST
========================================================== */

document.addEventListener("click", (e) => {

    const removeBtn = e.target.closest(".remove-item");

    if (!removeBtn) return;

    const id = Number(removeBtn.dataset.id);

    wishlist = wishlist.filter(item => item.id !== id);

    saveWishlist();

    updateWishlistCount();

    renderWishlist();

    showToast("Removed from wishlist ❤️");

});


/* ==========================================================
   MOVE TO CART
========================================================== */

document.addEventListener("click", (e) => {

    const moveBtn = e.target.closest(".move-to-cart");

    if (!moveBtn) return;

    const id = Number(moveBtn.dataset.id);

    const product = products.find(p => p.id === id);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    wishlist = wishlist.filter(item => item.id !== id);

    saveWishlist();

    updateWishlistCount();

    renderWishlist();

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    showToast("Moved to cart 🛒");

});