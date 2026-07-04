/* ==========================================
   AD FITNESS - ABOUT PAGE
   about.js
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       Smooth Scroll
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

    /* =====================================
       Fade Animation On Scroll
    ===================================== */

    const animatedElements = document.querySelectorAll(
        ".about-content, .stat-box, .card, .member, .time, .review, .cta"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    animatedElements.forEach(item => observer.observe(item));

    /* =====================================
       Counter Animation
    ===================================== */

    const counters = document.querySelectorAll(".stat-box h2");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        counterStarted = true;

        counters.forEach(counter => {

            const text = counter.innerText;

            const number = parseInt(text.replace(/\D/g, ""));

            const suffix = text.replace(/[0-9]/g, "");

            let current = 0;

            const speed = Math.max(20, Math.floor(2000 / number));

            const updateCounter = () => {

                current += Math.ceil(number / 100);

                if (current >= number) {

                    counter.innerText = number + suffix;

                    return;

                }

                counter.innerText = current + suffix;

                setTimeout(updateCounter, speed);

            };

            updateCounter();

        });

    }

    const statsSection = document.querySelector(".stats");

    if (statsSection) {

        const statsObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                }

            });

        }, {
            threshold: 0.3
        });

        statsObserver.observe(statsSection);

    }

    /* =====================================
       Navbar Shadow (Optional)
    ===================================== */

    const navbar = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

    /* =====================================
       Image Hover Effect
    ===================================== */

    document.querySelectorAll(".member img").forEach(image => {

        image.addEventListener("mousemove", (e) => {

            const rect = image.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            image.style.transformOrigin = `${x}px ${y}px`;
            image.style.transform = "scale(1.08)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.transformOrigin = "center";
            image.style.transform = "scale(1)";

        });

    });

    /* =====================================
       Button Ripple Effect
    ===================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

});

/* ==========================================
   Back To Top Button
========================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});