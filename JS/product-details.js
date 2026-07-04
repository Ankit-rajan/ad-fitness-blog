// ===============================
// PRODUCT DETAILS JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // IMAGE GALLERY
    // ===============================

    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumb");

    thumbnails.forEach((thumb) => {

        thumb.addEventListener("click", () => {

            mainImage.src = thumb.src;

            thumbnails.forEach((img) => {
                img.classList.remove("active");
            });

            thumb.classList.add("active");

        });

    });

    // ===============================
    // QUANTITY BUTTONS
    // ===============================

    const quantityInput = document.getElementById("quantity");
    const plusBtn = document.getElementById("plusBtn");
    const minusBtn = document.getElementById("minusBtn");

    let quantity = 1;

    plusBtn.addEventListener("click", () => {

        quantity++;

        quantityInput.value = quantity;

    });

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityInput.value = quantity;

        }

    });

    // ===============================
    // FLAVOUR & SIZE OPTIONS
    // ===============================

    const optionGroups = document.querySelectorAll(".options");

    optionGroups.forEach((group) => {

        const options = group.querySelectorAll(".option");

        options.forEach((option) => {

            option.addEventListener("click", () => {

                options.forEach((btn) => {
                    btn.classList.remove("active");
                });

                option.classList.add("active");

            });

        });

    });

    // ===============================
    // PRODUCT TABS
    // ===============================

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const target = button.dataset.tab;

            tabButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            tabContents.forEach((content) => {
                content.classList.remove("active");
            });

            button.classList.add("active");

            document
                .getElementById(target)
                .classList.add("active");

        });

    });

    // ===============================
    // ADD TO CART
    // ===============================

    const cartBtn = document.querySelector(".cart-btn");

    cartBtn.addEventListener("click", () => {

        const productName =
            document.getElementById("productName").textContent;

        alert(
            `${quantity} × ${productName} added to cart!`
        );

    });

    // ===============================
    // BUY NOW
    // ===============================

    const buyBtn = document.querySelector(".buy-btn");

    buyBtn.addEventListener("click", () => {

        const productName =
            document.getElementById("productName").textContent;

        alert(
            `Proceeding to checkout for ${quantity} × ${productName}`
        );

    });

    // ===============================
    // IMAGE ZOOM (HOVER)
    // ===============================

    const gallery = document.querySelector(".main-image");

    gallery.addEventListener("mousemove", (e) => {

        const rect = gallery.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        mainImage.style.transformOrigin = `${x}% ${y}%`;
        mainImage.style.transform = "scale(1.4)";

    });

    gallery.addEventListener("mouseleave", () => {

        mainImage.style.transform = "scale(1)";
        mainImage.style.transformOrigin = "center";

    });

    // ===============================
    // SMOOTH SCROLL TO REVIEWS
    // ===============================

    const reviewButton = document.querySelector(
        '[data-tab="reviews"]'
    );

    reviewButton.addEventListener("click", () => {

        document
            .getElementById("reviews")
            .scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

    });

    // ===============================
    // RELATED PRODUCT BUTTONS
    // ===============================

    const relatedButtons =
        document.querySelectorAll(".view-btn");

    relatedButtons.forEach((button) => {

        button.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        });

    });

    // ===============================
    // PAGE LOADED
    // ===============================

    console.log("AD Fitness Product Details Loaded Successfully.");

});