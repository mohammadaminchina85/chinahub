const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");
const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const adminBtn = document.getElementById("admin-btn");
const searchInput = document.getElementById("searchInput");

// لیست لینک‌ها (از localStorage بارگذاری می‌شود)
let links = JSON.parse(localStorage.getItem("links")) || [
    { url: "https://mohammadaminchina85.github.io/pic2007/photo_2025-02-24_21-32-19.jpg", type: "images" },
    { url: "https://www.pornhub.com/embed/67cf3e5266465", type: "movies" }, 
    { url: "https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp", type: "gif" },
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
                // استفاده از iframe برای نمایش فیلم‌ها
                item.innerHTML = `
                    <div class="video-container">
                        <iframe 
                            src="${getEmbedUrl(link.url)}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy"
                        ></iframe>
                    </div>
                `;
            }

            content.appendChild(item);
        }
    });
}

// تبدیل لینک‌های مختلف به لینک embed
function getEmbedUrl(url) {
    // اگر یوتیوب باشد
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = extractYoutubeId(url);
        return `https://www.youtube.com/embed/${videoId}`;
    }
    // اگر ویمئو باشد
    else if (url.includes("vimeo.com")) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
    }
    // سایر موارد (استفاده مستقیم از لینک)
    return url;
}

// استخراج ID از لینک یوتیوب
function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// بقیه توابع بدون تغییر باقی می‌مانند
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        displayLinks(category);
    });
});

searchInput.addEventListener("input", () => {
    displayLinks("all", searchInput.value);
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

function showLogin() {
    loginPanel.style.display = "block";
}

function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    if (password === "1234") {
        loginPanel.style.display = "none";
        adminPanel.style.display = "block";
    } else {
        alert("رمز اشتباه است!");
    }
}

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

function clearStorage() {
    localStorage.removeItem("links");
    links = [];
    displayLinks("images");
    alert("همه لینک‌ها حذف شدند!");
}

// نمایش لینک‌ها در ابتدا
displayLinks("images");
