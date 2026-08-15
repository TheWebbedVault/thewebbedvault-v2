/* ==========================================================
   THE WEBBED VAULT
   HOMEPAGE.JS
========================================================== */

"use strict";


/* ==========================================================
   ELEMENTS
========================================================== */

const featuredProductsContainer =
    document.querySelector("#featuredProducts");

const newDropsContainer =
    document.querySelector("#newDrops");

const bestSellersContainer =
    document.querySelector("#bestSellers");


/* ==========================================================
   PRODUCT CARD
========================================================== */

function createProductCard(product) {

    const isWishlisted =
        Store.isInWishlist(product.id);


    const mediaContent =
        product.video

            ? `

                <video
                    class="product-card-video"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata">

                    <source
                        src="${product.video}"
                        type="video/mp4">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </video>

              `

            : `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

              `;


    return `

        <article
            class="product"
            data-id="${product.id}">

            <div class="product-image-wrapper">

                <span class="product-badge">
                    ${product.badge || ""}
                </span>


                <button
                    class="wishlist-floating ${
                        isWishlisted
                            ? "active"
                            : ""
                    }"
                    data-id="${product.id}"
                    aria-label="${
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }">

                    <i class="${
                        isWishlisted
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                    }"></i>

                </button>


                <a
                    href="Html/product.html?id=${product.id}"
                    class="product-image">

                    ${mediaContent}

                </a>

            </div>


            <div class="product-content">

                <h3>

                    <a
                        href="Html/product.html?id=${product.id}">

                        ${product.name}

                    </a>

                </h3>


                <p
                    class="price"
                    data-gbp-price="${product.price}">

                    ${Store.formatCurrency(
                        product.price
                    )}

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

function renderProducts(
    container,
    filter = () => true
) {

    if (!container) return;


    container.innerHTML =
        Store
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
    product =>
        product.badge === "New Drop"
);


/* ==========================================================
   BEST SELLERS
========================================================== */

renderProducts(
    bestSellersContainer,
    product =>
        product.badge === "Best Seller"
);


/* ==========================================================
   BUTTON EVENTS
========================================================== */

document.addEventListener(
    "click",
    event => {

        /* --------------------------------------------------
           WISHLIST
        -------------------------------------------------- */

        const wishlistButton =
            event.target.closest(
                ".wishlist-floating"
            );


        if (wishlistButton) {

            event.preventDefault();

            event.stopPropagation();


            const id =
                Number(
                    wishlistButton.dataset.id
                );


            if (
                Store.isInWishlist(id)
            ) {

                Store.removeFromWishlist(id);


                wishlistButton.innerHTML =
                    '<i class="fa-regular fa-heart"></i>';

                wishlistButton.classList.remove(
                    "active"
                );


                wishlistButton.setAttribute(
                    "aria-label",
                    "Add to wishlist"
                );


                Store.showToast(
                    "Removed from wishlist ❤️"
                );

            }

            else {

                Store.addToWishlist(id);


                wishlistButton.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';

                wishlistButton.classList.add(
                    "active"
                );


                wishlistButton.setAttribute(
                    "aria-label",
                    "Remove from wishlist"
                );


                Store.showToast(
                    "Added to wishlist ❤️"
                );

            }


            return;

        }


        /* --------------------------------------------------
           CART
        -------------------------------------------------- */

        const cartButton =
            event.target.closest(
                ".full-cart-btn"
            );


        if (cartButton) {

            event.preventDefault();

            event.stopPropagation();


            const id =
                Number(
                    cartButton.dataset.id
                );


            const product =
                Store.getProduct(id);


            if (!product) return;


            Store.addToCart(id);


            Store.showToast(
                `${product.name} added to cart 🛒`
            );


            return;

        }

    }
);


/* ==========================================================
   PRODUCT CARD NAVIGATION
========================================================== */

document.addEventListener(
    "click",
    event => {

        const productCard =
            event.target.closest(
                ".product"
            );


        if (!productCard) return;


        if (
            event.target.closest(
                "button"
            )
        ) {

            return;

        }


        if (
            event.target.closest(
                "a"
            )
        ) {

            return;

        }


        window.location.href =
            `Html/product.html?id=${
                productCard.dataset.id
            }`;

    }
);


/* ==========================================================
   SEARCH
========================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchButton =
    document.querySelector(
        ".nav-search button"
    );


function performSearch() {

    if (!searchInput) return;


    const query =
        searchInput.value.trim();


    if (!query) return;


    window.location.href =
        `Html/Shop.html?search=${
            encodeURIComponent(query)
        }`;

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                performSearch();

            }

        }
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


/* ==========================================================
   NAVBAR
========================================================== */

const header =
    document.querySelector(
        ".header"
    );


let lastScrollY =
    window.scrollY;

let ticking = false;


function updateNavbar() {

    if (!header) return;


    const currentScroll =
        window.scrollY;


    if (
        currentScroll > 60
    ) {

        header.classList.add(
            "shrink"
        );

    }

    else {

        header.classList.remove(
            "shrink"
        );

    }


    if (
        currentScroll >
            lastScrollY &&
        currentScroll > 150
    ) {

        header.classList.add(
            "hide"
        );

    }

    else if (
        currentScroll <
        lastScrollY
    ) {

        header.classList.remove(
            "hide"
        );

    }


    lastScrollY =
        currentScroll;

    ticking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (ticking) return;


        window.requestAnimationFrame(
            updateNavbar
        );


        ticking = true;

    }
);


/* ==========================================================
   MOBILE MENU
========================================================== */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const menuClose =
    document.getElementById(
        "menuClose"
    );


const menuOverlay =
    document.getElementById(
        "menuOverlay"
    );


function openMenu() {

    if (!mobileMenu) return;


    mobileMenu.classList.add(
        "active"
    );


    menuOverlay?.classList.add(
        "active"
    );

}


function closeMenu() {

    mobileMenu?.classList.remove(
        "active"
    );


    menuOverlay?.classList.remove(
        "active"
    );

}


menuToggle?.addEventListener(
    "click",
    openMenu
);


menuClose?.addEventListener(
    "click",
    closeMenu
);


menuOverlay?.addEventListener(
    "click",
    closeMenu
);


/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Store.updateCartCount();

        Store.updateWishlistCount();

        Store.updateCurrencyDisplay();

    }
);

/* ==========================================================
   MOBILE MENU SEARCH
========================================================== */

const mobileSearchForm =
    document.getElementById("mobileSearchForm");

const mobileSearchInput =
    document.getElementById("mobileSearchInput");


if (mobileSearchForm && mobileSearchInput) {

    mobileSearchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const query =
                mobileSearchInput.value.trim();

            if (!query) return;

            window.location.href =
                `Html/Shop.html?search=${encodeURIComponent(query)}`;

        }
    );

}