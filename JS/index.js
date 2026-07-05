// ============================================================
// AD FITNESS — index.js
// Home Page Only
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initCountUp();
  initBmiCalculator();
});

// ------------------------------------------------------------
// Count-up animation for stats
// ------------------------------------------------------------
function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      el.textContent = value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// ------------------------------------------------------------
// BMI Calculator
// ------------------------------------------------------------
function initBmiCalculator() {
  const btn = document.getElementById("calcBmiBtn");

  if (!btn) return;

  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  const resultBox = document.getElementById("bmiResult");
  const bmiNumber = document.getElementById("bmiNumber");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiMarker = document.getElementById("bmiMarker");

  btn.addEventListener("click", calculateBMI);

  [heightInput, weightInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        calculateBMI();
      }
    });
  });

  function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }

    const bmi = weight / Math.pow(height / 100, 2);

    let category = "";
    let position = 0;

    if (bmi < 18.5) {
      category = "Underweight";
      position = 15;
    } else if (bmi < 25) {
      category = "Normal";
      position = 40;
    } else if (bmi < 30) {
      category = "Overweight";
      position = 65;
    } else {
      category = "Obese";
      position = 90;
    }

    bmiNumber.textContent = bmi.toFixed(1);
    bmiCategory.textContent = category;

    if (bmiMarker) {
      bmiMarker.style.left = position + "%";
    }

    resultBox.hidden = false;
  }
}