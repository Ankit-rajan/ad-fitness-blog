// ============================================================
// AD FITNESS — common.js
// Shared behavior used on every page: nav, scroll bar,
// reveal-on-scroll, back-to-top, newsletter form.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollBar();
  initRevealOnScroll();
  initBackToTop();
  initNewsletterForm();
  markActiveNavLink();

});
// ------------------------------------------------------------
// Mobile menu toggle
// ------------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const header = document.getElementById("siteHeader");
  if (!menuBtn || !header) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ------------------------------------------------------------
// Highlight the current page in the nav
// ------------------------------------------------------------
function markActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

// ------------------------------------------------------------
// Scroll progress bar
// ------------------------------------------------------------
function initScrollBar() {
  const bar = document.getElementById("scrollBar");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ------------------------------------------------------------
// Reveal-on-scroll (IntersectionObserver)
// ------------------------------------------------------------
function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal-up");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((t) => observer.observe(t));
}

// ------------------------------------------------------------
// Count-up animation for stats / scoreboard numbers
// Shared because it's reused on any page with [data-count]
// ------------------------------------------------------------
function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
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
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

// ------------------------------------------------------------
// Newsletter form (footer)
// ------------------------------------------------------------
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  const msg = document.getElementById("footerFormMsg");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    if (msg) msg.hidden = false;
  });
}

// ------------------------------------------------------------
// Back to top button
// ------------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
