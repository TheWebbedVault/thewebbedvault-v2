/* ==========================================================
   THE WEBBED VAULT
   PRODUCT PAGE
========================================================== */

"use strict";

console.log("Product.js loaded");


/* ==========================================================
   GET PRODUCT
========================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(
        params.get("id")
    );

const product =
    Store.getProduct(
        productId
    );


/* ==========================================================
   PRODUCT NOT FOUND
========================================================== */

if (!product) {

    document.body.innerHTML = `

        <h1
            style="
                text-align:center;
                margin-top:100px;
            "
        >
            Product not found.
        </h1>

    `;

    throw new Error(
        "Product not found."
    );

}


/* ==========================================================
   ELEMENTS
========================================================== */

const productName =
    document.getElementById(
        "productName"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productDescription =
    document.getElementById(
        "productDescription"
    );

const productBadge =
    document.getElementById(
        "productBadge"
    );

const productShipping =
    document.getElementById(
        "productShipping"
    );

const productReturns =
    document.getElementById(
        "productReturns"
    );

const productFeatures =
    document.getElementById(
        "productFeatures"
    );

const productCartBtn =
    document.getElementById(
        "productCartBtn"
    );

const productWishlistBtn =
    document.getElementById(
        "productWishlistBtn"
    );

const mainImage =
    document.getElementById(
        "mainImage"
    );

const thumbnails =
    document.getElementById(
        "thumbnails"
    );

const relatedProducts =
    document.getElementById(
        "relatedProducts"
    );


console.log(
    "Wishlist button:",
    productWishlistBtn
);

console.log(
    "Cart button:",
    productCartBtn
);


/* ==========================================================
   PRODUCT INFORMATION
========================================================== */

if (productName) {

    productName.textContent =
        product.name;

}

if (productPrice) {

    productPrice.textContent =
        `£${product.price.toFixed(2)}`;

}

if (productDescription) {

    productDescription.textContent =
        product.description;

}

if (productBadge) {

    productBadge.textContent =
        product.badge;

}

if (productShipping) {

    productShipping.textContent =
        product.shipping;

}

if (productReturns) {

    productReturns.textContent =
        product.returns;

}


if (productCartBtn) {

    productCartBtn.dataset.id =
        product.id;

}


/* ==========================================================
   WISHLIST INITIAL STATE
========================================================== */

if (
    productWishlistBtn &&
    Store.isInWishlist(
        product.id
    )
) {

    productWishlistBtn.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

    productWishlistBtn.classList.add(
        "active"
    );

}


/* ==========================================================
   FEATURES
========================================================== */

if (
    product.features &&
    productFeatures
) {

    productFeatures.innerHTML =
        "";

    product.features.forEach(
        feature => {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                `✓ ${feature}`;

            productFeatures.appendChild(
                li
            );

        }
    );

}


/* ==========================================================
   MAIN IMAGE
========================================================== */

if (mainImage) {

    mainImage.src =
        `../${product.image}`;

    mainImage.alt =
        product.name;

}


/* ==========================================================
   SET MAIN PRODUCT IMAGE
========================================================== */

function setMainImage(
    image
) {

    if (!mainImage) {
        return;
    }


    /*
       Make sure the image is visible.
    */

    mainImage.style.display =
        "block";


    /*
       Remove any video that may
       currently be covering it.
    */

    const mainVideo =
        document.getElementById(
            "mainProductVideo"
        );


    if (mainVideo) {

        mainVideo.pause();

        mainVideo.style.display =
            "none";

    }


    /*
       Change image immediately.

       No timeout is used here,
       so thumbnails cannot get
       stuck on the previous image.
    */

    mainImage.src =
        `../${image}`;

    mainImage.alt =
        product.name;

}


/* ==========================================================
   IMAGE GALLERY
========================================================== */

if (
    thumbnails &&
    Array.isArray(
        product.images
    )
) {

    thumbnails.innerHTML =
        "";


    const isMobile =
        window.innerWidth <= 768;


    product.images.forEach(
        (
            image,
            index
        ) => {

            /* ==============================================
               NORMAL IMAGE THUMBNAIL
            ============================================== */

            const thumbnail =
                document.createElement(
                    "img"
                );


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


            /* ==============================================
               IMAGE CLICK
            ============================================== */

            thumbnail.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    /*
                       Switch back from video
                       to the selected image.
                    */

                    setMainImage(
                        image
                    );


                    /*
                       Remove active state
                       from all image thumbnails.
                    */

                    thumbnails
                        .querySelectorAll(
                            ".thumbnail"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    /*
                       Remove active state
                       from video thumbnail.
                    */

                    thumbnails
                        .querySelectorAll(
                            ".video-thumbnail"
                        )
                        .forEach(
                            video => {

                                video.classList.remove(
                                    "active"
                                );

                            }
                        );


                    /*
                       Activate clicked image.
                    */

                    thumbnail.classList.add(
                        "active"
                    );

                }
            );


            thumbnails.appendChild(
                thumbnail
            );


            /* ==============================================
               MOBILE VIDEO SLOT

               Inserted AFTER the first image only.

               Desktop is completely unchanged.
            ============================================== */

            if (
                isMobile &&
                index === 0 &&
                product.video
            ) {

                createMobileVideoThumbnail();

            }

        }
    );

}


/* ==========================================================
   CREATE MOBILE VIDEO THUMBNAIL
========================================================== */

function createMobileVideoThumbnail() {

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
            preload="metadata">

            <source
                src="../${product.video}"
                type="video/mp4">

        </video>

        <span class="video-thumbnail-icon">

            <i
                class="fa-solid fa-play"
            ></i>

        </span>

    `;


    const thumbnailPreview =
        videoThumbnail.querySelector(
            ".video-thumbnail-preview"
        );


    /*
       Try to display the first
       frame of the video.
    */

    if (thumbnailPreview) {

        thumbnailPreview.addEventListener(
            "loadedmetadata",
            () => {

                try {

                    thumbnailPreview.currentTime =
                        0.01;

                }

                catch (error) {

                    console.warn(
                        "Could not seek video thumbnail.",
                        error
                    );

                }

            }
        );


        thumbnailPreview.addEventListener(
            "loadeddata",
            () => {

                thumbnailPreview.pause();

            }
        );

    }


    /* ==============================================
       VIDEO THUMBNAIL CLICK
    ============================================== */

    videoThumbnail.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            /*
               Remove active state
               from all thumbnails.
            */

            thumbnails
                .querySelectorAll(
                    ".thumbnail"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


            videoThumbnail.classList.add(
                "active"
            );


            /*
               Hide main image.
            */

            if (mainImage) {

                mainImage.style.display =
                    "none";

            }


            /*
               Find or create main video.
            */

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


            /*
               Load selected product video.
            */

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

/* ==========================================================
   ADD TO CART
========================================================== */

if (productCartBtn) {

    productCartBtn.addEventListener(
        "click",
        () => {

            Store.addToCart(
                product.id
            );

            Store.showToast(
                "Added to cart 🛒"
            );

        }
    );

}


/* ==========================================================
   WISHLIST BUTTON
========================================================== */

if (productWishlistBtn) {

    console.log(
        "Wishlist listener attached"
    );


    productWishlistBtn.onclick =
        function(event) {

            event.preventDefault();
            event.stopPropagation();


            const inWishlist =
                Store.isInWishlist(
                    product.id
                );


            if (inWishlist) {

                Store.removeFromWishlist(
                    product.id
                );


                productWishlistBtn.innerHTML =
                    '<i class="fa-regular fa-heart"></i>';


                productWishlistBtn.classList.remove(
                    "active"
                );


                Store.showToast(
                    "Removed from wishlist ❤️"
                );

            }

            else {

                Store.addToWishlist(
                    product.id
                );


                productWishlistBtn.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';


                productWishlistBtn.classList.add(
                    "active"
                );


                Store.showToast(
                    "Added to wishlist ❤️"
                );

            }


            Store.updateWishlistCount();

        };

}


/* ==========================================================
   RELATED PRODUCTS
========================================================== */

function renderRelatedProducts() {

    if (
        !relatedProducts
    ) {

        return;

    }


    const related =
        Store.getProducts()
            .filter(
                item => {

                    return (

                        item.category ===
                        product.category

                        &&

                        item.id !==
                        product.id

                    );

                }
            )
            .slice(
                0,
                4
            );


    relatedProducts.innerHTML =
        related
            .map(
                item => `

                    <div
                        class="product-card"
                    >

                        <a
                            href="product.html?id=${item.id}"
                        >

                            <img
                                src="../${item.image}"
                                alt="${item.name}"
                            >

                        </a>


                        <span
                            class="badge"
                        >
                            ${item.badge}
                        </span>


                        <h3>
                            ${item.name}
                        </h3>


                        <p>
                            £${item.price.toFixed(2)}
                        </p>


                        <button
                            class="cart-btn"
                            data-id="${item.id}"
                        >

                            🛒 Add to Cart

                        </button>

                    </div>

                `
            )
            .join("");


    relatedProducts
        .querySelectorAll(
            ".cart-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.id
                            );


                        Store.addToCart(
                            id
                        );


                        Store.showToast(
                            "Added to cart 🛒"
                        );

                    }
                );

            }
        );

}


/* ==========================================================
   INITIALISE RELATED PRODUCTS
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderRelatedProducts();

    }
);


/* ==========================================================
   PRODUCT IMAGE HOVER ZOOM
========================================================== */

const imageContainer =
    document.querySelector(
        ".main-product-image"
    );


if (imageContainer) {

    imageContainer.addEventListener(
        "mouseenter",
        () => {

            console.log(
                "ENTER"
            );


            if (mainImage) {

                mainImage.classList.add(
                    "zoomed"
                );

            }

        }
    );


    imageContainer.addEventListener(
        "mouseleave",
        () => {

            console.log(
                "LEAVE"
            );


            if (mainImage) {

                mainImage.classList.remove(
                    "zoomed"
                );

            }

        }
    );

}

/* ==========================================================
   FINAL PRODUCT PAGE SAFETY CHECKS
========================================================== */


/*
   Make sure the main image is visible
   when the product page first loads.
*/

if (mainImage) {

    mainImage.style.display =
        "block";

}


/*
   Make sure any old product video
   is hidden when the page first loads.
*/

const initialProductVideo =
    document.getElementById(
        "mainProductVideo"
    );


if (initialProductVideo) {

    initialProductVideo.pause();

    initialProductVideo.style.display =
        "none";

}


/*
   Prevent the page from trying to
   use an empty product image array.
*/

if (
    thumbnails &&
    !Array.isArray(
        product.images
    )
) {

    thumbnails.innerHTML =
        "";

}


/* ==========================================================
   PRODUCT.JS READY
========================================================== */

console.log(
    "Product page initialised:",
    product.name
);

