document.addEventListener('DOMContentLoaded', function() {
    // --- Gallery Elements ---
    const gallery = document.getElementById('fanart-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // --- Sound Elements ---
    const gallerySound = document.getElementById('sound-gallery');
    const loadSound = document.getElementById('sound-load');
    
    // --- Lightbox Elements ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close-btn');

    if (!gallery || !loadMoreBtn || !lightbox || !lightboxImg || !closeBtn || typeof fanArtData === 'undefined') return;

    // Reusable play sound function
    function playSound(soundElement) {
        if (soundElement) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Error playing sound:", e));
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
            playSound(gallerySound); // Play gallery sound
            openLightbox(art.image);
        });
        return item;
    }

    function loadMoreArt() {
        playSound(loadSound); // Play load more sound
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