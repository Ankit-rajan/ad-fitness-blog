/* ==========================
   BLOG.JS
========================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       ACTIVE NAV LINK
    ========================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* ==========================
       NEWSLETTER
    ========================== */

    const form = document.querySelector(".newsletter form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = form.querySelector("input").value.trim();

            const pattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!pattern.test(email)) {

                alert("Please enter a valid email address.");

                return;

            }

            alert("Thank you for subscribing!");

            form.reset();

        });

    }


    /* ==========================
       READ MORE BUTTON
    ========================== */

    document.querySelectorAll(".blog-content a").forEach(button => {

        button.addEventListener("click", function (e) {

            e.preventDefault();

            const title =
                this.parentElement.querySelector("h2").textContent;

            alert("Opening article:\n\n" + title);

            // Example:
            // window.location.href = "blog-details.html?id=1";

        });

    });


    /* ==========================
       CARD HOVER EFFECT
    ========================== */

    document.querySelectorAll(".blog-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = ".3s";

            card.style.transform = "translateY(-10px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0) scale(1)";

        });

    });


    /* ==========================
       SCROLL ANIMATION
    ========================== */

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform = "translateY(0)";

                }

            });

        },

        {
            threshold: 0.2
        }

    );

    document.querySelectorAll(".blog-card").forEach(card => {

        card.style.opacity = "0";

        card.style.transform = "translateY(50px)";

        card.style.transition = ".6s ease";

        observer.observe(card);

    });


    /* ==========================
       SCROLL TO TOP BUTTON
    ========================== */

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className = "scrollTopBtn";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style, {

        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        border: "none",
        borderRadius: "50%",
        background: "#0077ff",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        display: "none",
        zIndex: "999",
        boxShadow: "0 5px 15px rgba(0,0,0,.2)",
        transition: ".3s"

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("mouseenter", () => {

        topBtn.style.transform = "scale(1.1)";

    });

    topBtn.addEventListener("mouseleave", () => {

        topBtn.style.transform = "scale(1)";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* ==========================
       IMAGE LOADING EFFECT
    ========================== */

    document.querySelectorAll(".blog-card img").forEach(img => {

        img.addEventListener("load", () => {

            img.style.opacity = "1";

        });

        img.style.opacity = "0";

        img.style.transition = ".5s";

    });


    /* ==========================
       CONSOLE MESSAGE
    ========================== */

    console.log("Blog Page Loaded Successfully 🚀");

});