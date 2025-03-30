document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const loginPanel = document.getElementById('login-panel');
    const adminPanel = document.getElementById('admin-panel');
    const adminBtn = document.getElementById('admin-btn');
    const searchInput = document.getElementById('searchInput');
    const toast = document.getElementById('toast');

    // لیست لینک‌ها
    let links = JSON.parse(localStorage.getItem('links')) || [
        { url: 'https://mohammadaminchina85.github.io/pic2007/photo_2025-02-24_21-32-19.jpg', type: 'images', title: 'تصویر نمونه 1' },
        { url: 'https://www.pornhub.com/embed/67cf3e5266465', type: 'movies', title: 'فیلم نمونه' },
        { url: 'https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp', type: 'gif', title: 'GIF نمونه' }
    ];

    // نمایش نوتیفیکیشن
    function showToast(message, duration = 3000) {
        toast.textContent = message;
        toast.style.opacity = 1;
        setTimeout(() => {
            toast.style.opacity = 0;
        }, duration);
    }

    // نمایش لینک‌ها
    function displayLinks(filter = 'all', searchQuery = '') {
        content.innerHTML = '';
        
        const filteredLinks = links.filter(link => {
            const matchesFilter = filter === 'all' || link.type === filter;
            const matchesSearch = link.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 link.url.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        if (filteredLinks.length === 0) {
            content.innerHTML = '<p class="no-results">موردی یافت نشد</p>';
            return;
        }

        filteredLinks.forEach(link => {
            const item = document.createElement('div');
            item.className = 'item';
            
            if (link.type === 'images' || link.type === 'gif') {
                item.innerHTML = `
                    <img src="${link.url}" alt="${link.title || 'تصویر'}" loading="lazy">
                    ${link.title ? `<div class="item-title">${link.title}</div>` : ''}
                `;
            } else if (link.type === 'movies') {
                item.innerHTML = `
                    <div class="video-container">
                        <iframe src="${getEmbedUrl(link.url)}" 
                                frameborder="0" 
                                allowfullscreen
                                loading="lazy"></iframe>
                    </div>
                    ${link.title ? `<div class="item-title">${link.title}</div>` : ''}
                `;
            }

            content.appendChild(item);
        });
    }

    // تبدیل لینک به embed
    function getEmbedUrl(url) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        return url;
    }

    // رویدادهای فیلتر
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayLinks(button.dataset.category, searchInput.value);
        });
    });

    // جستجو
    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        displayLinks(activeFilter?.dataset.category || 'all', searchInput.value);
    });

    // تغییر تم
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // بارگذاری تم ذخیره شده
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // مدیریت پنل ادمین
    function showLogin() {
        loginPanel.style.display = 'block';
        adminPanel.style.display = 'none';
    }

    function checkPassword() {
        const password = document.getElementById('passwordInput').value;
        if (password === '1234') {
            loginPanel.style.display = 'none';
            adminPanel.style.display = 'block';
            showToast('ورود موفقیت‌آمیز بود');
        } else {
            showToast('رمز عبور اشتباه است');
        }
    }

    function addNewLink() {
        const url = document.getElementById('urlInput').value.trim();
        const type = document.getElementById('typeSelect').value;
        
        if (url) {
            const title = prompt('عنوان محتوا را وارد کنید (اختیاری):');
            links.push({ url, type, title });
            localStorage.setItem('links', JSON.stringify(links));
            displayLinks(type);
            document.getElementById('urlInput').value = '';
            showToast('محتوا با موفقیت اضافه شد');
        } else {
            showToast('لطفا URL را وارد کنید');
        }
    }

    function clearStorage() {
        if (confirm('آیا مطمئن هستید که می‌خواهید همه محتواها را حذف کنید؟')) {
            localStorage.removeItem('links');
            links = [];
            displayLinks('all');
            showToast('همه محتواها حذف شدند');
        }
    }

    // فعال کردن swipe برای موبایل
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            const activeBtn = document.querySelector('.filter-btn.active');
            const nextBtn = activeBtn.nextElementSibling || filterButtons[0];
            if (nextBtn) {
                nextBtn.click();
            }
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            const activeBtn = document.querySelector('.filter-btn.active');
            const prevBtn = activeBtn.previousElementSibling || filterButtons[filterButtons.length - 1];
            if (prevBtn) {
                prevBtn.click();
            }
        }
    }

    // نمایش اولیه
    filterButtons[0].click();
});
