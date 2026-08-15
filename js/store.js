/* ==========================================================
   THE WEBBED VAULT
   STORE.JS
========================================================== */

const Store = (() => {

    "use strict";


    /* ==========================================================
       STORAGE KEYS
    ========================================================== */

    const CART_KEY =
        "cart";

    const WISHLIST_KEY =
        "wishlist";


    /* ==========================================================
       LOCAL STORAGE
    ========================================================== */

    function load(key) {

        try {

            const data =
                localStorage.getItem(
                    key
                );


            return data
                ? JSON.parse(data)
                : [];

        }

        catch (error) {

            console.error(
                `Failed to load ${key}:`,
                error
            );


            return [];

        }

    }


    function save(
        key,
        data
    ) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        }

        catch (error) {

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
        load(
            CART_KEY
        );


    let wishlist =
        load(
            WISHLIST_KEY
        );


    /* ==========================================================
       PRODUCTS
    ========================================================== */

    function getProducts() {

        return products;

    }


    function getProduct(id) {

        return products.find(
            product =>
                product.id ===
                Number(id)
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
                    item.id ===
                    product.id
            );


        if (existingItem) {

            existingItem.quantity++;

        }

        else {

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
                    item.id !==
                    Number(id)
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


    function updateQuantity(
        id,
        change
    ) {

        const item =
            cart.find(
                item =>
                    item.id ===
                    Number(id)
            );


        if (!item) {

            return;

        }


        item.quantity +=
            change;


        if (
            item.quantity <= 0
        ) {

            removeFromCart(
                id
            );

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
            (
                total,
                item
            ) =>

                total +

                (
                    Number(
                        item.price
                    ) || 0
                )

                *

                (
                    Number(
                        item.quantity
                    ) || 0
                ),

            0
        );

    }


    function getCartQuantity() {

        return cart.reduce(
            (
                total,
                item
            ) =>

                total +

                (
                    Number(
                        item.quantity
                    ) || 0
                ),

            0
        );

    }


    function isInCart(id) {

        return cart.some(
            item =>
                item.id ===
                Number(id)
        );

    }


    function isInWishlist(id) {

        return wishlist.some(
            item =>
                item.id ===
                Number(id)
        );

    }


    function updateCartCount() {

        const count =
            getCartQuantity();


        document
            .querySelectorAll(
                "#cartCount"
            )
            .forEach(
                element => {

                    element.textContent =
                        count;

                }
            );

    }


    function updateWishlistCount() {

        const count =
            wishlist.length;


        document
            .querySelectorAll(
                "#wishlistCount"
            )
            .forEach(
                element => {

                    element.textContent =
                        count;

                }
            );

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
                    item.id ===
                    product.id
            )
        ) {

            return false;

        }


        wishlist.push(
            product
        );


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
                    item.id !==
                    Number(id)
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


/* ==========================================================
   SHIPPING REGIONS
========================================================== */

const shipping = {

    /* ======================================================
       UK
    ====================================================== */

    UK: {

        options: [

            {
                id:
                    "royalmail-tracked-24",

                name:
                    "Royal Mail Tracked 24",

                price:
                    5.49

            },

            {
                id:
                    "royalmail-tracked-48",

                name:
                    "Royal Mail Tracked 48",

                price:
                    4.49

            },

            {
                id:
                    "evri-tracked",

                name:
                    "Evri Tracked",

                price:
                    3.99

            }

        ],

        freeShippingThreshold:
            150

    },


    /* ======================================================
       EUROPE
    ====================================================== */

    EUROPE: {

        options: [

            {
                id:
                    "royalmail-international-europe",

                name:
                    "Royal Mail International Tracked",

                price:
                    18.99

            },

            {
                id:
                    "evri-international-europe",

                name:
                    "Evri International",

                price:
                    16.99

            }

        ]

    },


    /* ======================================================
       USA
    ====================================================== */

    USA: {

        options: [

            {
                id:
                    "royalmail-international-usa",

                name:
                    "Royal Mail International Tracked",

                price:
                    20.99

            },

            {
                id:
                    "evri-international-usa",

                name:
                    "Evri International",

                price:
                    18.99

            }

        ]

    },


    /* ======================================================
       ASIA
    ====================================================== */

    ASIA: {

        options: [

            {
                id:
                    "royalmail-international-asia",

                name:
                    "Royal Mail International Tracked",

                price:
                    24.99

            },

            {
                id:
                    "evri-international-asia",

                name:
                    "Evri International",

                price:
                    22.99

            }

        ]

    }

};


/* ==========================================================
   GET PRODUCT SHIPPING SIZE
========================================================== */

function getShippingSize(
    product
) {

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
       MEDIUM
    */

    if (

        category === "masks" ||

        category === "accessories" ||

        category === "collectibles"

    ) {

        return "M";

    }


    /*
       SMALL
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


    let mediumItems =
        0;


    cart.forEach(
        item => {

            const size =
                getShippingSize(
                    item
                );


            if (
                size === "M"
            ) {

                mediumItems +=
                    Number(
                        item.quantity || 0
                    );

            }

        }
    );


    if (
        mediumItems >= 2
    ) {

        return "L";

    }


    if (
        mediumItems === 1
    ) {

        return "M";

    }


    return "S";

}


/* ==========================================================
   GET CURRENT SHIPPING REGION
========================================================== */

function getShippingRegion() {

    const savedRegion =
        localStorage.getItem(
            "shippingRegion"
        );


    if (
        savedRegion &&
        shipping[
            savedRegion
        ]
    ) {

        return savedRegion;

    }


    return "UK";

}


/* ==========================================================
   SET SHIPPING REGION
========================================================== */

function setShippingRegion(
    region
) {

    if (
        !shipping[
            region
        ]
    ) {

        return false;

    }


    localStorage.setItem(
        "shippingRegion",
        region
    );


    /*
       When the destination changes,
       clear the previous method.

       This prevents a UK shipping method
       being accidentally carried into
       an international order.
    */

    localStorage.removeItem(
        "shippingMethod"
    );


    document.dispatchEvent(
        new CustomEvent(
            "shippingChanged"
        )
    );


    return true;

}


/* ==========================================================
   GET SHIPPING OPTIONS
========================================================== */

function getShippingOptions() {

    const region =
        getShippingRegion();


    const regionData =
        shipping[
            region
        ];


    if (!regionData) {

        return [];

    }


    /*
       UK FREE SHIPPING
    */

    if (

        region === "UK" &&

        getCartTotal() >=
            regionData.freeShippingThreshold

    ) {

        return [

            {

                id:
                    "free-uk-shipping",

                name:
                    "FREE UK Shipping",

                price:
                    0

            }

        ];

    }


    return [
        ...regionData.options
    ];

}


/* ==========================================================
   GET SELECTED SHIPPING METHOD
========================================================== */

function getSelectedShippingMethod() {

    const savedMethod =
        localStorage.getItem(
            "shippingMethod"
        );


    const options =
        getShippingOptions();


    const existing =
        options.find(
            option =>
                option.id ===
                savedMethod
        );


    if (existing) {

        return existing;

    }


    return (
        options[0] ||
        null
    );

}


/* ==========================================================
   SET SHIPPING METHOD
========================================================== */

function setShippingMethod(
    methodId
) {

    const options =
        getShippingOptions();


    const method =
        options.find(
            option =>
                option.id ===
                methodId
        );


    if (!method) {

        return false;

    }


    localStorage.setItem(
        "shippingMethod",
        methodId
    );


    document.dispatchEvent(
        new CustomEvent(
            "shippingChanged"
        )
    );


    return true;

}


/* ==========================================================
   GET SHIPPING COST
========================================================== */

function getShippingCost() {

    if (!cart.length) {

        return 0;

    }


    const method =
        getSelectedShippingMethod();


    if (!method) {

        return 0;

    }


    return Number(
        method.price
    ) || 0;

}


/* ==========================================================
   GET SHIPPING LABEL
========================================================== */

function getShippingLabel() {

    if (!cart.length) {

        return "No shipping";

    }


    const method =
        getSelectedShippingMethod();


    if (!method) {

        return "Select shipping";

    }


    return method.name;

}
/* ==========================================================
   CURRENCY SYSTEM
========================================================== */

const currency = {

    current:
        localStorage.getItem(
            "currency"
        ) || "GBP",


    rates: {

        GBP: 1,

        USD: 1.3521,

        EUR: 1.1709,

        CAD: 1.8750,

        AUD: 2.1000

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
   FORMAT CURRENCY
========================================================== */

function formatCurrency(
    amount
) {

    const selectedCurrency =
        currency.current;


    const rate =
        currency.rates[
            selectedCurrency
        ] || 1;


    const converted =
        Number(amount) * rate;


    return new Intl.NumberFormat(
        undefined,
        {

            style:
                "currency",

            currency:
                selectedCurrency,

            minimumFractionDigits:
                2,

            maximumFractionDigits:
                2

        }
    ).format(
        converted
    );

}


/* ==========================================================
   UPDATE CURRENCY DISPLAY
========================================================== */

function updateCurrencyDisplay() {

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
            currency.symbols[
                currency.current
            ];

    }


    if (code) {

        code.textContent =
            currency.current;

    }


    document
        .querySelectorAll(
            ".currency-menu button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",

                    button.dataset.currency ===
                    currency.current

                );

            }
        );

}


/* ==========================================================
   CONVERT DISPLAYED PRICES
========================================================== */

function convertPrices() {

    document
        .querySelectorAll(
            "[data-gbp-price]"
        )
        .forEach(
            element => {

                const gbp =
                    Number(
                        element.dataset.gbpPrice
                    );


                if (
                    !Number.isNaN(gbp)
                ) {

                    element.textContent =
                        formatCurrency(
                            gbp
                        );

                }

            }
        );

}


/* ==========================================================
   SET CURRENCY
========================================================== */

function setCurrency(
    selectedCurrency
) {

    if (
        !Object.prototype.hasOwnProperty.call(
            currency.rates,
            selectedCurrency
        )
    ) {

        return false;

    }


    currency.current =
        selectedCurrency;


    localStorage.setItem(
        "currency",
        selectedCurrency
    );


    updateCurrencyDisplay();

    convertPrices();


    document.dispatchEvent(
        new CustomEvent(
            "currencyChanged"
        )
    );


    return true;

}


/* ==========================================================
   LOAD LIVE CURRENCY RATES
========================================================== */

async function loadCurrencyRates() {

    try {

        const response =
            await fetch(
                "https://api.frankfurter.dev/v2/rates?base=GBP&quotes=USD,EUR,CAD,AUD",
                {
                    cache:
                        "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Currency API failed."
            );

        }


        const data =
            await response.json();


        if (
            data &&
            data.rates
        ) {

            Object.keys(
                data.rates
            )
            .forEach(
                selectedCurrency => {

                    if (
                        Object.prototype.hasOwnProperty.call(
                            currency.rates,
                            selectedCurrency
                        )
                    ) {

                        currency.rates[
                            selectedCurrency
                        ] =
                            Number(
                                data.rates[
                                    selectedCurrency
                                ]
                            );

                    }

                }
            );

        }


        updateCurrencyDisplay();

        convertPrices();


        document.dispatchEvent(
            new CustomEvent(
                "currencyChanged"
            )
        );

    }

    catch (error) {

        console.warn(
            "Live currency rates unavailable. Using fallback rates.",
            error
        );


        updateCurrencyDisplay();

        convertPrices();

    }

}


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


            setCurrency(
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
   TOAST
========================================================== */

function showToast(
    message
) {

    let toast =
        document.getElementById(
            "storeToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "storeToast";


        toast.style.position =
            "fixed";


        toast.style.bottom =
            "30px";


        toast.style.left =
            "50%";


        toast.style.transform =
            "translateX(-50%)";


        toast.style.zIndex =
            "99999";


        toast.style.padding =
            "12px 20px";


        toast.style.borderRadius =
            "10px";


        toast.style.background =
            "#111";


        toast.style.color =
            "#fff";


        toast.style.fontSize =
            "14px";


        toast.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.25)";


        toast.style.pointerEvents =
            "none";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.display =
        "block";


    clearTimeout(
        toast._timeout
    );


    toast._timeout =
        setTimeout(
            () => {

                toast.style.display =
                    "none";

            },
            2500
        );

}

/* ==========================================================
   PUBLIC STORE API
========================================================== */

const api = {

    /* ======================================================
       PRODUCTS
    ====================================================== */

    getProducts,

    getProduct,


    /* ======================================================
       CART
    ====================================================== */

    getCart,

    addToCart,

    removeFromCart,

    clearCart,

    updateQuantity,

    getCartTotal,

    getCartQuantity,

    isInCart,

    updateCartCount,


    /* ======================================================
       WISHLIST
    ====================================================== */

    getWishlist,

    addToWishlist,

    removeFromWishlist,

    clearWishlist,

    isInWishlist,

    updateWishlistCount,


    /* ======================================================
       SHIPPING
    ====================================================== */

    getShippingSize,

    getCartShippingSize,

    getShippingRegion,

    setShippingRegion,

    getShippingOptions,

    getSelectedShippingMethod,

    setShippingMethod,

    getShippingCost,

    getShippingLabel,


    /* ======================================================
       CURRENCY
    ====================================================== */

    formatCurrency,

    setCurrency,

    updateCurrencyDisplay,

    convertPrices,

    loadCurrencyRates,


    /* ======================================================
       TOAST
    ====================================================== */

    showToast

};


/* ==========================================================
   RETURN STORE
========================================================== */

return api;

})();


/* ==========================================================
   STORE INITIALISATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Store.updateCartCount();

        Store.updateWishlistCount();

        Store.updateCurrencyDisplay();

    }
);