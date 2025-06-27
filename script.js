document.addEventListener('DOMContentLoaded', () => {
    const mediaGrid = document.querySelector('.media-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenContent = document.querySelector('.fullscreen-content');
    const backButton = document.getElementById('back-button');
    const searchInput = document.getElementById('search-input');
    const downloadButton = document.getElementById('download-button');

    // Sample media data - NOW ALL VIDEOS ARE IFRAMES
    // IMPORTANT: Replace 'src' with actual embed URLs for your videos
    const mediaData = [
        { type: 'image', src: 'https://via.placeholder.com/600x400/FFA500/000000?text=Image+1', caption: 'A beautiful golden sunrise over tranquil mountains, casting a warm glow across the landscape.' },
        // Changed video to iframe
        { type: 'video', src: 'https://www.pornhub.com/embed/68583d99e0e33', caption: 'Big Buck Bunny embedded from Archive.org.' }, 
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eDF4N3BvcWlsZm50bDBtMW9mNWc1anZ0a2k3bXJ1c3g2d21jOCZlcD1WcFlfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0Pmc/2t9yU7wBwT3n9tO2pX/giphy.gif', caption: 'A captivating animated GIF showing abstract colors and mesmerizing patterns in motion.' },
        { type: 'image', src: 'https://via.placeholder.com/800x600/FFD700/000000?text=Image+2', caption: 'The vibrant cityscape illuminated at dusk, with towering skyscrapers and bustling streets below.' },
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9wNXV5OWwzZW51cnZsdWptb3I1N3cwN2J4NmhkZXQzaGdsMm95OCZlcD1WcFlfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0Pmc/3oEdv9E169S1J24640/giphy.gif', caption: 'A humorous animation featuring a character expressing surprise and confusion, perfect for reactions.' },
        // Changed video to iframe
        { type: 'video', src: 'https://archive.org/embed/ElephantsDream', caption: 'Elephants Dream embedded from Archive.org.' }, 
        { type: 'image', src: 'https://via.placeholder.com/700x500/FF6347/000000?text=Image+3', caption: 'Lush autumn foliage displays a rich palette of reds, oranges, and yellows in a serene forest.' },
        // Changed video to iframe
        { type: 'video', src: 'https://archive.org/embed/ForBigBuckBunny', caption: 'For Bigger Blazes from Archive.org embedded.' }, 
        { type: 'gif', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0NG51czR1ZmQzZmxoZzUwd293bHNreGFwZWV5Nzdtb3g1MmxrMyZlcD1WcFlfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0Pmc/l0HlC88e2c0e8sFkI/giphy.gif', caption: 'An artistic GIF of flowing abstract patterns, perfect for background visuals or mood setting.' },
        { type: 'image', src: 'https://via.placeholder.com/900x600/ADFF2F/000000?text=Image+4', caption: 'A peaceful, sprawling landscape at dawn, with mist rising from the fields and distant hills.' },
        { type: 'image', src: 'https://via.placeholder.com/500x700/6495ED/000000?text=Image+5', caption: 'A striking architectural marvel from ancient times, showcasing intricate designs and historical grandeur.' },
        // Changed video to iframe
        { type: 'video', src: 'https://archive.org/embed/ForBiggerJoyrides', caption: 'For Bigger Joyrides from Archive.org embedded.' }, 
    ];

    let currentFilter = 'all';

    // --- Helper function to render media ---
    function renderMedia(filterType = 'all', searchTerm = '') {
        mediaGrid.innerHTML = ''; 

        // Pause all videos/iframes in grid before re-rendering
        // Note: Direct pausing of iframes is not reliable due to cross-origin policies.
        // This loop mainly targets `<video>` elements if they were still used,
        // or helps clean up any lingering states iframes were trying to autoplay.
        document.querySelectorAll('.media-item video, .media-item iframe').forEach(mediaEl => {
            if (mediaEl.tagName === 'VIDEO') { // Only pause if it's a direct video tag
                mediaEl.pause();
                mediaEl.currentTime = 0; 
            }
            // For iframes, we can't reliably stop playback from outside the iframe.
            // Re-creating the iframe is the only way to "stop" it visually.
        });
        
        const filteredMedia = mediaData.filter(item => {
            const matchesFilter = (filterType === 'all' || item.type === filterType);
            const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        if (filteredMedia.length === 0) {
            mediaGrid.innerHTML = '<p style="color: gray; text-align: center; width: 100%; margin-top: 50px;">No media found for your search.</p>';
            return;
        }

        filteredMedia.forEach(item => {
            const mediaItem = document.createElement('div');
            mediaItem.classList.add('media-item', item.type);
            mediaItem.dataset.fullSrc = item.src;
            mediaItem.dataset.type = item.type;
            mediaItem.dataset.caption = item.caption;

            let mediaElement;
            if (item.type === 'image' || item.type === 'gif') {
                mediaElement = document.createElement('img');
                mediaElement.src = item.src; 
                mediaElement.alt = item.caption; 
            } else if (item.type === 'video') { // Now, for type 'video', we create an iframe
                mediaElement = document.createElement('iframe');
                // For iframe thumbnails, you might want to adjust the embed URL
                // or use a static image thumbnail if the embed doesn't look good small.
                // Adding autoplay=1&mute=1 to embed URL might help for preview if supported
                mediaElement.src = `${item.src}?autoplay=0&mute=1`; // Example: adjust for thumbnail if needed
                mediaElement.frameBorder = "0";
                mediaElement.allowFullscreen = true; 
                mediaElement.setAttribute('scrolling', 'no'); // No scrollbar in thumbnail
            } else if (item.type === 'iframe') { // This handles other explicit 'iframe' types if you add them later
                mediaElement = document.createElement('iframe');
                mediaElement.src = item.src;
                mediaElement.frameBorder = "0";
                mediaElement.allowFullscreen = true; 
                mediaElement.setAttribute('scrolling', 'no');
            }

            const caption = document.createElement('p');
            caption.classList.add('caption');
            caption.textContent = item.caption;

            mediaItem.appendChild(mediaElement);
            mediaItem.appendChild(caption);

            mediaGrid.appendChild(mediaItem);

            // For iframes in grid, we can't reliably autoplay/pause like <video> tags.
            // Autoplay behavior is controlled by the embed provider and browser policy.
        });
    }

    // Function to close fullscreen modal
    function closeFullscreenModal() {
        fullscreenModal.classList.remove('active');
        // Stop any video/iframe playback in the modal
        const currentMediaEl = fullscreenContent.querySelector('video, iframe');
        if (currentMediaEl) {
            if (currentMediaEl.tagName === 'VIDEO') {
                currentMediaEl.pause();
                currentMediaEl.currentTime = 0; 
            } else if (currentMediaEl.tagName === 'IFRAME') {
                // To stop an iframe video, the most reliable way is to reload it or set its src to empty
                // Setting src to empty:
                currentMediaEl.src = ''; 
                // Or remove and re-add:
                // currentMediaEl.remove(); 
            }
        }

        // Resume autoplay for visible grid videos (now iframes) after closing modal
        setTimeout(() => {
            document.querySelectorAll('.media-item').forEach(itemDiv => {
                const mediaEl = itemDiv.querySelector('video, iframe');
                if (mediaEl && mediaEl.tagName === 'IFRAME') {
                    // For iframes, we simply re-set the src to force reload/restart if it was stopped.
                    // This is a workaround for lack of direct control.
                    mediaEl.src = mediaEl.src; // Forces reload if src was emptied
                }
            });
        }, 100);
    }

    // --- Event Listeners ---

    // Initial render: show all media by default
    renderMedia(currentFilter);

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            currentFilter = event.target.dataset.filter;
            renderMedia(currentFilter, searchInput.value);
        });
    });

    // Handle clicking on media items to go fullscreen
    mediaGrid.addEventListener('click', (event) => {
        const mediaItem = event.target.closest('.media-item');
        if (mediaItem) {
            const src = mediaItem.dataset.fullSrc;
            const type = mediaItem.dataset.type;
            const captionText = mediaItem.dataset.caption;

            // Pause all grid videos/iframes before opening fullscreen
            document.querySelectorAll('.media-item video, .media-item iframe').forEach(mediaEl => {
                if (mediaEl.tagName === 'VIDEO') { mediaEl.pause(); }
                if (mediaEl.tagName === 'IFRAME') { mediaEl.src = ''; } // Clear src for iframes
            });

            fullscreenContent.innerHTML = ''; // Clear previous content

            let fullscreenElement;
            if (type === 'image' || type === 'gif') {
                fullscreenElement = document.createElement('img');
                fullscreenElement.src = src;
                fullscreenElement.alt = captionText;
            } else if (type === 'video') { // For type 'video', create an iframe in fullscreen
                fullscreenElement = document.createElement('iframe');
                // Add autoplay=1 to the embed URL for fullscreen, if supported by the provider
                fullscreenElement.src = `${src}?autoplay=1`; 
                fullscreenElement.frameBorder = "0";
                fullscreenElement.allowFullscreen = true;
                fullscreenElement.setAttribute('scrolling', 'yes'); // Allow scrolling in fullscreen iframe
            } else if (type === 'iframe') { // If you had other specific iframe types
                fullscreenElement = document.createElement('iframe');
                fullscreenElement.src = src;
                fullscreenElement.frameBorder = "0";
                fullscreenElement.allowFullscreen = true;
                fullscreenElement.setAttribute('scrolling', 'yes');
            }

            fullscreenContent.appendChild(fullscreenElement);
            fullscreenModal.classList.add('active');

            if (captionText) {
                const fullscreenCaption = document.createElement('p');
                fullscreenCaption.textContent = captionText;
                fullscreenContent.appendChild(fullscreenCaption);
            }

            // Set download button properties or hide it if it's an iframe
            // Iframes usually cannot be downloaded directly
            if (type === 'image' || type === 'gif') { // Only allow download for images and GIFs
                downloadButton.style.display = 'block';
                downloadButton.dataset.src = src;
                downloadButton.dataset.type = type;
            } else {
                downloadButton.style.display = 'none'; // Hide button for videos (now iframes) and general iframes
            }
        }
    });

    // Close fullscreen modal when clicking outside the content
    fullscreenModal.addEventListener('click', (event) => {
        if (event.target === fullscreenModal) {
            closeFullscreenModal();
        }
    });

    // Event listener for the Back button
    backButton.addEventListener('click', closeFullscreenModal);

    // Event listener for Search Input
    let searchTimeout;
    searchInput.addEventListener('input', (event) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderMedia(currentFilter, event.target.value);
        }, 300);
    });

    // Download functionality
    downloadButton.addEventListener('click', () => {
        const src = downloadButton.dataset.src;
        const type = downloadButton.dataset.type;

        if (!src) {
            alert('No media to download.');
            return;
        }

        const a = document.createElement('a');
        a.href = src;
        
        let filename = 'chinaHub_media';
        if (type === 'image') filename += '.jpg';
        else if (type === 'gif') filename += '.gif';
        // Note: Videos (now iframes) are not downloadable directly with this function
        // If you need to download original video files, you'd need direct links for them.
        else { 
            const urlParts = src.split('/');
            filename = urlParts[urlParts.length - 1].split('?')[0]; 
            if (!filename.includes('.')) { 
                filename = 'chinaHub_media.file'; 
            }
        }
        
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
