const content = document.getElementById("content");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

const links = [

    { url: "https://gifcandy.net/wp-content/uploads/2024/06/gifcandy-4.webp", type: "gif" },
    
];

function loadContent(category) {
    content.innerHTML = "";
    links.filter(link => category === "all" || link.type === category).forEach(link => {
        const item = document.createElement("div");
        item.classList.add("content-item");
        if (link.type === "images" || link.type === "gif") {
            item.innerHTML = `<img src="${link.url}" alt="content" width="200">`;
        } else if (link.type === "movies") {
            item.innerHTML = `<video src="${link.url}" controls width="200"></video>`;
        } else {
            item.innerHTML = `<a href="${link.url}" target="_blank">Open Document</a>`;
        }
        content.appendChild(item);
    });
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        loadContent(button.dataset.category);
    });
});

loadContent("all");
