/* ==========================================
   AD FITNESS - PRODUCTS PAGE
   product.js  (page-specific extras only —
   nav, scroll bar, reveal, back-to-top and
   footer newsletter are handled by common.js)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("search");
  const products = document.querySelectorAll(".product-card");
  const filterButtons = document.querySelectorAll(".filter-btn");

  /* =====================================
     Product Search
  ===================================== */
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const value = searchInput.value.toLowerCase();

      products.forEach((product) => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        const description = product.querySelector("p").textContent.toLowerCase();

        product.style.display =
          title.includes(value) || description.includes(value) ? "" : "none";
      });
    });
  }

  /* =====================================
     Category Filter
  ===================================== */
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      products.forEach((product) => {
        product.style.display =
          category === "all" || product.classList.contains(category) ? "" : "none";
      });
    });
  });

  /* =====================================
     Buy Now / View Details
  ===================================== */
  document.querySelectorAll(".buy").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to the product page...");
      window.open("https://www.amazon.in/", "_blank");
    });
  });

  document.querySelectorAll(".details").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productName = button.closest(".product-card").querySelector("h3").textContent;
      alert(productName + "\n\nProduct details will be available soon.");
    });
  });

});
