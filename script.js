const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");
const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const adminBtn = document.getElementById("admin-btn");
const loginError = document.getElementById("login-error");

// لیست لینک‌ها
let links = loadLinksFromLocalStorage();

// نمایش لینک‌ها در صفحه
function displayLinks(filter) {
    content.innerHTML = "";
    const filteredLinks = links.filter(link => link.type === filter);
    filteredLinks.forEach(link => {
        const item = document.createElement("div");
        item.classList.add("item");

        if (link.type === "images" || link.type === "gif") {
            item.innerHTML = `<img src="${link.url}" width="200px">`;
        } else if (link.type === "movies") {
            item.innerHTML = `<video src="${link.url}" width="200px" controls></video>`;
        }

        content.appendChild(item);
    });
}

// ذخیره کردن لینک‌ها در localStorage
function saveLinksToLocalStorage() {
    localStorage.setItem("links", JSON.stringify(links));
}

// بارگذاری لینک‌ها از localStorage
function loadLinksFromLocalStorage() {
    const savedLinks = localStorage.getItem("links");
    if (savedLinks) {
        return JSON.parse(savedLinks);
    }
    return [];
}

// تغییر دسته‌بندی
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        displayLinks(category);
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// تغییر تم
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// نمایش فرم ورود به مدیریت
function showLogin() {
    loginPanel.style.display = "block";
}

// بررسی رمز ورود
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    if (password === "admin1234") {
        loginPanel.style.display = "none";
        adminPanel.style.display = "block";
    } else {
        loginError.style.display = "block";
    }
}

// افزودن لینک جدید
function addNewLink() {
    const url = document.getElementById("urlInput").value;
    const type = document.getElementById("typeSelect").value;

    if (url) {
        links.push({ url, type });
        saveLinksToLocalStorage();  // ذخیره لینک‌ها
        displayLinks(type);
        document.getElementById("urlInput").value = "";
    }
}

// بارگذاری لینک‌ها و تم از localStorage در ابتدا
displayLinks("images");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}
