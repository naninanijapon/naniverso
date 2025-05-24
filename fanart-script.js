document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('fanart-gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!gallery || !loadMoreBtn) return;

    const itemsPerPage = 6; // 1回に読み込む数
    let itemsLoaded = 0;

    function createFanArtCard(art) {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = art.image;
        img.alt = `Fan art por ${art.artist}`;
        img.loading = 'lazy'; // 画像の遅延読み込み

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `<p>Arte por:</p><p class="artist-name">${art.artist}</p>`;
        
        item.appendChild(img);
        item.appendChild(overlay);
        return item;
    }

    function loadMoreArt() {
        const fragment = document.createDocumentFragment();
        const nextItems = fanArtData.slice(itemsLoaded, itemsLoaded + itemsPerPage);

        nextItems.forEach(art => {
            fragment.appendChild(createFanArtCard(art));
        });

        gallery.appendChild(fragment);
        itemsLoaded += nextItems.length;

        // すべて読み込んだらボタンを隠す
        if (itemsLoaded >= fanArtData.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // 最初に表示
    loadMoreArt();

    // ボタンのクリックイベント
    loadMoreBtn.addEventListener('click', loadMoreArt);
});