// ===============================
// PRODUCT SEARCH
// ===============================

const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product-card");

if (searchInput) {
    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        products.forEach((product) => {

            const title = product.querySelector("h3").textContent.toLowerCase();
            const description = product.querySelector("p").textContent.toLowerCase();

            if (
                title.includes(value) ||
                description.includes(value)
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });
}

// ===============================
// CATEGORY FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.classList.contains(category)
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

});

// ===============================
// BUY NOW BUTTON
// ===============================

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        alert("Redirecting to the product page...");

        // Replace with your Amazon / Flipkart / Affiliate link
        window.open("https://www.amazon.in/", "_blank");

    });

});

// ===============================
// VIEW DETAILS
// ===============================

const detailButtons = document.querySelectorAll(".details");

detailButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const productName =
            button
            .closest(".product-card")
            .querySelector("h3")
            .textContent;

        alert(productName + "\n\nProduct details will be available soon.");

    });

});

// ===============================
// NEWSLETTER
// ===============================

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email =
            this.querySelector("input").value.trim();

        if(email===""){

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        this.reset();

    });

}

// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.id = "scrollTop";

document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.right = "25px";
scrollBtn.style.bottom = "25px";
scrollBtn.style.width = "50px";
scrollBtn.style.height = "50px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.background = "#38bdf8";
scrollBtn.style.color = "#fff";
scrollBtn.style.fontSize = "22px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        scrollBtn.style.display = "block";

    }else{

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

});

document.querySelectorAll(".product-card,.feature-box").forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(40px)";

    item.style.transition=".6s";

    observer.observe(item);

});

// ===============================
// PRODUCT COUNT
// ===============================

const visibleProducts = () => {

    const count = [...products].filter(product =>

        product.style.display !== "none"

    ).length;

    console.log("Visible Products:", count);

};

filterButtons.forEach(button => {

    button.addEventListener("click", visibleProducts);

});

if(searchInput){

    searchInput.addEventListener("keyup", visibleProducts);

}

// ===============================
// PAGE LOADED
// ===============================

window.addEventListener("load",()=>{

    console.log("AD Fitness Products Loaded Successfully!");

});