/* ==========================================
   AD FITNESS - ABOUT PAGE
   about.js  (page-specific extras only —
   nav, scroll bar, reveal, counters, footer
   form and back-to-top are handled by common.js)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     Team image hover effect
  ===================================== */
  document.querySelectorAll(".team-card img").forEach((image) => {
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
     Button ripple effect
  ===================================== */
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";

    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,0.35)";
      ripple.style.width = ripple.style.height = "16px";
      ripple.style.pointerEvents = "none";
      ripple.style.left = `${e.clientX - rect.left - 8}px`;
      ripple.style.top = `${e.clientY - rect.top - 8}px`;
      ripple.style.transform = "scale(0)";
      ripple.style.transition = "transform .6s ease, opacity .6s ease";

      this.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = "scale(12)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => ripple.remove(), 600);
    });
  });

});
