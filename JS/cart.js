// ==========================================
// AD Fitness - Cart Page JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Quantity Buttons
    // ==========================================

    const cartItems = document.querySelectorAll(".cart-item");

    cartItems.forEach((item) => {

        const minusBtn = item.querySelector(".minus");
        const plusBtn = item.querySelector(".plus");
        const input = item.querySelector("input");
        const priceElement = item.querySelector(".price");

        let quantity = parseInt(input.value);

        // Store original price
        const unitPrice = Number(
            priceElement.textContent.replace(/[^\d]/g, "")
        );

        plusBtn.addEventListener("click", () => {

            quantity++;

            input.value = quantity;

            updateItemPrice();

            updateSummary();

        });

        minusBtn.addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                input.value = quantity;

                updateItemPrice();

                updateSummary();

            }

        });

        function updateItemPrice() {

            const total = unitPrice * quantity;

            priceElement.textContent =
                "₹" + total.toLocaleString("en-IN");

        }

    });

    // ==========================================
    // Remove Product
    // ==========================================

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".cart-item");

            card.style.opacity = "0";
            card.style.transform = "translateX(100px)";

            setTimeout(() => {

                card.remove();

                updateSummary();

            }, 300);

        });

    });

    // ==========================================
    // Coupon Code
    // ==========================================

    const couponInput = document.querySelector(".coupon-box input");
    const couponBtn = document.querySelector(".coupon-box button");

    let couponApplied = false;

    couponBtn.addEventListener("click", () => {

        const code = couponInput.value.trim().toUpperCase();

        if (couponApplied) {

            alert("Coupon already applied.");

            return;

        }

        if (code === "ADFIT10") {

            couponApplied = true;

            alert("Coupon Applied Successfully!");

            applyDiscount(10);

        }

        else if (code === "WELCOME") {

            couponApplied = true;

            alert("Welcome Coupon Applied!");

            applyDiscount(15);

        }

        else {

            alert("Invalid Coupon Code.");

        }

    });

    // ==========================================
    // Checkout
    // ==========================================

    const checkoutBtn =
        document.querySelector(".checkout-btn");

    checkoutBtn.addEventListener("click", () => {

        alert(
            "Redirecting to Secure Checkout..."
        );

    });

    // ==========================================
    // Continue Shopping
    // ==========================================

    const continueBtn =
        document.querySelector(".continue-shopping");

    continueBtn.addEventListener("click", (e) => {

        e.preventDefault();

        window.location.href = "products.html";

    });

    // ==========================================
    // Product Cards Hover
    // ==========================================

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px) scale(1.03)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });

    // ==========================================
    // Update Summary
    // ==========================================

    function updateSummary() {

        const prices =
            document.querySelectorAll(".cart-item .price");

        let subtotal = 0;

        prices.forEach((price) => {

            subtotal += Number(
                price.textContent.replace(/[^\d]/g, "")
            );

        });

        const gst = Math.round(subtotal * 0.05);

        const discountText =
            document.querySelector(".summary-row .discount");

        let discount = 300;

        if (discountText) {

            discount = Number(
                discountText.textContent.replace(/[^\d]/g, "")
            );

        }

        const total =
            subtotal + gst - discount;

        document.querySelector(
            ".summary-total span:last-child"
        ).textContent =
            "₹" + total.toLocaleString("en-IN");

    }

    // ==========================================
    // Apply Discount
    // ==========================================

    function applyDiscount(percent) {

        const prices =
            document.querySelectorAll(".cart-item .price");

        let subtotal = 0;

        prices.forEach((price) => {

            subtotal += Number(
                price.textContent.replace(/[^\d]/g, "")
            );

        });

        const discount =
            Math.round(subtotal * percent / 100);

        document.querySelector(
            ".summary-row .discount"
        ).textContent =
            "-₹" + discount.toLocaleString("en-IN");

        updateSummary();

    }

    // ==========================================
    // Initial Summary
    // ==========================================

    updateSummary();

    console.log("AD Fitness Cart Loaded Successfully.");

});