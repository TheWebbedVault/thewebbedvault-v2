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

    const isShopPage = window.location.pathname
        .toLowerCase()
        .includes("shop");

    if (isShopPage) {

        searchInput.addEventListener("input", event => {

            searchProducts(event.target.value);

        });

    } else {

        const performSearch = () => {

            const query = searchInput.value.trim();

            if (!query) return;

            window.location.href =
                `Html/Shop.html?search=${encodeURIComponent(query)}`;

        };

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                performSearch();

            }

        });

        const searchButton = document.querySelector(".nav-search button");

        if (searchButton) {

            searchButton.addEventListener("click", performSearch);

        }

    }

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