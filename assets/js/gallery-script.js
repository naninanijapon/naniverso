document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('fanart-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close-btn');
    const fanartClickSound = document.getElementById('sound-fanart-click');
    const loadSound = document.getElementById('sound-load');

    if (!gallery || !loadMoreBtn || !lightbox || !lightboxImg || !closeBtn || typeof fanArtData === 'undefined') {
        console.error('Essential elements for the gallery are missing!');
        return;
    }

    function playSound(soundElement) {
        if (soundElement && typeof soundElement.play === 'function') {
            soundElement.volume = 0.5;
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    fanArtData.reverse();
    const itemsPerPage = 9;
    let itemsLoaded = 0;

    function openLightbox(imageUrl) {
        // アニメーションが開始する前に画像をセット
        lightboxImg.src = imageUrl; 
        lightbox.classList.add('active');
        
        // ✨サウンド再生のタイミングを少し遅らせる（アニメーションと合わせる）✨
        // アニメーションの開始がCSSで制御されているため、
        // ここでの遅延はアニメーションの主要な部分と同期させる意図
        setTimeout(() => {
            if (fanartClickSound) playSound(fanartClickSound);
        }, 200); // 0.2秒後くらいに再生 (digitalOpenEffectのアニメーション時間に合わせて調整)
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        // アニメーションがリセットされるように、一時的に画像をクリアすることも検討できます
        // lightboxImg.src = ""; 
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
            openLightbox(art.image); 
        });
        return item;
    }

    function loadMoreArt() {
        if (loadSound) playSound(loadSound); 
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