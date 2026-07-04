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