const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");
const adminPanel = document.getElementById("admin-panel");
const adminBtn = document.getElementById("admin-btn");

// لیست لینک‌ها
const links = [
    { url: "https://example.com/image1.jpg", type: "images" },
    { url: "https://example.com/video.mp4", type: "movies" },
    { url: "https://example.com/doc.pdf", type: "docs" },
    { url: "https://gifcandy.net/wp-content/uploads/2024/06/gifcandy-4.webp", type: "gif" }
];

// نمایش لینک‌ها در صفحه
function displayLinks(filter = "all") {
    content.innerHTML = "";
    links.forEach(link => {
        if (filter === "all" || link.type === filter) {
            const item = document.createElement("div");
            item.classList.add("item");

            if (link.type === "images" || link.type === "gif") {
                item.innerHTML = `<img src="${link.url}" width="200px">`;
            } else if (link.type === "movies") {
                item.innerHTML = `<video src="${link.url}" width="200px" controls></video>`;
            } else {
                item.innerHTML = `<a href="${link.url}" target="_blank">📄 باز کردن سند</a>`;
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

// مدیریت نمایش پنل ادمین
function toggleAdmin() {
    if (adminPanel.style.display === "none" || adminPanel.style.display === "") {
        adminPanel.style.display = "block";
    } else {
        adminPanel.style.display = "none";
    }
}

// افزودن لینک جدید
function addNewLink() {
    const url = document.getElementById("urlInput").value;
    const type = document.getElementById("typeSelect").value;

    if (url) {
        links.push({ url, type });
        displayLinks("all");
        document.getElementById("urlInput").value = "";
    }
}

// نمایش لینک‌ها در ابتدا
displayLinks();
