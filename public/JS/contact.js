/* ==========================================
   AD FITNESS - CONTACT PAGE
   contact.js  (page-specific extras only —
   nav, scroll bar, reveal, back-to-top and
   footer newsletter are handled by common.js)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     FAQ Accordion
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
     Contact Form Validation
  ===================================== */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }

});
