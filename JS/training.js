// ============================================================
// AD FITNESS — training.js (training page-only behavior)
// Shared nav/scroll/reveal/footer logic lives in common.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initExerciseAccordion();
  initFilterTabs();
  initExerciseSearch();
  highlightToday();
});

// ------------------------------------------------------------
// Accordion: expand/collapse "How to perform" panels
// ------------------------------------------------------------
function initExerciseAccordion() {
  const toggles = document.querySelectorAll(".exercise-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".exercise-card");
      const panel = card.querySelector(".exercise-details");
      const isOpen = card.classList.contains("open");

      if (isOpen) {
        panel.style.maxHeight = null;
        card.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        card.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

// ------------------------------------------------------------
// Category filter tabs
// ------------------------------------------------------------
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".exercise-card");
  const searchInput = document.getElementById("exerciseSearch");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (searchInput) searchInput.value = "";

      const filter = tab.getAttribute("data-filter");
      applyFilters(cards, filter, "");
    });
  });
}

// ------------------------------------------------------------
// Live search over exercise names
// ------------------------------------------------------------
function initExerciseSearch() {
  const input = document.getElementById("exerciseSearch");
  const cards = document.querySelectorAll(".exercise-card");
  const tabs = document.querySelectorAll(".filter-tab");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    if (query) {
      tabs.forEach((t) => t.classList.remove("active"));
      const allTab = document.querySelector('.filter-tab[data-filter="all"]');
      if (allTab) allTab.classList.add("active");
    }

    applyFilters(cards, "all", query);
  });
}

// ------------------------------------------------------------
// Shared filter logic: category + search text
// ------------------------------------------------------------
function applyFilters(cards, category, query) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesCategory = category === "all" || card.getAttribute("data-category") === category;
    const matchesQuery = !query || card.getAttribute("data-name").includes(query);
    const visible = matchesCategory && matchesQuery;

    card.style.display = visible ? "" : "none";
    if (visible) visibleCount++;
  });

  const noResults = document.getElementById("noResults");
  if (noResults) noResults.hidden = visibleCount !== 0;
}

// ------------------------------------------------------------
// Highlight today's row in the weekly plan table
// ------------------------------------------------------------
function highlightToday() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const row = document.querySelector(`#weekTable tr[data-day="${today}"]`);
  if (row) row.classList.add("today");
}
