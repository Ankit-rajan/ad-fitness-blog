/* ==========================================
   AD FITNESS - DIET PAGE
   diet.js  (page-specific extras only —
   nav, scroll bar, reveal, counters, back-to-top
   and footer newsletter are handled by common.js)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     Daily Protein Calculator
  ===================================== */
  const proteinWeightInput = document.getElementById("proteinWeight");
  const activity = document.getElementById("activity");
  const proteinBtn = document.getElementById("proteinBtn");
  const proteinResult = document.getElementById("proteinResult");

  if (proteinBtn) {
    proteinBtn.addEventListener("click", () => {
      const weight = parseFloat(proteinWeightInput.value);
      const multiplier = parseFloat(activity.value);

      if (isNaN(weight) || weight <= 0) {
        proteinResult.innerHTML = "Please enter a valid body weight.";
        return;
      }

      const protein = (weight * multiplier).toFixed(1);
      proteinResult.innerHTML = `
        <strong>${protein} g/day</strong>
        <small>Based on your weight (${weight} kg) and selected activity level.</small>
      `;
    });

    if (proteinWeightInput) {
      proteinWeightInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") proteinBtn.click();
      });
    }
  }

  /* =====================================
     BMI Calculator
  ===================================== */
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

  /* =====================================
     Daily Calorie Calculator
  ===================================== */
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
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      let calories = bmr * 1.55;
      if (goal === "loss") calories -= 500;
      if (goal === "gain") calories += 300;

      result.textContent = `Calories : ${Math.round(calories)} kcal/day`;
    });
  }

  /* =====================================
     FAQ Accordion (diet myths)
  ===================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      faqItems.forEach((other) => {
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

  /* =====================================
     Input Validation (no negative numbers)
  ===================================== */
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value < 0) input.value = "";
    });
  });

});



document.querySelectorAll("*").forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log(el, el.scrollWidth);
  }
});