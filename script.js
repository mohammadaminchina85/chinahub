document.addEventListener('DOMContentLoaded', () => {
    const mediaGrid = document.querySelector('.media-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenContent = document.querySelector('.fullscreen-content');
    const backButton = document.getElementById('back-button'); // **جدید: انتخاب دکمه Back**

    // Sample media data (بدون تغییر)
    const mediaData = [
        { type: 'image', src: 'https://mohammadaminchina85.github.io/pic2007/photo_2025-02-24_21-32-19.jpg', caption: 'Caption N1' },
        { type: 'video', src: 'https://github.com/mohammadaminchina85/pic2007/raw/refs/heads/main/video_2025-02-24_18-33-58.mp4', caption: 'A nice video of Bunny' },
        { type: 'gif', src: 'https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp', caption: 'Animated GIF example' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/FFD700/000000?text=Image+2', caption: 'Another great image' },
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9wNXV5OWwzZW51cnZsdWptb3I1N3cwN2J4NmhkZXQzaGdsMm95OCZlcD1WcFlfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0Pmc/3oEdv9E169S1J24640/giphy.gif', caption: 'Funny animation' },
        { type: 'video', src: 'https://www.pornhub.com/embed/68583d99e0e33', caption: 'Elephants Dream short film' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/FF6347/000000?text=Image+3', caption: 'Sunrise over mountains' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', caption: 'For Bigger Blazes' },
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0NG51czR1ZmQzZmxoZzUwd293bHNreGFwZWV5Nzdtb3g1MmxrMyZlcD1WcFlfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0Pmc/l0HlC88e2c0e8sFkI/giphy.gif', caption: 'Cool GIF art' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/ADFF2F/000000?text=Image+4', caption: 'Sunset view (cap for m4)' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/6495ED/000000?text=Image+5', caption: 'City skyline' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', caption: 'For Bigger Joyrides' },
    ];

    // Function to close fullscreen modal (جدید: یک تابع مجزا برای بستن مودال)
    function closeFullscreenModal() {
        fullscreenModal.classList.remove('active');
        const videoInModal = fullscreenContent.querySelector('video');
        if (videoInModal) {
            videoInModal.pause();
            videoInModal.currentTime = 0; // Reset video to start
        }

        // Resume autoplay for visible grid videos after closing modal
        setTimeout(() => {
            document.querySelectorAll('.media-item video').forEach(video => {
                if (video.closest('.media-item') && !video.closest('.media-item').classList.contains('hidden')) {
                    video.play().catch(e => console.log("Video autoplay failed on resume:", e));
                }
            });
        }, 100);
    }

    // ... تابع renderMedia (بدون تغییر) ...
    function renderMedia(filterType = 'all') {
        mediaGrid.innerHTML = '';
        mediaData.forEach(item => {
            const mediaItem = document.createElement('div');
            mediaItem.classList.add('media-item', item.type);
            mediaItem.dataset.src = item.src;
            mediaItem.dataset.type = item.type;

            let mediaElement;
            if (item.type === 'image' || item.type === 'gif') {
                mediaElement = document.createElement('img');
                mediaElement.src = item.src;
                mediaElement.alt = item.caption;
            } else if (item.type === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.src = item.src;
                mediaElement.controls = false;
                mediaElement.muted = true;
                mediaElement.loop = true;
                mediaElement.autoplay = true;
                mediaElement.preload = 'metadata';
                mediaElement.setAttribute('playsinline', '');
            }

            const caption = document.createElement('p');
            caption.classList.add('caption');
            caption.textContent = item.caption;

            mediaItem.appendChild(mediaElement);
            mediaItem.appendChild(caption);

            if (filterType === 'all' || item.type === filterType) {
                mediaGrid.appendChild(mediaItem);
            }
        });
    }

    // Initial render: show all media by default
    renderMedia('all');

    // Add event listeners to filter buttons (بدون تغییر)
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            document.querySelectorAll('.media-item video').forEach(video => {
                video.pause();
                video.currentTime = 0;
            });

            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const filterType = event.target.dataset.filter;
            renderMedia(filterType);

            setTimeout(() => {
                document.querySelectorAll('.media-item video').forEach(video => {
                    if (!video.closest('.media-item').classList.contains('hidden')) {
                         video.play().catch(e => console.log("Video autoplay failed:", e));
                    }
                });
            }, 100);
        });
    });

    // Handle clicking on media items to go fullscreen (بدون تغییر)
    mediaGrid.addEventListener('click', (event) => {
        const mediaItem = event.target.closest('.media-item');
        if (mediaItem) {
            const src = mediaItem.dataset.src;
            const type = mediaItem.dataset.type;

            document.querySelectorAll('.media-item video').forEach(video => video.pause());

            fullscreenContent.innerHTML = '';

            let fullscreenElement;
            if (type === 'image' || type === 'gif') {
                fullscreenElement = document.createElement('img');
                fullscreenElement.src = src;
                fullscreenElement.alt = 'Fullscreen Media';
            } else if (type === 'video') {
                fullscreenElement = document.createElement('video');
                fullscreenElement.src = src;
                fullscreenElement.controls = true;
                fullscreenElement.autoplay = true;
                fullscreenElement.loop = true;
                fullscreenElement.setAttribute('playsinline', '');
            }

            fullscreenContent.appendChild(fullscreenElement);
            fullscreenModal.classList.add('active');

            const captionText = mediaItem.querySelector('.caption').textContent;
            if (captionText) {
                const fullscreenCaption = document.createElement('p');
                fullscreenCaption.textContent = captionText;
                fullscreenContent.appendChild(fullscreenCaption);
            }
        }
    });

    // Close fullscreen modal when clicking outside the content (اصلاح شده)
    fullscreenModal.addEventListener('click', (event) => {
        // حالا فقط اگر روی پس زمینه مودال کلیک شد، بسته شود.
        // دکمه Back به طور مجزا کار می کند.
        if (event.target === fullscreenModal) {
            closeFullscreenModal();
        }
    });

    // **جدید: Event listener برای دکمه Back**
    backButton.addEventListener('click', closeFullscreenModal);
});
