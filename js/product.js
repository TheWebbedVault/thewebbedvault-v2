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


/* ==========================================================
   PRODUCT INFORMATION
========================================================== */

if (productName) {

    productName.textContent =
        product.name;

}


if (productPrice) {

    productPrice.textContent =
        `£${Number(
            product.price
        ).toFixed(2)}`;

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


/* ==========================================================
   CART BUTTON ID
========================================================== */

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
   MAIN IMAGE SWITCHER
========================================================== */

function setMainImage(
    image
) {

    if (!mainImage) {

        return;

    }


    /*
       Hide any product video.
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
       Show the image.
    */

    mainImage.style.display =
        "block";


    /*
       Change image.
    */

    mainImage.src =
        `../${image}`;

}


/* ==========================================================
   IMAGE LOADING
========================================================== */

if (mainImage) {

    mainImage.addEventListener(
        "load",
        () => {

            mainImage.classList.remove(
                "changing"
            );

        }
    );

}


/* ==========================================================
   REMOVE ACTIVE THUMBNAILS
========================================================== */

function clearActiveThumbnails() {

    if (!thumbnails) {

        return;

    }


    thumbnails
        .querySelectorAll(
            ".thumbnail"
        )
        .forEach(
            thumbnail => {

                thumbnail.classList.remove(
                    "active"
                );

            }
        );

}


/* ==========================================================
   SHOW IMAGE
========================================================== */

function showImage(
    image,
    thumbnail
) {

    setMainImage(
        image
    );


    clearActiveThumbnails();


    if (thumbnail) {

        thumbnail.classList.add(
            "active"
        );

    }

}


/* ==========================================================
   SHOW PRODUCT VIDEO
========================================================== */

function showProductVideo(
    videoThumbnail
) {

    if (
        !product.video ||
        !mainImage
    ) {

        return;

    }


    clearActiveThumbnails();


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

        mainVideo.setAttribute(
            "playsinline",
            ""
        );

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


    product.images.forEach(
        (
            image,
            index
        ) => {

            const thumbnail =
                document.createElement(
                    "img"
                );


            thumbnail.src =
                `../${image}`;

            thumbnail.alt =
                `${product.name} ${index + 1}`;

            thumbnail.className =
                "thumbnail";


            if (index === 0) {

                thumbnail.classList.add(
                    "active"
                );

            }


            /*
               Normal image click.

               This works on both desktop
               and mobile touch devices.
            */

            thumbnail.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    showImage(
                        image,
                        thumbnail
                    );

                }
            );


            thumbnails.appendChild(
                thumbnail
            );


            /* ==================================================
               MOBILE VIDEO SLOT

               Insert video AFTER image 1.

               Therefore:
               Slot 1 = Image 1
               Slot 2 = Video
               Slot 3 = Image 2
               Slot 4 = Image 3
               Slot 5 = Image 4
               Slot 6 = Image 5

               ONLY MOBILE.
            ================================================== */

            if (
                index === 0 &&
                window.innerWidth <= 768 &&
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


                /*
                   Give the button the same
                   basic sizing as the images.
                */

                videoThumbnail.style.width =
                    "100%";

                videoThumbnail.style.aspectRatio =
                    "1 / 1";

                videoThumbnail.style.padding =
                    "0";

                videoThumbnail.style.margin =
                    "0";

                videoThumbnail.style.border =
                    "none";

                videoThumbnail.style.overflow =
                    "hidden";

                videoThumbnail.style.position =
                    "relative";

                videoThumbnail.style.cursor =
                    "pointer";


                videoThumbnail.innerHTML = `

                    <video
                        class="video-thumbnail-preview"
                        muted
                        playsinline
                        preload="metadata"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            display:block;
                            pointer-events:none;
                        "
                    >

                        <source
                            src="../${product.video}"
                            type="video/mp4"
                        >

                    </video>

                    <span
                        class="video-thumbnail-icon"
                        style="
                            position:absolute;
                            inset:0;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            pointer-events:none;
                        "
                    >

                        <i
                            class="fa-solid fa-play"
                            style="
                                width:34px;
                                height:34px;
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:rgba(0,0,0,.72);
                                color:#fff;
                                font-size:.75rem;
                                padding-left:2px;
                            "
                        ></i>

                    </span>

                `;


                const preview =
                    videoThumbnail.querySelector(
                        ".video-thumbnail-preview"
                    );


                /*
                   Force the video to display
                   its first frame as thumbnail.
                */

                if (preview) {

                    preview.addEventListener(
                        "loadedmetadata",
                        () => {

                            try {

                                preview.currentTime =
                                    0.01;

                            }

                            catch (error) {

                                console.warn(
                                    "Could not seek video preview.",
                                    error
                                );

                            }

                        }
                    );


                    preview.addEventListener(
                        "loadeddata",
                        () => {

                            preview.pause();

                        }
                    );

                }


                /*
                   Video click.
                */

                videoThumbnail.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        showProductVideo(
                            videoThumbnail
                        );

                    }
                );


                /*
                   Add video immediately
                   AFTER image 1.
                */

                thumbnails.appendChild(
                    videoThumbnail
                );

            }

        }
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
   WISHLIST
========================================================== */

if (productWishlistBtn) {

    productWishlistBtn.addEventListener(
        "click",
        event => {

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

        }
    );

}

/* ==========================================================
   RELATED PRODUCTS
========================================================== */

function renderRelatedProducts() {

    if (!relatedProducts) {

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
                            £${Number(
                                item.price
                            ).toFixed(2)}
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
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


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
   DESKTOP ONLY
========================================================== */

const imageContainer =
    document.querySelector(
        ".main-product-image"
    );


if (imageContainer) {

    imageContainer.addEventListener(
        "mouseenter",
        () => {

            /*
               Don't zoom when the product
               video is currently displayed.
            */

            const mainVideo =
                document.getElementById(
                    "mainProductVideo"
                );


            if (
                mainVideo &&
                mainVideo.style.display ===
                "block"
            ) {

                return;

            }


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

            if (mainImage) {

                mainImage.classList.remove(
                    "zoomed"
                );

            }

        }
    );

}


/* ==========================================================
   FINAL PRODUCT PAGE READY
========================================================== */

console.log(
    "Product page ready:",
    product.name
);

