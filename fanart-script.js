document.addEventListener('DOMContentLoaded', function() {
    // --- Gallery Elements ---
    const gallery = document.getElementById('fanart-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // --- Lightbox Elements ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close-btn');

    // --- Initial Check ---
    if (!gallery || !loadMoreBtn || !lightbox || !lightboxImg || !closeBtn || typeof fanArtData === 'undefined') {
        console.error('Essential elements for the gallery are missing!');
        return;
    }

    // Reverse the array to show newest first
    fanArtData.reverse();

    const itemsPerPage = 9; // 1回に読み込む数を調整
    let itemsLoaded = 0;

    // --- Lightbox Functions ---
    function openLightbox(imageUrl) {
        lightboxImg.src = imageUrl;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // --- Gallery Card Creation ---
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
        
        item.appendChild(img);
        item.appendChild(overlay);

        // Add click event to open lightbox
        item.addEventListener('click', () => openLightbox(art.image));
        
        return item;
    }

    // --- Load More Logic ---
    function loadMoreArt() {
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

    // --- Initial Load & Event Listeners ---
    loadMoreArt();
    loadMoreBtn.addEventListener('click', loadMoreArt);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking on the dark background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});