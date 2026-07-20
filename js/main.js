/* ==========================
   AUTO HIDE HEADER
========================== */

let lastScroll = 0;

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove("header-hidden");
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;

});