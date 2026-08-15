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
   CART BUTTON
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
   MAIN PRODUCT IMAGE
========================================================== */

if (mainImage) {

    mainImage.src =
        `../${product.image}`;

    mainImage.alt =
        product.name;

}


/* ==========================================================
   HIDE PRODUCT VIDEO
========================================================== */

function hideProductVideo() {

    const mainVideo =
        document.getElementById(
            "mainProductVideo"
        );


    if (!mainVideo) {

        return;

    }


    mainVideo.pause();

    mainVideo.style.display =
        "none";

}


/* ==========================================================
   CLEAR ACTIVE THUMBNAILS
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
    selectedThumbnail
) {

    if (!mainImage) {

        return;

    }


    /*
       Hide video first.
    */

    hideProductVideo();


    /*
       Make image visible.
    */

    mainImage.style.display =
        "block";


    /*
       Change image immediately.
    */

    mainImage.src =
        `../${image}`;


    mainImage.alt =
        product.name;


    /*
       Update active thumbnail.
    */

    clearActiveThumbnails();


    if (selectedThumbnail) {

        selectedThumbnail.classList.add(
            "active"
        );

    }

}


/* ==========================================================
   MAIN IMAGE LOAD
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


    /*
       Remove active state.
    */

    clearActiveThumbnails();


    /*
       Activate video thumbnail.
    */

    videoThumbnail.classList.add(
        "active"
    );


    /*
       Hide image.
    */

    mainImage.style.display =
        "none";


    /*
       Find existing video.
    */

    let mainVideo =
        document.getElementById(
            "mainProductVideo"
        );


    /*
       Create video if needed.
    */

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


    /*
       Set video source.
    */

    mainVideo.src =
        `../${product.video}`;


    mainVideo.style.display =
        "block";


    mainVideo.load();

}


/* ==========================================================
   PRODUCT IMAGE GALLERY
========================================================== */

if (
    thumbnails &&
    Array.isArray(
        product.images
    ) &&
    product.images.length > 0
) {

    /*
       Remove anything previously
       inside the thumbnail container.
    */

    thumbnails.innerHTML =
        "";


    /*
       Create every product image.
    */

    product.images.forEach(
        (
            image,
            index
        ) => {

            /* ==============================================
               THUMBNAIL BUTTON
            ============================================== */

            const thumbnail =
                document.createElement(
                    "button"
                );


            thumbnail.type =
                "button";


            thumbnail.className =
                "thumbnail";


            thumbnail.setAttribute(
                "aria-label",
                `View image ${index + 1} of ${product.name}`
            );


            /*
               Explicit sizing.

               This prevents the existing
               CSS from collapsing the thumbnail.
            */

            thumbnail.style.position =
                "relative";


            thumbnail.style.display =
                "block";


            thumbnail.style.width =
                "100%";


            thumbnail.style.height =
                "auto";


            thumbnail.style.aspectRatio =
                "1 / 1";


            thumbnail.style.padding =
                "0";


            thumbnail.style.margin =
                "0";


            thumbnail.style.overflow =
                "hidden";


            thumbnail.style.border =
                "none";


            thumbnail.style.background =
                "transparent";


            thumbnail.style.cursor =
                "pointer";


            thumbnail.style.touchAction =
                "manipulation";


            thumbnail.style.flexShrink =
                "0";


            /*
               First image active.
            */

            if (index === 0) {

                thumbnail.classList.add(
                    "active"
                );

            }


            /* ==============================================
               THUMBNAIL IMAGE
            ============================================== */

            const thumbnailImage =
                document.createElement(
                    "img"
                );


            thumbnailImage.src =
                `../${image}`;


            thumbnailImage.alt =
                `${product.name} image ${index + 1}`;


            thumbnailImage.draggable =
                false;


            thumbnailImage.style.display =
                "block";


            thumbnailImage.style.width =
                "100%";


            thumbnailImage.style.height =
                "100%";


            thumbnailImage.style.minWidth =
                "100%";


            thumbnailImage.style.minHeight =
                "100%";


            thumbnailImage.style.objectFit =
                "cover";


            thumbnailImage.style.objectPosition =
                "center";


            thumbnailImage.style.pointerEvents =
                "none";


            /*
               Add actual image inside button.
            */

            thumbnail.appendChild(
                thumbnailImage
            );


            /* ==============================================
               IMAGE CLICK
            ============================================== */

            thumbnail.addEventListener(
                "click",
                () => {

                    showImage(
                        image,
                        thumbnail
                    );

                }
            );


            /*
               Add thumbnail to gallery.
            */

            thumbnails.appendChild(
                thumbnail
            );


            /* ==============================================
               MOBILE VIDEO SLOT

               ONLY after image 1.

               Slot 1 = Image 1
               Slot 2 = Video
               Slot 3 = Image 2
               Slot 4 = Image 3
               Slot 5 = Image 4
               Slot 6 = Image 5
            ============================================== */

            if (
                index === 0 &&
                window.innerWidth <= 768 &&
                product.video
            ) {

                createVideoThumbnail();

            }


            /* ==============================================
               CREATE MOBILE VIDEO THUMBNAIL
            ============================================== */

            function createVideoThumbnail() {

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
                   Same sizing as image thumbnails.
                */

                videoThumbnail.style.position =
                    "relative";


                videoThumbnail.style.display =
                    "block";


                videoThumbnail.style.width =
                    "100%";


                videoThumbnail.style.height =
                    "auto";


                videoThumbnail.style.aspectRatio =
                    "1 / 1";


                videoThumbnail.style.padding =
                    "0";


                videoThumbnail.style.margin =
                    "0";


                videoThumbnail.style.overflow =
                    "hidden";


                videoThumbnail.style.border =
                    "none";


                videoThumbnail.style.background =
                    "#111";


                videoThumbnail.style.cursor =
                    "pointer";


                videoThumbnail.style.touchAction =
                    "manipulation";


                videoThumbnail.style.flexShrink =
                    "0";


                /*
                   Video preview.
                */

                const preview =
                    document.createElement(
                        "video"
                    );


                preview.className =
                    "video-thumbnail-preview";


                preview.muted =
                    true;


                preview.playsInline =
                    true;


                preview.setAttribute(
                    "playsinline",
                    ""
                );


                preview.preload =
                    "metadata";


                preview.src =
                    `../${product.video}`;


                preview.style.display =
                    "block";


                preview.style.width =
                    "100%";


                preview.style.height =
                    "100%";


                preview.style.objectFit =
                    "cover";


                preview.style.pointerEvents =
                    "none";


                /*
                   Play icon.
                */

                const icon =
                    document.createElement(
                        "span"
                    );


                icon.className =
                    "video-thumbnail-icon";


                icon.innerHTML =
                    '<i class="fa-solid fa-play"></i>';


                icon.style.position =
                    "absolute";


                icon.style.inset =
                    "0";


                icon.style.display =
                    "flex";


                icon.style.alignItems =
                    "center";


                icon.style.justifyContent =
                    "center";


                icon.style.pointerEvents =
                    "none";


                /*
                   Add preview + icon.
                */

                videoThumbnail.appendChild(
                    preview
                );


                videoThumbnail.appendChild(
                    icon
                );


                /*
                   Video thumbnail click.
                */

                videoThumbnail.addEventListener(
                    "click",
                    () => {

                        showProductVideo(
                            videoThumbnail
                        );

                    }
                );


                /*
                   Add video immediately
                   after first image.
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
               Don't zoom while video
               is being displayed.
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

