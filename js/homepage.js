/* ==========================================================
   FEATURED PRODUCTS
========================================================== */

const featuredContainer = document.querySelector("#featuredProducts");

if (featuredContainer) {

    const featured = products.filter(product => product.featured);

    featured.forEach(product => {

        featuredContainer.innerHTML += `

        <div class="product">

            <span class="product-badge">
                ${product.badge}
            </span>

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">£${product.price}</p>

            <div class="product-buttons">

                <button class="wishlist-btn">
                    ❤ Wishlist
                </button>

                <button class="cart-btn">
                    🛒 Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}


/* ==========================================================
   NEW DROPS
========================================================== */

const newDropsContainer = document.querySelector("#newDrops");

if (newDropsContainer) {

    const newDrops = products.filter(product => product.badge === "New Drop");

    newDrops.forEach(product => {

        newDropsContainer.innerHTML += `

        <div class="product">

            <span class="product-badge">
                ${product.badge}
            </span>

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">£${product.price}</p>

            <div class="product-buttons">

                <button class="wishlist-btn">
                    ❤ Wishlist
                </button>

                <button class="cart-btn">
                    🛒 Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}