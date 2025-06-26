document.addEventListener('DOMContentLoaded', () => {
    const mediaGrid = document.querySelector('.media-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenContent = document.querySelector('.fullscreen-content');

    // Sample media data
    const mediaData = [
        { type: 'image', src: 'https://mohammadaminchina85.github.io/pic2007/photo_2025-02-24_21-32-19.jpg', caption: 'Caption N1' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', caption: 'A nice video of Bunny' },
        { type: 'gif', src: 'https://gifcandy.net/wp-content/uploads/2025/01/gifcandy-5.webp', caption: 'فوران' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/FFD700/000000?text=Image+2', caption: 'Another great image' },
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9wNXV5OWwzZW51cnZsdWptb3I1N3cwN2J4NmhkZXQzaGdsMm95OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv9E169S1J24640/giphy.gif', caption: 'Funny animation' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', caption: 'Elephants Dream short film' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/FF6347/000000?text=Image+3', caption: 'Sunrise over mountains' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', caption: 'For Bigger Blazes' },
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0NG51czR1ZmQzZmxoZzUwd293bHNreGFwZWV5Nzdtb3g1MmxrMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlC88e2c0e8sFkI/giphy.gif', caption: 'Cool GIF art' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/ADFF2F/000000?text=Image+4', caption: 'Sunset view (cap for m4)' },
        { type: 'image', src: 'https://via.placeholder.com/400x300/6495ED/000000?text=Image+5', caption: 'City skyline' },
        { type: 'video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', caption: 'For Bigger Joyrides' },
    ];

    // Function to render media items
    function renderMedia(filterType = 'all') {
        mediaGrid.innerHTML = ''; // Clear existing media
        mediaData.forEach(item => {
            const mediaItem = document.createElement('div');
            mediaItem.classList.add('media-item', item.type);
            mediaItem.dataset.src = item.src; // Store full source for fullscreen
            mediaItem.dataset.type = item.type; // Store type for fullscreen

            let mediaElement;
            if (item.type === 'image' || item.type === 'gif') {
                mediaElement = document.createElement('img');
                mediaElement.src = item.src;
                mediaElement.alt = item.caption;
            } else if (item.type === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.src = item.src;
                mediaElement.controls = false; // No controls on thumbnail
                mediaElement.muted = true; // Mute for autoplay preview
                mediaElement.loop = true; // Loop for preview
                mediaElement.autoplay = true; // Autoplay for preview
                mediaElement.preload = 'metadata'; // Load enough to get dimensions/duration
                // اضافه کردن خاصیت playsinline برای iOS
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

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Pause all videos in grid before filtering
            document.querySelectorAll('.media-item video').forEach(video => {
                video.pause();
                video.currentTime = 0; // Reset video to start
            });

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            event.target.classList.add('active');

            const filterType = event.target.dataset.filter;
            renderMedia(filterType);

            // Re-autoplay visible videos after filtering
            // (might need a slight delay or observation for large numbers)
            setTimeout(() => {
                document.querySelectorAll('.media-item video').forEach(video => {
                    // Check if the video is currently visible in the DOM
                    if (!video.closest('.media-item').classList.contains('hidden')) {
                         video.play().catch(e => console.log("Video autoplay failed:", e));
                    }
                });
            }, 100); // Small delay to ensure elements are rendered
        });
    });

    // Handle clicking on media items to go fullscreen
    mediaGrid.addEventListener('click', (event) => {
        const mediaItem = event.target.closest('.media-item');
        if (mediaItem) {
            const src = mediaItem.dataset.src;
            const type = mediaItem.dataset.type;

            // Pause all grid videos before opening fullscreen
            document.querySelectorAll('.media-item video').forEach(video => video.pause());


            fullscreenContent.innerHTML = ''; // Clear previous content

            let fullscreenElement;
            if (type === 'image' || type === 'gif') {
                fullscreenElement = document.createElement('img');
                fullscreenElement.src = src;
                fullscreenElement.alt = 'Fullscreen Media';
            } else if (type === 'video') {
                fullscreenElement = document.createElement('video');
                fullscreenElement.src = src;
                fullscreenElement.controls = true; // Show controls in fullscreen
                fullscreenElement.autoplay = true; // Autoplay in fullscreen
                fullscreenElement.loop = true; // Loop in fullscreen (optional for fullscreen)
                fullscreenElement.setAttribute('playsinline', ''); // برای iOS
            }

            fullscreenContent.appendChild(fullscreenElement);
            fullscreenModal.classList.add('active');

            // Optionally, add a caption to the fullscreen modal
            const captionText = mediaItem.querySelector('.caption').textContent;
            if (captionText) {
                const fullscreenCaption = document.createElement('p');
                fullscreenCaption.textContent = captionText;
                // استایل کپشن در CSS مدیریت می شود
                // fullscreenCaption.style.color = 'white';
                // fullscreenCaption.style.marginTop = '10px';
                fullscreenContent.appendChild(fullscreenCaption);
            }
        }
    });

    // Close fullscreen modal when clicking outside the content
    fullscreenModal.addEventListener('click', (event) => {
        // Check if the click was directly on the modal background, not the content
        if (event.target === fullscreenModal || event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') { // اضافه کردن تگ های IMG و VIDEO برای بستن با کلیک روی خود محتوا
            fullscreenModal.classList.remove('active');
            // Pause video if playing when closing modal
            const videoInModal = fullscreenContent.querySelector('video');
            if (videoInModal) {
                videoInModal.pause();
                videoInModal.currentTime = 0; // Reset video to start
            }

            // Resume autoplay for visible grid videos after closing modal
            setTimeout(() => {
                document.querySelectorAll('.media-item video').forEach(video => {
                    // Check if the video's parent media-item is visible (not hidden by filter)
                    if (video.closest('.media-item') && !video.closest('.media-item').classList.contains('hidden')) {
                        video.play().catch(e => console.log("Video autoplay failed on resume:", e));
                    }
                });
            }, 100);
        }
    });
});