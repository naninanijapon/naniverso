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
        // ✨変更点：画像ソースを先にセットし、CSSクラスで表示を制御する
        lightboxImg.src = imageUrl; // まず画像ソースを設定
        lightbox.classList.add('active'); // activeクラスを追加して表示開始
        
        // アニメーションの主要部分でサウンドが鳴るように調整
        // （アニメーションがCSSで完結しているため、サウンドのタイミングは固定遅延で試す）
        setTimeout(() => {
            if (fanartClickSound) playSound(fanartClickSound);
        }, 200); 
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        // ✨変更点：アニメーション後に画像をクリアするとちらつく場合があるので、
        // lightboxが非表示になった後にsrcをクリアするか、またはクリアしない。今回はクリアしないでおく。
        // lightboxImg.src = ""; // 画像のチラつき防止のため、一旦コメントアウト
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