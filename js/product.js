/* ==========================================================
   THE WEBBED VAULT
   PRODUCT PAGE
========================================================== */

"use strict";
console.log("Product.js loaded");
/* ==========================================================
GET PRODUCT
========================================================== */

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = Store.getProduct(productId);

/* ==========================================================
PRODUCT NOT FOUND
========================================================== */

if (!product) {

    document.body.innerHTML = `

        <h1 style="text-align:center;margin-top:100px;">

            Product not found.

        </h1>

    `;

    throw new Error("Product not found.");

}

/* ==========================================================
ELEMENTS
========================================================== */

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productDescription = document.getElementById("productDescription");

const productBadge = document.getElementById("productBadge");

const productShipping = document.getElementById("productShipping");

const productReturns = document.getElementById("productReturns");

const productFeatures = document.getElementById("productFeatures");

const productCartBtn = document.getElementById("productCartBtn");

const productWishlistBtn = document.getElementById("productWishlistBtn");


console.log("Wishlist button:", productWishlistBtn);
console.log("Cart button:", productCartBtn);

const mainImage = document.getElementById("mainImage");

const thumbnails = document.getElementById("thumbnails");

const relatedProducts = document.getElementById("relatedProducts");

/* ==========================================================
PRODUCT INFORMATION
========================================================== */

productName.textContent = product.name;

productPrice.textContent = `£${product.price.toFixed(2)}`;

productDescription.textContent = product.description;

productBadge.textContent = product.badge;

productShipping.textContent = product.shipping;

productReturns.textContent = product.returns;

if (productCartBtn) {

    productCartBtn.dataset.id = product.id;

}

if (productWishlistBtn && Store.isInWishlist(product.id)) {

    productWishlistBtn.innerHTML =
'<i class="fa-solid fa-heart"></i>';

productWishlistBtn.classList.add("active");


}
/* ==========================================================
FEATURES
========================================================== */

if (product.features && productFeatures) {

    productFeatures.innerHTML = "";

    product.features.forEach(feature => {

        const li = document.createElement("li");

        li.textContent = `✓ ${feature}`;

        productFeatures.appendChild(li);

    });

}

/* ==========================================================
MAIN IMAGE
========================================================== */

mainImage.src = `../${product.image}`;

mainImage.alt = product.name;

/* ==========================================================
   IMAGE GALLERY
========================================================== */

if (thumbnails && product.images) {

    thumbnails.innerHTML = "";


    /* ======================================================
       CHECK IF MOBILE
    ====================================================== */

    const isMobile =
        window.innerWidth <= 768;


    product.images.forEach((image, index) => {

        const thumbnail =
            document.createElement("img");


        thumbnail.src =
            `../${image}`;


        thumbnail.alt =
            `${product.name} ${index + 1}`;


        thumbnail.classList.add(
            "thumbnail"
        );


        if (index === 0) {

            thumbnail.classList.add(
                "active"
            );

        }


        thumbnail.addEventListener(
            "click",
            () => {

                setMainImage(image);


                document
                    .querySelectorAll(
                        ".thumbnail"
                    )
                    .forEach(img =>
                        img.classList.remove(
                            "active"
                        )
                    );


                document
                    .querySelectorAll(
                        ".video-thumbnail"
                    )
                    .forEach(video =>
                        video.classList.remove(
                            "active"
                        )
                    );


                thumbnail.classList.add(
                    "active"
                );

            }
        );


        thumbnails.appendChild(
            thumbnail
        );


        /* ==================================================
           MOBILE VIDEO SLOT
           
           ONLY INSERTS ON MOBILE
           AND ONLY AFTER FIRST IMAGE
        ================================================== */

        if (
            isMobile &&
            index === 0 &&
            product.video
        ) {

            const videoThumbnail =
    document.createElement(
        "button"
    );

videoThumbnail.type =
    "button";

videoThumbnail.className =
    "thumbnail video-thumbnail";

videoThumbnail.setAttribute(
    "aria-label",
    `Play video for ${product.name}`
);


videoThumbnail.innerHTML = `

    <video
        class="video-thumbnail-preview"
        muted
        playsinline
        preload="auto">

        <source
            src="../${product.video}"
            type="video/mp4">

    </video>

    <span class="video-thumbnail-icon">

        <i class="fa-solid fa-play"></i>

    </span>

`;

const thumbnailPreview =
    videoThumbnail.querySelector(
        ".video-thumbnail-preview"
    );


thumbnailPreview.addEventListener(
    "loadedmetadata",
    () => {

        thumbnailPreview.currentTime = 0.01;

    }
);


thumbnailPreview.addEventListener(
    "loadeddata",
    () => {

        thumbnailPreview.pause();

    }
);



            videoThumbnail.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".thumbnail"
                        )
                        .forEach(img =>
                            img.classList.remove(
                                "active"
                            )
                        );


                    document
                        .querySelectorAll(
                            ".video-thumbnail"
                        )
                        .forEach(video =>
                            video.classList.remove(
                                "active"
                            )
                        );


                    videoThumbnail.classList.add(
                        "active"
                    );


                    mainImage.style.display =
                        "none";


                    let mainVideo =
                        document.getElementById(
                            "mainProductVideo"
                        );


                    if (!mainVideo) {

                        mainVideo =
                            document.createElement(
                                "video"
                            );


                        mainVideo.id =
                            "mainProductVideo";


                        mainVideo.className =
                            "main-product-video";


                        mainVideo.controls =
                            true;


                        mainVideo.playsInline =
                            true;


                        mainVideo.preload =
                            "metadata";


                        mainImage
                            .parentElement
                            .appendChild(
                                mainVideo
                            );

                    }


                    mainVideo.src =
                        `../${product.video}`;


                    mainVideo.style.display =
                        "block";


                    mainVideo.load();

                }
            );


            thumbnails.appendChild(
                videoThumbnail
            );

        }

    });

}

/* ==========================================================
ADD TO CART
========================================================== */

if (productCartBtn) {

    productCartBtn.addEventListener("click", () => {

        Store.addToCart(product.id);

        Store.showToast("Added to cart 🛒");

    });

}

/* ==========================================================
   WISHLIST BUTTON
========================================================== */

if (productWishlistBtn) {

    console.log("Wishlist listener attached");

    productWishlistBtn.onclick = function (event) {

        event.preventDefault();
        event.stopPropagation();

        const inWishlist = Store.isInWishlist(product.id);

        if (inWishlist) {

            Store.removeFromWishlist(product.id);

            productWishlistBtn.innerHTML =
       '<i class="fa-regular fa-heart"></i>';

       productWishlistBtn.classList.remove("active");
            Store.showToast("Removed from wishlist ❤️");

        } else {

            Store.addToWishlist(product.id);

            productWishlistBtn.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

            Store.showToast("Added to wishlist ❤️");

        }

        Store.updateWishlistCount();

    };

}
/* ==========================================================
RELATED PRODUCTS
========================================================== */

function renderRelatedProducts() {

    if (!relatedProducts) return;

    const related = Store.getProducts()

        .filter(item => {

            return (
                item.category === product.category &&
                item.id !== product.id
            );

        })

        .slice(0, 4);

    relatedProducts.innerHTML = related.map(item => `

        <div class="product-card">

            <a href="product.html?id=${item.id}">

                <img
                    src="../${item.image}"
                    alt="${item.name}">

            </a>

            <span class="badge">

                ${item.badge}

            </span>

            <h3>${item.name}</h3>

            <p>£${item.price.toFixed(2)}</p>

            <button
                class="cart-btn"
                data-id="${item.id}">

                🛒 Add to Cart

            </button>

        </div>

    `).join("");

    relatedProducts
        .querySelectorAll(".cart-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                Store.addToCart(id);

                Store.showToast("Added to cart 🛒");

            });

        });

}

/* ==========================================================
INITIALISE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderRelatedProducts();

});
/* ==========================================================
   TEST IMAGE HOVER
========================================================== */

const imageContainer = document.querySelector(".main-product-image");

console.log(imageContainer);

imageContainer.addEventListener("mouseenter", () => {

    console.log("ENTER");

    mainImage.classList.add("zoomed");

});

imageContainer.addEventListener("mouseleave", () => {

    console.log("LEAVE");

    mainImage.classList.remove("zoomed");

});