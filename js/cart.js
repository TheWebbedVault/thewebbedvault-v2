





/* ==========================================================
ADD TO CART
========================================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const existingItem = cart.find(item => item.id === products[index].id);

if(existingItem){

    existingItem.quantity++;

}

else{

    cart.push({

        ...products[index],

        quantity:1

    });

}

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(products[index].name + " added to cart!");

    });

});

function updateCartCount(){

    const cartCount = document.querySelector("#cartCount");

    if(cartCount){

        cartCount.textContent = cart.length;

    }

}

updateCartCount();

/* ==========================================================
DISPLAY CART
========================================================== */

const cartItemsContainer = document.querySelector("#cartItems");

if(cartItemsContainer){

    let subtotal = 0;

    if(cart.length === 0){

        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(item => {

            subtotal += item.price * item.quantity;

            cartItemsContainer.innerHTML += `

            <div class="cart-item">

                <img src="../${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

               

                    <p>

£${item.price}

</p>

<div class="quantity">

<button class="minus" data-id="${item.id}">

-

</button>

<span>

${item.quantity}

</span>

<button class="plus" data-id="${item.id}">

+

</button>

</div>

                </div>

            </div>

            `;

        });

    }

    const subtotalElement = document.querySelector("#subtotal");
    const totalElement = document.querySelector("#total");

    if(subtotalElement){

        subtotalElement.textContent = "£" + subtotal.toFixed(2);

    }

    if(totalElement){

        totalElement.textContent = "£" + subtotal.toFixed(2);

    }

}

/* ==========================================================
CHANGE QUANTITY
========================================================== */

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("plus")){

const id = Number(e.target.dataset.id);

const item = cart.find(product=>product.id===id);

item.quantity++;

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

if(e.target.classList.contains("minus")){

const id = Number(e.target.dataset.id);

const item = cart.find(product=>product.id===id);

item.quantity--;

if(item.quantity<=0){

cart=cart.filter(product=>product.id!==id);

}

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

});
