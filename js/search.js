/* ==========================================================
SEARCH PRODUCTS
========================================================== */

const searchInput = document.querySelector("#searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".product");

        cards.forEach(card=>{

            const title = card.querySelector("h3").textContent.toLowerCase();

            if(title.includes(value)){

                card.style.display="block";

            }

            else{

                card.style.display="none";

            }

        });

    });

}