// ============================================================
// AD FITNESS — auth.js (login + signup page behavior)
// Note: there is no backend wired up in this static project.
// Forms are validated client-side and show a success state;
// wire the fetch/submit calls to your real API when ready.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initPasswordToggles();
  initPasswordStrength();
  initSocialButtons();
  initLoginForm();
  initSignupForm();
});

// ------------------------------------------------------------
// Show/hide password
// ------------------------------------------------------------
function initPasswordToggles() {
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    });
  });
}

// ------------------------------------------------------------
// Password strength meter (signup page)
// ------------------------------------------------------------
function initPasswordStrength() {
  const input = document.getElementById("password");
  const meter = document.getElementById("strengthMeter");
  const label = document.getElementById("strengthLabel");
  if (!input || !meter || !label) return;

  input.addEventListener("input", () => {
    const value = input.value;
    const score = scorePassword(value);

    meter.classList.remove("weak", "fair", "good", "strong");

    if (!value) {
      label.textContent = "—";
      return;
    }

    if (score <= 1) {
      meter.classList.add("weak");
      label.textContent = "Weak";
    } else if (score === 2) {
      meter.classList.add("fair");
      label.textContent = "Fair";
    } else if (score === 3) {
      meter.classList.add("good");
      label.textContent = "Good";
    } else {
      meter.classList.add("strong");
      label.textContent = "Strong";
    }
  });
}

function scorePassword(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
  return Math.min(score, 4);
}

// ------------------------------------------------------------
// Social login buttons — honest placeholder, no backend wired
// ------------------------------------------------------------
function initSocialButtons() {
  const note = document.getElementById("socialNote");
  document.querySelectorAll(".social-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.getAttribute("data-provider");
      if (note) {
        note.textContent = `${provider} sign-in isn't connected yet on this demo.`;
        note.hidden = false;
      }
    });
  });
}

// ------------------------------------------------------------
// Shared field validation helpers
// ------------------------------------------------------------
function setFieldValid(input) {
  const group = input.closest(".form-group") || input.closest(".terms-check");
  if (group) group.classList.remove("invalid");
}

function setFieldInvalid(input) {
  const group = input.closest(".form-group");
  if (group) group.classList.add("invalid");
  else {
    // terms checkbox: error span sits as a sibling, not inside a .form-group
    const error = document.querySelector('[data-error-for="terms"]');
    if (error) error.style.display = "block";
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ------------------------------------------------------------
// Login form
// ------------------------------------------------------------
function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitBtn = document.getElementById("loginSubmit");
  const success = document.getElementById("loginSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (!isValidEmail(email.value.trim())) {
      setFieldInvalid(email);
      valid = false;
    } else {
      setFieldValid(email);
    }

    if (!password.value) {
      setFieldInvalid(password);
      valid = false;
    } else {
      setFieldValid(password);
    }

    if (!valid) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulated request — replace with a real fetch() to your auth API.
    setTimeout(() => {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      success.hidden = false;
      form.reset();
    }, 900);
  });
}

// ------------------------------------------------------------
// Signup form
// ------------------------------------------------------------
function initSignupForm() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");
  const submitBtn = document.getElementById("signupSubmit");
  const success = document.getElementById("signupSuccess");
  const termsError = document.querySelector('[data-error-for="terms"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.value.trim()) {
      setFieldInvalid(name);
      valid = false;
    } else {
      setFieldValid(name);
    }

    if (!isValidEmail(email.value.trim())) {
      setFieldInvalid(email);
      valid = false;
    } else {
      setFieldValid(email);
    }

    if (password.value.length < 8) {
      setFieldInvalid(password);
      valid = false;
    } else {
      setFieldValid(password);
    }

    if (!confirmPassword.value || confirmPassword.value !== password.value) {
      setFieldInvalid(confirmPassword);
      valid = false;
    } else {
      setFieldValid(confirmPassword);
    }

    if (!terms.checked) {
      if (termsError) termsError.style.display = "block";
      valid = false;
    } else {
      if (termsError) termsError.style.display = "none";
    }

    if (!valid) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulated request — replace with a real fetch() to your signup API.
    setTimeout(() => {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      success.hidden = false;
      form.reset();
      const meter = document.getElementById("strengthMeter");
      const label = document.getElementById("strengthLabel");
      if (meter) meter.classList.remove("weak", "fair", "good", "strong");
      if (label) label.textContent = "—";
    }, 900);
  });
}
