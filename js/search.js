/* ==========================================================
   THE WEBBED VAULT
   SEARCH.JS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTS
========================================================== */

const searchInput = document.querySelector("#searchInput");

/* ==========================================================
SEARCH PRODUCTS
========================================================== */

function searchProducts(query) {

    const search = query.trim().toLowerCase();

    if (search === "") {

        renderProducts();

        return;

    }

    const filteredProducts = Store.getProducts().filter(product => {

        const searchableText = [

            product.name,
            product.category,
            product.badge,
            product.description,
            ...(product.features || [])

        ]

        .join(" ")

        .toLowerCase();

        return searchableText.includes(search);

    });

    renderProducts(filteredProducts);

}

/* ==========================================================
SEARCH EVENT
========================================================== */

if (searchInput) {

    searchInput.addEventListener("input", event => {

        searchProducts(event.target.value);

    });

}

/* ==========================================================
CLEAR SEARCH WITH ESC
========================================================== */

if (searchInput) {

    searchInput.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        searchInput.value = "";

        renderProducts();

    });

}