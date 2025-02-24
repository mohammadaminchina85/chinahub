const content = document.getElementById("content");
const addForm = document.getElementById("add-link-form");
const linkList = document.getElementById("link-list");
const loginPanel = document.getElementById("login-panel");
const adminPanel = document.getElementById("admin-panel");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

let links = JSON.parse(localStorage.getItem("links")) || [];

// نمایش لینک‌ها
function displayLinks() {
    content.innerHTML = "";
    linkList.innerHTML = "";

    links.forEach((link, index) => {
        const item = document.createElement("div");
        item.innerHTML = `<a href="${link.url}" target="_blank">${link.url}</a> 
                          <button onclick="deleteLink(${index})">❌</button>`;
        content.appendChild(item);
        
        const listItem = document.createElement("li");
        listItem.textContent = link.url;
        linkList.appendChild(listItem);
    });

    localStorage.setItem("links", JSON.stringify(links));
}

// افزودن لینک جدید
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUrl = document.getElementById("new-url").value;
    const newType = document.getElementById("new-type").value;

    links.push({ url: newUrl, type: newType });
    displayLinks();
    addForm.reset();
});

// حذف لینک
function deleteLink(index) {
    if (confirm("آیا مطمئن هستید؟")) {
        links.splice(index, 1);
        displayLinks();
    }
}

// مدیریت ورود و خروج
const adminPassword = "1234";

loginBtn.addEventListener("click", () => {
    if (passwordInput.value === adminPassword) {
        loginPanel.style.display = "none";
        adminPanel.style.display = "block";
    } else {
        alert("رمز اشتباه است!");
    }
});

logoutBtn.addEventListener("click", () => {
    adminPanel.style.display = "none";
    loginPanel.style.display = "block";
});

// نمایش لینک‌ها هنگام بارگذاری صفحه
displayLinks();
