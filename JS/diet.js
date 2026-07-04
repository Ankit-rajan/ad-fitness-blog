/* ==========================================
   AD Fitness - Diet Page
   diet.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       BMI Calculator
    ========================================== */

    const bmiBtn = document.getElementById("bmiBtn");

    if (bmiBtn) {

        bmiBtn.addEventListener("click", () => {

            const height = parseFloat(document.getElementById("height").value);
            const weight = parseFloat(document.getElementById("weight").value);

            const bmiResult = document.getElementById("bmiResult");
            const bmiStatus = document.getElementById("bmiStatus");

            if (!height || !weight || height <= 0 || weight <= 0) {

                bmiResult.textContent = "Your BMI : --";
                bmiStatus.textContent = "Please enter valid height and weight.";
                return;
            }

            const bmi = weight / Math.pow(height / 100, 2);

            bmiResult.textContent = `Your BMI : ${bmi.toFixed(1)}`;

            if (bmi < 18.5) {

                bmiStatus.textContent = "Underweight - Increase healthy calorie intake.";

            } else if (bmi < 25) {

                bmiStatus.textContent = "Normal Weight - Keep maintaining your lifestyle.";

            } else if (bmi < 30) {

                bmiStatus.textContent = "Overweight - Focus on balanced nutrition and exercise.";

            } else {

                bmiStatus.textContent = "Obese - Consult a healthcare professional and adopt healthy habits.";

            }

        });

    }






/*==========================================================
PROTEIN GUIDE PAGE
protein-guide.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      DAILY PROTEIN CALCULATOR
    =========================================*/

    const weightInput = document.getElementById("weight");
    const activity = document.getElementById("activity");
    const calculateBtn = document.getElementById("proteinBtn");
    const result = document.getElementById("proteinResult");

    if (calculateBtn) {

        calculateBtn.addEventListener("click", () => {

            const weight = parseFloat(weightInput.value);
            const multiplier = parseFloat(activity.value);

            if (isNaN(weight) || weight <= 0) {

                result.className = "result error";
                result.innerHTML =
                    "❌ Please enter a valid body weight.";

                return;
            }

            const protein = (weight * multiplier).toFixed(1);

            result.className = "result success";
            result.innerHTML = `
                <h3>Your Daily Protein Requirement</h3>
                <p><strong>${protein} g/day</strong></p>
                <small>
                    Based on your weight (${weight} kg)
                    and selected activity level.
                </small>
            `;

        });

    }

    /*=========================================
      ENTER KEY SUPPORT
    =========================================*/

    if (weightInput) {

        weightInput.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {
                calculateBtn.click();
            }

        });

    }

    /*=========================================
      SCROLL REVEAL ANIMATION
    =========================================*/

    const revealElements = document.querySelectorAll(`
        .food-card,
        .recipe-card,
        .benefit-card,
        .type-card,
        .tip-card,
        .timing-card,
        .myth,
        .calculator-box,
        .meal-table,
        .intro-grid
    `);

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");
                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /*=========================================
      BUTTON RIPPLE EFFECT
    =========================================*/

    const buttons = document.querySelectorAll(".btn, #proteinBtn");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            const radius = diameter / 2;

            circle.style.width =
                circle.style.height = `${diameter}px`;

            circle.style.left =
                `${e.clientX - this.getBoundingClientRect().left - radius}px`;

            circle.style.top =
                `${e.clientY - this.getBoundingClientRect().top - radius}px`;

            circle.classList.add("ripple");

            const ripple = this.querySelector(".ripple");

            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);

        });

    });

    /*=========================================
      CARD HOVER EFFECT (Desktop Only)
    =========================================*/

    if (window.innerWidth > 992) {

        const cards = document.querySelectorAll(
            ".food-card,.recipe-card,.benefit-card,.type-card,.tip-card,.timing-card,.myth"
        );

        cards.forEach(card => {

            card.addEventListener("mousemove", (e) => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 12;

                const rotateX =
                    ((y / rect.height) - 0.5) * -12;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0) rotateY(0)";

            });

        });

    }

    /*=========================================
      SMOOTH SCROLL FOR INTERNAL LINKS
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /*=========================================
      ACTIVE NAV LINK (Optional)
    =========================================*/

    const currentPage =
        window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

    /*=========================================
      IMAGE LAZY LOADING
    =========================================*/

    document.querySelectorAll("img").forEach(img => {

        img.loading = "lazy";

    });

    /*=========================================
      CONSOLE MESSAGE
    =========================================*/

    console.log("%cAD Fitness Protein Guide Loaded",
        "color:#ff4d30;font-size:16px;font-weight:bold;"
    );

});









    /* ==========================================
       Daily Calorie Calculator
    ========================================== */

    const calorieBtn = document.getElementById("calorieBtn");

    if (calorieBtn) {

        calorieBtn.addEventListener("click", () => {

            const age = parseFloat(document.getElementById("age").value);
            const height = parseFloat(document.getElementById("height").value);
            const weight = parseFloat(document.getElementById("weight").value);

            const gender = document.getElementById("gender").value;
            const goal = document.getElementById("goal").value;

            const result = document.getElementById("calorieResult");

            if (!age || !height || !weight) {

                result.textContent = "Calories : --";
                alert("Please fill Age, Height and Weight.");
                return;

            }

            let bmr;

            if (gender === "male") {

                bmr =
                    10 * weight +
                    6.25 * height -
                    5 * age +
                    5;

            } else {

                bmr =
                    10 * weight +
                    6.25 * height -
                    5 * age -
                    161;

            }

            let calories = bmr * 1.55;

            if (goal === "loss") {

                calories -= 500;

            }

            if (goal === "gain") {

                calories += 300;

            }

            result.textContent =
                `Calories : ${Math.round(calories)} kcal/day`;

        });

    }

    /* ==========================================
       FAQ Accordion
    ========================================== */

    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {

        const btn = faq.querySelector(".faq-question");

        btn.addEventListener("click", () => {

            const open = document.querySelector(".faq.active");

            if (open && open !== faq) {

                open.classList.remove("active");
                open.querySelector(".faq-answer").style.maxHeight = null;

            }

            faq.classList.toggle("active");

            const answer = faq.querySelector(".faq-answer");

            if (faq.classList.contains("active")) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

    /* ==========================================
       Back To Top Button
    ========================================== */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.style.display = "flex";

            topBtn.style.alignItems = "center";
            topBtn.style.justifyContent = "center";

        } else {

            topBtn.style.display = "none";

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       Scroll Progress Bar
    ========================================== */

    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / height) * 100;

        progressBar.style.width =
            progress + "%";

    });

    /* ==========================================
       Smooth Anchor Scrolling
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
                document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* ==========================================
       Input Validation
    ========================================== */

    document.querySelectorAll("input[type='number']").forEach(input => {

        input.addEventListener("input", () => {

            if (input.value < 0) {

                input.value = "";

            }

        });

    });

    /* ==========================================
       Hover Animation
    ========================================== */

    const cards = document.querySelectorAll(
        ".goal-card,.macro-card,.nutrition-card,.food-card,.supplement-card,.diet-card,.faq-card,.stat-card"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

    /* ==========================================
       Counter Animation
    ========================================== */

    const counters = document.querySelectorAll(".stat-card h2");

    const runCounters = () => {

        counters.forEach(counter => {

            const text = counter.innerText;

            const value = parseInt(text.replace(/\D/g, ""));

            if (isNaN(value)) return;

            let current = 0;

            const increment = value / 80;

            const update = () => {

                current += increment;

                if (current < value) {

                    counter.innerText =
                        Math.floor(current) +
                        text.replace(/[0-9]/g, "");

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = text;

                }

            };

            update();

        });

    };

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                runCounters();
                observer.disconnect();

            }

        });

    });

    const stats = document.querySelector(".stats");

    if (stats) {

        observer.observe(stats);

    }

});