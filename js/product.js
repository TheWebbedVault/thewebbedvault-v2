/* ==========================================================
   PRODUCT PAGE
========================================================== */

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

// Find the product
const product = products.find(p => p.id === productId);

// If no product exists
if (!product) {

    document.body.innerHTML = `
        <h1 style="text-align:center;margin-top:100px;">
            Product not found.
        </h1>
    `;

}

// Product found
else {

    // Main information
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = `£${product.price}`;
    document.getElementById("productDescription").textContent = product.description;
// Features
const featuresList = document.getElementById("productFeatures");

if (product.features) {

    product.features.forEach(feature => {

        const li = document.createElement("li");

        li.textContent = "✓ " + feature;

        featuresList.appendChild(li);

    });

}

// Shipping
document.getElementById("productShipping").textContent = product.shipping || "";

// Returns
document.getElementById("productReturns").textContent = product.returns || "";
document.getElementById("productBadge").textContent = product.badge;

    // Main image
    const mainImage = document.getElementById("mainImage");
    mainImage.src = "../" + product.image;
    mainImage.alt = product.name;

    // Gallery
    const thumbnails = document.getElementById("thumbnails");

    if (product.images) {

        product.images.forEach(image => {

            const img = document.createElement("img");

            img.src = "../" + image;

            img.alt = product.name;

            img.addEventListener("click", () => {

                mainImage.src = "../" + image;

            });

            thumbnails.appendChild(img);

        });

    }

}