// ================================
// AD Fitness Contact Page JS
// ================================

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });
}

// ================================
// Sticky Navbar
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "#000";
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(0,0,0,.85)";
        header.style.boxShadow = "none";

    }

});

// ================================
// FAQ Accordion
// ================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {
                other.classList.remove("active");
                other.querySelector(".faq-answer").style.maxHeight = null;
            }

        });

        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }

    });

});

// ================================
// Contact Form Validation
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill all required fields.");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log({
            name,
            email,
            subject,
            message
        });

        alert("Thank you! Your message has been sent successfully.");

        contactForm.reset();

    });

}

// ================================
// Newsletter
// ================================

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const input = newsletterForm.querySelector("input");

        const email = input.value.trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            alert("Please enter a valid email.");

            return;

        }

        alert("Subscribed Successfully!");

        input.value = "";

    });

}

// ================================
// Scroll Animation
// ================================

const fadeElements = document.querySelectorAll(
    ".contact-form, .contact-info, .faq-item, .newsletter, footer"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

fadeElements.forEach(element => {

    element.classList.add("fade-up");

    observer.observe(element);

});

// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

// ================================
// Active Navigation Highlight
// ================================

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});

// ================================
// Back To Top Button
// ================================

const topBtn = document.createElement("button");

topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    background: "#ff4d4d",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    display: "none",
    zIndex: "999",
    transition: "0.3s"
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ================================
// Console Message
// ================================

console.log("🏋️ AD Fitness Contact Page Loaded Successfully!");