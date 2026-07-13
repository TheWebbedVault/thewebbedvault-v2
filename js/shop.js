/* ==========================================================
BUILD SHOP PAGE
========================================================== */

const shopContainer = document.querySelector(".shop-products");

if (shopContainer) {

    products.forEach(product => {

        shopContainer.innerHTML += `

        <div class="product">

            <img src="../${product.image}" alt="${product.name}">

            <span class="product-badge">${product.badge}</span>

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
CATEGORY FILTERS
========================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelector(".active").classList.remove("active");

button.classList.add("active");

const filter = button.dataset.filter;

const cards = document.querySelectorAll(".product");

cards.forEach(card=>{

const title = card.querySelector("h3").textContent;

if(filter==="All"){

card.style.display="block";

}

else if(title.includes(filter.replace(" Web Shooters",""))){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

});