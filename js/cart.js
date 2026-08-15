/* ==========================================================
   THE WEBBED VAULT
   CART.JS
========================================================== */

"use strict";


/* ==========================================================
   ECWID PRODUCT IDS
========================================================== */

const ECWID_PRODUCT_IDS = {

    "Amazing Spider V1": 846610119,
    "Amazing Spider V2": 846610118,
    "Black Symbiote Mask": 846610124,
    "Brand New Day Mask": 846610122,
    "Spider-Verse Mask": 846610125,
    "Tobey Red Mask": 846610126,
    "Iron Man Helmet": 853020945,
    "Stark Suit Mask": 853014984,

    "Amazing 1 Gloves": 849846652,
    "Amazing 2 Gloves": 849849183,
    "Black Spider Gloves": 846610121,
    "Brand New Day Gloves": 849849194,
    "Tobey Red Gloves": 849846654,
    "Miles Morales Gloves": 853014986,

    "Amazing 2 Web Shooters": 846610120,
    "Brand New Day Web Shooters": 846610123,
    "Web Shooters": 849846650

};


/* ==========================================================
   ELEMENTS
========================================================== */

const cartItemsContainer =
    document.querySelector(
        "#cartItems"
    );


const subtotalElement =
    document.querySelector(
        "#subtotal"
    );


const totalElement =
    document.querySelector(
        "#total"
    );


/* ==========================================================
   CREATE CART ITEM
========================================================== */

function createCartItem(
    item
) {

    return `

        <div
            class="cart-item"
        >

            <img
                src="../${item.image}"
                alt="${item.name}"
            >


            <div
                class="cart-info"
            >

                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${Store.formatCurrency(
                        item.price
                    )}
                </p>


                <div
                    class="quantity"
                >

                    <button
                        type="button"
                        class="minus"
                        data-id="${item.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="plus"
                        data-id="${item.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-item"
                        data-id="${item.id}"
                        aria-label="Remove ${item.name}"
                    >

                        <i
                            class="fa-solid fa-trash"
                        ></i>

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

    if (!cartItemsContainer) {

        return;

    }


    const cart =
        Store.getCart();


    /* ======================================================
       EMPTY CART
    ====================================================== */

    if (
        cart.length === 0
    ) {

        cartItemsContainer.innerHTML = `

            <div
                class="empty-cart"
            >

                <i
                    class="fa-solid fa-cart-shopping"
                ></i>


                <h2>
                    Your cart is empty
                </h2>


                <p>
                    Looks like you haven't
                    added anything yet.
                </p>


                <a
                    href="shop.html"
                    class="continue-shopping"
                >
                    Continue Shopping
                </a>

            </div>

        `;


        if (subtotalElement) {

            subtotalElement.textContent =
                Store.formatCurrency(
                    0
                );

        }


        if (totalElement) {

            totalElement.textContent =
                Store.formatCurrency(
                    0
                );

        }


        const shippingElement =
            document.querySelector(
                "#shipping"
            );


        if (shippingElement) {

            shippingElement.textContent =
                "FREE";

        }



        Store.updateCartCount();


        return;

    }


    /* ======================================================
       CART ITEMS
    ====================================================== */

    cartItemsContainer.innerHTML =
        cart
            .map(
                createCartItem
            )
            .join("");


    /* ======================================================
       TOTALS
    ====================================================== */

    const subtotal =
        Store.getCartTotal();


   /* ======================================================
   TOTALS

   Shipping is calculated by IONOS/Ecwid
   at checkout, so the custom cart does
   NOT add a shipping charge here.
====================================================== */

const total =
    subtotal;


    /* ======================================================
       SUBTOTAL
    ====================================================== */

    if (subtotalElement) {

        subtotalElement.textContent =
            Store.formatCurrency(
                subtotal
            );

    }


    /* ======================================================
       SHIPPING
    ====================================================== */

    const shippingElement =
        document.querySelector(
            "#shipping"
        );

if (shippingElement) {

    shippingElement.textContent =
        "Calculated at checkout";

}


    /* ======================================================
       TOTAL
    ====================================================== */

    if (totalElement) {

        totalElement.textContent =
            Store.formatCurrency(
                total
            );

    }



    /* ======================================================
       CART COUNT
    ====================================================== */

    Store.updateCartCount();

}


/* ==========================================================
   CART EVENTS
========================================================== */

document.addEventListener(
    "click",
    event => {


        /* ==================================================
           PLUS
        ================================================== */

        const plusButton =
            event.target.closest(
                ".plus"
            );


        if (plusButton) {

            event.preventDefault();


            const id =
                Number(
                    plusButton.dataset.id
                );


            Store.updateQuantity(
                id,
                1
            );


            renderCart();


            return;

        }


        /* ==================================================
           MINUS
        ================================================== */

        const minusButton =
            event.target.closest(
                ".minus"
            );


        if (minusButton) {

            event.preventDefault();


            const id =
                Number(
                    minusButton.dataset.id
                );


            Store.updateQuantity(
                id,
                -1
            );


            renderCart();


            return;

        }


        /* ==================================================
           REMOVE
        ================================================== */

        const removeButton =
            event.target.closest(
                ".remove-item"
            );


        if (removeButton) {

            event.preventDefault();


            const id =
                Number(
                    removeButton.dataset.id
                );


            const product =
                Store.getProduct(
                    id
                );


            Store.removeFromCart(
                id
            );


            renderCart();


            if (product) {

                Store.showToast(
                    `${product.name} removed from cart 🗑️`
                );

            }


            return;

        }

    }
);


/* ==========================================================
   CLEAR CART
========================================================== */

const clearCartButton =
    document.querySelector(
        "#clearCart"
    );


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        () => {

            if (
                Store.getCart().length ===
                0
            ) {

                return;

            }


            Store.clearCart();


            renderCart();


            Store.showToast(
                "Cart cleared 🛒"
            );

        }
    );

}


/* ==========================================================
   CHECKOUT
========================================================== */

const checkoutButton =
    document.querySelector(
        "#checkoutBtn"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        async () => {

            const cart =
                Store.getCart();


            /* ==================================================
               EMPTY CART
            ================================================== */

            if (
                cart.length === 0
            ) {

                Store.showToast(
                    "Your cart is empty."
                );

                return;

            }


            Store.showToast(
                "Preparing secure checkout..."
            );


            /* ==================================================
               WAIT FOR IONOS / ECWID API
            ================================================== */

            const waitForEcwid =
                () =>
                    new Promise(
                        resolve => {

                            /*
                               Already loaded.
                            */

                            if (
                                window.Ecwid &&
                                Ecwid.Cart &&
                                Ecwid.Cart.addProduct
                            ) {

                                resolve();

                                return;

                            }


                            /*
                               Wait for Ecwid to finish loading.
                            */

                            if (
                                window.Ecwid &&
                                Ecwid.OnAPILoaded
                            ) {

                                Ecwid.OnAPILoaded.add(
                                    () => {

                                        resolve();

                                    }
                                );

                                return;

                            }


                            /*
                               Fallback check.
                            */

                            const check =
                                setInterval(
                                    () => {

                                        if (
                                            window.Ecwid &&
                                            Ecwid.Cart &&
                                            Ecwid.Cart.addProduct
                                        ) {

                                            clearInterval(
                                                check
                                            );

                                            resolve();

                                        }

                                    },
                                    100
                                );

                        }
                    );


            try {

                await waitForEcwid();


                /* ==================================================
                   CLEAR IONOS / ECWID CART
                ================================================== */

                await new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        Ecwid.Cart.clear(
                            () => {

                                resolve();

                            }
                        );

                    }
                );


                /* ==================================================
                   ADD CUSTOM CART ITEMS
                ================================================== */

                for (
                    const item of cart
                ) {

                    /*
                       IMPORTANT:

                       Use the Ecwid ID directly
                       from the product database.

                       This is safer than matching
                       product names.
                    */

                    const product =
                        Store.getProduct(
                            item.id
                        );


                    const ecwidId =
                        product?.ecwidId;


                    /*
                       Product doesn't have
                       an Ecwid ID.
                    */

                    if (
                        !ecwidId ||
                        Number(ecwidId) <= 0
                    ) {

                        throw new Error(
                            `${item.name} does not have a valid Ecwid product ID.`
                        );

                    }


                    /*
                       Add product and WAIT
                       for Ecwid to confirm it.
                    */

                    await new Promise(
                        (
                            resolve,
                            reject
                        ) => {

                            Ecwid.Cart.addProduct({

                                id:
                                    Number(
                                        ecwidId
                                    ),

                                quantity:
                                    Number(
                                        item.quantity
                                    ),

                                callback:
                                    function(
                                        success,
                                        addedProduct,
                                        ecwidCart,
                                        error
                                    ) {

                                        if (
                                            success
                                        ) {

                                            resolve();

                                        }

                                        else {

                                            reject(
                                                new Error(
                                                    error ||
                                                    `Ecwid could not add ${item.name}.`
                                                )
                                            );

                                        }

                                    }

                            });

                        }
                    );

                }


                /* ==================================================
                   EVERYTHING SUCCESSFULLY COPIED
                ================================================== */

                const customCart =
                    document.querySelector(
                        ".cart-layout"
                    );


                const ionosStore =
                    document.querySelector(
                        "#ionos-store"
                    );


                /*
                   NOW hide our custom cart.
                */

                if (
                    customCart
                ) {

                    customCart.style.display =
                        "none";

                }


                /*
                   NOW show IONOS.
                */

                if (
                    ionosStore
                ) {

                    ionosStore.style.display =
                        "block";

                }


                /*
                   Open the real IONOS /
                   Ecwid shopping cart.
                */

                Ecwid.openPage(
                    "cart"
                );


                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });


            }

            catch (error) {

                console.error(
                    "IONOS / Ecwid checkout error:",
                    error
                );


                /*
                   IMPORTANT:

                   If something failed,
                   DO NOT leave the custom
                   cart hidden.
                */

                const customCart =
                    document.querySelector(
                        ".cart-layout"
                    );


                if (
                    customCart
                ) {

                    customCart.style.display =
                        "";

                }


                const ionosStore =
                    document.querySelector(
                        "#ionos-store"
                    );


                if (
                    ionosStore
                ) {

                    ionosStore.style.display =
                        "none";

                }


                Store.showToast(
                    "Checkout could not be prepared. Please try again."
                );

            }

        }
    );

}

/* ==========================================================
   STORAGE CHANGE
========================================================== */

window.addEventListener(
    "storage",
    () => {

        renderCart();

    }
);


/* ==========================================================
   CURRENCY CHANGE
========================================================== */

document.addEventListener(
    "currencyChanged",
    () => {

        renderCart();

    }
);


/* ==========================================================
   SHIPPING CHANGE
========================================================== */

document.addEventListener(
    "shippingChanged",
    () => {

        renderCart();

    }
);


/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Store.updateCartCount();


        Store.updateWishlistCount();


        renderCart();


        /*
           Preserve existing Ecwid page
           restoration behaviour.
        */

        const page =
            sessionStorage.getItem(
                "ecwidPage"
            );


        if (!page) {

            return;

        }


        sessionStorage.removeItem(
            "ecwidPage"
        );


        const cartLayout =
            document.querySelector(
                ".cart-layout"
            );


        const ionosStore =
            document.querySelector(
                "#ionos-store"
            );


        if (cartLayout) {

            cartLayout.style.display =
                "none";

        }


        if (ionosStore) {

            ionosStore.style.display =
                "block";

        }


        const wait =
            setInterval(
                () => {

                    if (
                        window.Ecwid &&
                        Ecwid.openPage
                    ) {

                        clearInterval(
                            wait
                        );


                        Ecwid.openPage(
                            page
                        );

                    }

                },
                100
            );

    }

);

