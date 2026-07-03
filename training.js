// ================================
// AD FITNESS - training.js
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // Hero Button Scroll
    // ===========================
    const heroBtn = document.querySelector(".hero button");

    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            document.querySelector(".search").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // ===========================
    // CTA Button
    // ===========================
    const ctaBtn = document.querySelector(".cta button");

    if (ctaBtn) {
        ctaBtn.addEventListener("click", () => {

            document.querySelector(".section-title")
                .scrollIntoView({
                    behavior: "smooth"
                });

            alert("Let's start your fitness journey 💪");
        });
    }

    // ===========================
    // Search Function
    // ===========================
    const searchInput = document.querySelector(".search input");

    const cards = document.querySelectorAll(".card");
    const programs = document.querySelectorAll(".program");

    function filterContent() {

        const value = searchInput.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display =
                text.includes(value) ? "block" : "none";

        });

        programs.forEach(program => {

            const text = program.innerText.toLowerCase();

            program.style.display =
                text.includes(value) ? "block" : "none";

        });

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", filterContent);

        searchInput.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {

                filterContent();

            }

        });

    }

    // ===========================
    // Training Category Click
    // ===========================
    cards.forEach(card => {

        card.addEventListener("click", () => {

            card.style.transform = "scale(.95)";

            setTimeout(() => {

                card.style.transform = "";

            }, 180);

            alert(card.querySelector("h3").innerText);

        });

    });

    // ===========================
    // Program Card Click
    // ===========================
    programs.forEach(program => {

        program.addEventListener("click", () => {

            const title =
                program.querySelector("h3").innerText;

            alert("Opening " + title);

        });

    });

    // ===========================
    // Weekly Plan Highlight
    // ===========================
    const today = new Date().getDay();

    const rows = document.querySelectorAll("table tr");

    const map = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        0: 7
    };

    if (rows[map[today]]) {

        rows[map[today]].style.background = "#ff6600";

        rows[map[today]].style.color = "#fff";

        rows[map[today]].style.fontWeight = "bold";

    }

    // ===========================
    // Scroll Reveal Animation
    // ===========================
    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = 1;

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    const revealItems = document.querySelectorAll(
        ".card,.program,.tip,table,.cta"
    );

    revealItems.forEach(item => {

        item.style.opacity = 0;

        item.style.transform = "translateY(40px)";

        item.style.transition = ".6s";

        observer.observe(item);

    });

    // ===========================
    // Search Placeholder Typing
    // ===========================
    const words = [
        "Search Chest Workout...",
        "Search Home Workout...",
        "Search Fat Loss...",
        "Search Gym Program...",
        "Search Cardio...",
        "Search HIIT..."
    ];

    let i = 0;

    setInterval(() => {

        if (searchInput) {

            searchInput.placeholder = words[i];

            i++;

            if (i >= words.length) i = 0;

        }

    }, 2500);

    // ===========================
    // Back To Top Button
    // ===========================
    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.style.position = "fixed";
    topBtn.style.right = "20px";
    topBtn.style.bottom = "20px";
    topBtn.style.width = "50px";
    topBtn.style.height = "50px";
    topBtn.style.border = "none";
    topBtn.style.borderRadius = "50%";
    topBtn.style.background = "#ff5a00";
    topBtn.style.color = "#fff";
    topBtn.style.fontSize = "24px";
    topBtn.style.cursor = "pointer";
    topBtn.style.display = "none";
    topBtn.style.zIndex = "999";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

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

    // ===========================
    // Card Hover Glow
    // ===========================
    document.querySelectorAll(".card,.program,.tip")
        .forEach(item => {

            item.addEventListener("mouseenter", () => {

                item.style.boxShadow =
                    "0 0 25px rgba(255,90,0,.45)";

            });

            item.addEventListener("mouseleave", () => {

                item.style.boxShadow = "none";

            });

        });

    // ===========================
    // Double Click Favorite
    // ===========================
    programs.forEach(program => {

        program.addEventListener("dblclick", () => {

            program.style.border = "3px solid gold";

            alert("⭐ Added to Favorites");

        });

    });

    // ===========================
    // Console Welcome
    // ===========================
    console.log("🏋 Welcome to AD Fitness Training Page");

});