const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");
const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const adminBtn = document.getElementById("admin-btn");

// لیست لینک‌ها
const links = [

    { url: "https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp", type: "gif" }
];

// نمایش لینک‌ها در صفحه
function displayLinks(filter) {
    content.innerHTML = "";
    links.forEach(link => {
        if (link.type === filter) {
            const item = document.createElement("div");
            item.classList.add("item");

            if (link.type === "images" || link.type === "gif") {
                item.innerHTML = `<img src="${link.url}" width="200px">`;
            } else if (link.type === "movies") {
                item.innerHTML = `<video src="${link.url}" width="200px" controls></video>`;
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

// تغییر تم
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

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
        displayLinks(type);
        document.getElementById("urlInput").value = "";
    }
}

// نمایش لینک‌ها در ابتدا
displayLinks("images");
