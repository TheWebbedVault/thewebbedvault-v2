/* ==========================================================
WISHLIST
========================================================== */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach((button,index)=>{

button.addEventListener("click",()=>{

const exists = wishlist.find(item=>item.id===products[index].id);

if(exists){

alert("Already in wishlist ❤️");

return;

}

wishlist.push(products[index]);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

updateWishlistCount();

alert("Added to wishlist ❤️");

});

});

function updateWishlistCount(){

const count=document.querySelector("#wishlistCount");

if(count){

count.textContent=wishlist.length;

}

}

updateWishlistCount();