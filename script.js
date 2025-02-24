const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");
const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const adminBtn = document.getElementById("admin-btn");
const searchInput = document.getElementById("searchInput");

// لیست لینک‌ها (از localStorage بارگذاری می‌شود)
let links = JSON.parse(localStorage.getItem("links")) || [
   // { url: "https://example.com/image1.jpg", type: "images" },
     //{ url: "https://drive.google.com/file/d/19tZ8XtH3sYtqrzLw3eH7kWqUZCjitQOi/preview", type: "movies" },
    { url: "https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp", type: "gif" }
];

// نمایش لینک‌ها در صفحه
function displayLinks(filter = "images", searchQuery = "") {
    content.innerHTML = "";
    links.forEach(link => {
        if ((filter === "all" || link.type === filter) && 
            (link.url.toLowerCase().includes(searchQuery.toLowerCase()))) {
            const item = document.createElement("div");
            item.classList.add("item");

            if (link.type === "images" || link.type === "gif") {
                item.innerHTML = `<img src="${link.url}" width="200px" loading="lazy">`;
            } else if (link.type === "movies") {
                item.innerHTML = `<video src="${link.url}" width="200px" controls loading="lazy"></video>`;
            }

            content.appendChild(item);
        }
    });
}

// تغییر دسته‌بندی
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        displayLinks(category);
    });
});

// جستجو
searchInput.addEventListener("input", () => {
    displayLinks("all", searchInput.value);
});

// تغییر تم
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// بارگذاری تم ذخیره‌شده
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

// نمایش فرم ورود به مدیریت
function showLogin() {
    loginPanel.style.display = "block";
}

// بررسی رمز ورود
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    if (password === "1234") {  // رمز ورود
        loginPanel.style.display = "none";
        adminPanel.style.display = "block";
    } else {
        alert("رمز اشتباه است!");
    }
}

// افزودن لینک جدید
function addNewLink() {
    const url = document.getElementById("urlInput").value;
    const type = document.getElementById("typeSelect").value;

    if (url) {
        links.push({ url, type });
        localStorage.setItem("links", JSON.stringify(links));
        displayLinks(type);
        document.getElementById("urlInput").value = "";
        alert("لینک با موفقیت اضافه شد!");
    }
}

// حذف همه لینک‌ها
function clearStorage() {
    localStorage.removeItem("links");
    links = [];
    displayLinks("images");
    alert("همه لینک‌ها حذف شدند!");
}

// نمایش لینک‌ها در ابتدا
displayLinks("images");
