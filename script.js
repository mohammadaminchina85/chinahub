const links = [


	"https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp",
	"https://gifcandy.net/wp-content/uploads/2021/04/gifcandy-23.gif",
	"https://gifcandy.net/wp-content/uploads/2016/04/gifcandy-squirt-66.gif",
	"https://www.xvideos.com/video.ueecdav7233/my_little_stepsister_tricked_me_into_fucking_her_during_twister_-_exxxtra_small"

];

const gallery = document.getElementById("gallery");

links.forEach(link => {
    let newElement = document.createElement("div");

    if (link.endsWith(".mp4")) {
        newElement.innerHTML = `<video src="${link}" controls></video>`;
    } else {
        newElement.innerHTML = `<img src="${link}" alt="Uploaded">`;
    }

    // اضافه کردن قابلیت کلیک روی محتوا برای باز شدن در صفحه جدید
    newElement.addEventListener("click", function() {
        window.open(link, "_blank");
    });

    newElement.style.cursor = "pointer"; // نشانگر ماوس تغییر کند
    gallery.appendChild(newElement);
});
