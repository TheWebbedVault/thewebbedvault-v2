/* ==========================================================
   THE WEBBED VAULT
   STORE.JS
========================================================== */

const Store = (() => {

    "use strict";


    /* ==========================================================
       STORAGE KEYS
    ========================================================== */

    const CART_KEY = "cart";
    const WISHLIST_KEY = "wishlist";


    /* ==========================================================
       LOCAL STORAGE
    ========================================================== */

    function load(key) {

        try {

            const data =
                localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : [];

        } catch (error) {

            console.error(
                `Failed to load ${key}:`,
                error
            );

            return [];

        }

    }


    function save(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                `Failed to save ${key}:`,
                error
            );

        }

    }


    /* ==========================================================
       STORE STATE
    ========================================================== */

    let cart =
        load(CART_KEY);

    let wishlist =
        load(WISHLIST_KEY);


    /* ==========================================================
       PRODUCTS
    ========================================================== */

    function getProducts() {

        return products;

    }


    function getProduct(id) {

        return products.find(
            product =>
                product.id === Number(id)
        );

    }


    /* ==========================================================
       CART
    ========================================================== */

    function getCart() {

        return cart;

    }


    function addToCart(id) {

        const product =
            getProduct(id);

        if (!product) {

            return false;

        }


        const existingItem =
            cart.find(
                item =>
                    item.id === product.id
            );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                ...product,

                quantity: 1

            });

        }


        save(
            CART_KEY,
            cart
        );

        updateCartCount();

        return true;

    }


    function removeFromCart(id) {

        cart =
            cart.filter(
                item =>
                    item.id !== Number(id)
            );

        save(
            CART_KEY,
            cart
        );

        updateCartCount();

    }


    function clearCart() {

        cart = [];

        save(
            CART_KEY,
            cart
        );

        updateCartCount();

    }


    function updateQuantity(id, change) {

        const item =
            cart.find(
                item =>
                    item.id === Number(id)
            );


        if (!item) {

            return;

        }


        item.quantity += change;


        if (item.quantity <= 0) {

            removeFromCart(id);

            return;

        }


        save(
            CART_KEY,
            cart
        );

        updateCartCount();

    }


    /* ==========================================================
       CART HELPERS
    ========================================================== */

    function getCartTotal() {

        return cart.reduce(
            (total, item) =>
                total +
                (Number(item.price) || 0) *
                (Number(item.quantity) || 0),
            0
        );

    }


    function getCartQuantity() {

        return cart.reduce(
            (total, item) =>
                total +
                (Number(item.quantity) || 0),
            0
        );

    }


    function isInCart(id) {

        return cart.some(
            item =>
                item.id === Number(id)
        );

    }


    function isInWishlist(id) {

        return wishlist.some(
            item =>
                item.id === Number(id)
        );

    }


    function updateCartCount() {

        const count =
            getCartQuantity();


        document
            .querySelectorAll(
                "#cartCount"
            )
            .forEach(element => {

                element.textContent =
                    count;

            });

    }


    function updateWishlistCount() {

        const count =
            wishlist.length;


        document
            .querySelectorAll(
                "#wishlistCount"
            )
            .forEach(element => {

                element.textContent =
                    count;

            });

    }


    /* ==========================================================
       WISHLIST
    ========================================================== */

    function getWishlist() {

        return wishlist;

    }


    function addToWishlist(id) {

        const product =
            getProduct(id);

        if (!product) {

            return false;

        }


        if (
            wishlist.some(
                item =>
                    item.id === product.id
            )
        ) {

            return false;

        }


        wishlist.push(product);

        save(
            WISHLIST_KEY,
            wishlist
        );

        updateWishlistCount();

        return true;

    }


    function removeFromWishlist(id) {

        wishlist =
            wishlist.filter(
                item =>
                    item.id !== Number(id)
            );

        save(
            WISHLIST_KEY,
            wishlist
        );

        updateWishlistCount();

    }


    function clearWishlist() {

        wishlist = [];

        save(
            WISHLIST_KEY,
            wishlist
        );

        updateWishlistCount();

    }

/* ==========================================================
   SHIPPING SYSTEM
========================================================== */

const shipping = {

    rates: {

        S: 3.99,

        M: 5.49,

        L: 7.49

    },

    freeShippingThreshold: 150

};


/* ==========================================================
   GET PRODUCT SHIPPING SIZE
========================================================== */

function getShippingSize(product) {

    if (!product) {

        return "S";

    }


    const category =
        String(
            product.category || ""
        )
        .toLowerCase()
        .trim();


    /*
       MEDIUM PACKAGE

       Masks
       Bags (Accessories in products.js)
       Collectibles
    */

    if (

        category === "masks" ||

        category === "accessories" ||

        category === "collectibles"

    ) {

        return "M";

    }


    /*
       SMALL PACKAGE

       Gloves
       Web Shooters
       Comics
    */

    if (

        category === "gloves" ||

        category === "web shooters" ||

        category === "webshooters" ||

        category === "comics"

    ) {

        return "S";

    }


    return "S";

}


/* ==========================================================
   GET CART SHIPPING SIZE
========================================================== */

function getCartShippingSize() {

    if (!cart.length) {

        return null;

    }


    let mediumItems = 0;


    cart.forEach(item => {

        const size =
            getShippingSize(item);


        if (size === "M") {

            mediumItems +=
                Number(
                    item.quantity || 0
                );

        }

    });


    /*
       2 OR MORE M ITEMS = L
    */

    if (mediumItems >= 2) {

        return "L";

    }


    /*
       1 M ITEM = M
    */

    if (mediumItems === 1) {

        return "M";

    }


    /*
       ONLY S ITEMS = S
    */

    return "S";

}


/* ==========================================================
   GET SHIPPING COST
========================================================== */

function getShippingCost() {

    if (!cart.length) {

        return 0;

    }


    const subtotal =
        getCartTotal();


    /*
       £150 OR MORE = FREE UK SHIPPING
    */

    if (

        subtotal >=
        shipping.freeShippingThreshold

    ) {

        return 0;

    }


    const packageSize =
        getCartShippingSize();


    return (

        shipping.rates[
            packageSize
        ] || 0

    );

}


/* ==========================================================
   GET SHIPPING LABEL
========================================================== */

function getShippingLabel() {

    if (!cart.length) {

        return "No shipping";

    }


    const subtotal =
        getCartTotal();


    if (

        subtotal >=
        shipping.freeShippingThreshold

    ) {

        return "FREE UK Shipping";

    }


    const packageSize =
        getCartShippingSize();


    if (

        packageSize === "L"

    ) {

        return "Large Parcel Shipping";

    }


    return "Standard UK Shipping";

}

/* ==========================================================
   TOAST NOTIFICATIONS
========================================================== */

function showToast(
    message,
    duration = 2500
) {

    const existingToast =
        document.querySelector(
            ".toast"
        );


    if (existingToast) {

        existingToast.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        message;


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(() => {

        toast.classList.add(
            "show"
        );

    });


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );


        setTimeout(() => {

            if (
                toast.parentNode
            ) {

                toast.remove();

            }

        }, 300);

    }, duration);

}


/* ==========================================================
   RESET
========================================================== */

function reset() {

    cart =
        load(CART_KEY);

    wishlist =
        load(WISHLIST_KEY);


    updateCartCount();

    updateWishlistCount();

}


/* ==========================================================
   INITIALISE
========================================================== */

function init() {

    reset();

}


/* ==========================================================
   PUBLIC API
========================================================== */

const api = {

    /* Products */

    getProducts,

    getProduct,


    /* Cart */

    getCart,

    addToCart,

    removeFromCart,

    clearCart,

    updateQuantity,

    getCartTotal,

    getCartQuantity,

    isInCart,


    /* Wishlist */

    getWishlist,

    addToWishlist,

    removeFromWishlist,

    clearWishlist,

    isInWishlist,


    /* UI */

    updateCartCount,

    updateWishlistCount,

    showToast,


    /* Helpers */

    reset,


    /* Shipping */

    getShippingSize,

    getCartShippingSize,

    getShippingCost,

    getShippingLabel

};


init();


return api;

})();

/* ==========================================================
   CURRENCY SYSTEM
========================================================== */

Store.currency = {

    current:
        localStorage.getItem("currency")
        || "GBP",

    rates: {

        GBP: 1,

        USD: 1,

        EUR: 1,

        CAD: 1,

        AUD: 1

    },

    symbols: {

        GBP: "£",

        USD: "$",

        EUR: "€",

        CAD: "C$",

        AUD: "A$"

    }

};


/* ==========================================================
   LOAD EXCHANGE RATES
========================================================== */

Store.loadCurrencyRates =
    async function() {

        try {

            const response =
                await fetch(
                    "https://api.frankfurter.dev/v2/rates?base=GBP&quotes=USD,EUR,CAD,AUD"
                );


            if (!response.ok) {

                throw new Error(
                    "Currency API failed."
                );

            }


            const data =
                await response.json();


            /*
               Frankfurter returns:

               {
                   base: "GBP",
                   date: "...",
                   rates: {
                       USD: ...,
                       EUR: ...,
                       CAD: ...,
                       AUD: ...
                   }
               }

               Support that original format.
            */

            if (
                data &&
                data.rates
            ) {

                Object.keys(
                    data.rates
                ).forEach(currency => {

                    if (
                        Object.prototype.hasOwnProperty.call(
                            Store.currency.rates,
                            currency
                        )
                    ) {

                        Store.currency.rates[
                            currency
                        ] =
                            data.rates[
                                currency
                            ];

                    }

                });

            }


            Store.updateCurrencyDisplay();

            Store.convertPrices();

            document.dispatchEvent(
                new CustomEvent(
                    "currencyChanged"
                )
            );

        }

        catch (error) {

            console.warn(
                "Currency rates could not be loaded.",
                error
            );

        }

    };


/* ==========================================================
   FORMAT CURRENCY
========================================================== */

Store.formatCurrency =
    function(amount) {

        const currency =
            Store.currency.current;


        const rate =
            Store.currency.rates[
                currency
            ] || 1;


        const converted =
            Number(amount) * rate;


        return new Intl.NumberFormat(
            undefined,
            {

                style: "currency",

                currency: currency,

                minimumFractionDigits: 2,

                maximumFractionDigits: 2

            }
        ).format(
            converted
        );

    };


/* ==========================================================
   UPDATE CURRENCY DISPLAY
========================================================== */

Store.updateCurrencyDisplay =
    function() {

        const symbol =
            document.querySelector(
                "#currencySymbol"
            );


        const code =
            document.querySelector(
                "#currencyCode"
            );


        if (symbol) {

            symbol.textContent =
                Store.currency.symbols[
                    Store.currency.current
                ];

        }


        if (code) {

            code.textContent =
                Store.currency.current;

        }


        document
            .querySelectorAll(
                ".currency-menu button"
            )
            .forEach(button => {

                button.classList.toggle(

                    "active",

                    button.dataset.currency ===
                    Store.currency.current

                );

            });

    };


/* ==========================================================
   CONVERT DISPLAYED PRICES
========================================================== */

Store.convertPrices =
    function() {

        document
            .querySelectorAll(
                "[data-gbp-price]"
            )
            .forEach(element => {

                const gbp =
                    Number(
                        element.dataset.gbpPrice
                    );


                if (
                    !Number.isNaN(gbp)
                ) {

                    element.textContent =
                        Store.formatCurrency(
                            gbp
                        );

                }

            });

    };


/* ==========================================================
   SET CURRENCY
========================================================== */

Store.setCurrency =
    function(currency) {

        if (
            !Object.prototype.hasOwnProperty.call(
                Store.currency.rates,
                currency
            )
        ) {

            return;

        }


        Store.currency.current =
            currency;


        localStorage.setItem(
            "currency",
            currency
        );


        Store.updateCurrencyDisplay();

        Store.convertPrices();


        document.dispatchEvent(
            new CustomEvent(
                "currencyChanged"
            )
        );

    };


/* ==========================================================
   CURRENCY MENU
========================================================== */

document.addEventListener(
    "click",
    event => {

        const currencyButton =
            event.target.closest(
                "#currencyButton"
            );


        const currencyOption =
            event.target.closest(
                ".currency-menu button"
            );


        const selector =
            document.querySelector(
                ".currency-selector"
            );


        if (currencyButton) {

            event.preventDefault();

            selector?.classList.toggle(
                "active"
            );

            return;

        }


        if (currencyOption) {

            event.preventDefault();


            Store.setCurrency(
                currencyOption.dataset.currency
            );


            selector?.classList.remove(
                "active"
            );

            return;

        }


        if (

            selector &&

            !event.target.closest(
                ".currency-selector"
            )

        ) {

            selector.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================================
   INITIALISE CURRENCY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Store.updateCurrencyDisplay();

        Store.loadCurrencyRates();

    }
);

