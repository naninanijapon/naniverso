document.addEventListener('DOMContentLoaded', function() {
    // --- Gallery Elements ---
    const gallery = document.getElementById('fanart-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // --- Sound Elements ---
    const fanartClickSound = document.getElementById('sound-gallery'); // ✨IDを変更✨
    const loadSound = document.getElementById('sound-load');
    
    // --- Lightbox Elements ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close-btn');

    if (!gallery || !loadMoreBtn || !lightbox || !lightboxImg || !closeBtn || typeof fanArtData === 'undefined') {
        console.error('Essential elements for the gallery are missing!');
        return;
    }

    // Reusable play sound function
    function playSound(soundElement) {
        if (soundElement && typeof soundElement.play === 'function') {
            soundElement.volume = 0.5; // 音量は必要に応じて調整
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Error playing sound:", e));
        } else {
            console.error("Sound element is invalid or missing play method for:", soundElement);
        }
    }

    fanArtData.reverse();
    const itemsPerPage = 9;
    let itemsLoaded = 0;

    function openLightbox(imageUrl) {
        lightboxImg.src = imageUrl;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function createFanArtCard(art) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = art.image;
        img.alt = `Fan art por ${art.artist}`;
        img.loading = 'lazy';
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `<p>Arte por:</p><p class="artist-name">${art.artist}</p>`;
        const artistNameMobile = document.createElement('p');
        artistNameMobile.className = 'artist-name-mobile glow-green';
        artistNameMobile.textContent = art.artist;
        item.appendChild(img);
        item.appendChild(overlay);
        item.appendChild(artistNameMobile);
        item.addEventListener('click', () => {
            playSound(fanartClickSound); // ✨新しいサウンド変数を参照✨
            openLightbox(art.image);
        });
        return item;
    }

    function loadMoreArt() {
        playSound(loadSound); 
        const fragment = document.createDocumentFragment();
        const nextItems = fanArtData.slice(itemsLoaded, itemsLoaded + itemsPerPage);
        nextItems.forEach(art => {
            fragment.appendChild(createFanArtCard(art));
        });
        gallery.appendChild(fragment);
        itemsLoaded += nextItems.length;
        if (itemsLoaded >= fanArtData.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreArt();
    loadMoreBtn.addEventListener('click', loadMoreArt);
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});