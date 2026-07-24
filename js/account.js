"use strict";

function openEcwidAccount(page = "account") {

    sessionStorage.setItem("ecwidPage", page);

    window.location.href = "Cart.html";

}