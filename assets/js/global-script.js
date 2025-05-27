document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    
    // sound-ui要素が見つかるかどうかの確認ログ
    if (!uiSound) {
        console.error("Audio element with ID 'sound-ui' NOT FOUND!");
        return; // uiSound がなければ処理を続行しない
    } else {
        console.log("Audio element 'sound-ui' found.");
    }

    // 再利用可能なサウンド再生関数
    function playSound(soundElement, elementName) {
        if (soundElement && soundElement.play) { // playメソッドがあるかも確認
            soundElement.volume = 0.5; // テストのために音量を少し下げる
            soundElement.currentTime = 0; // 音を最初から再生する
            soundElement.play().then(() => {
                console.log(elementName + " sound played successfully!");
            }).catch(e => {
                console.error("Error playing " + elementName + " sound:", e);
            });
        } else {
            console.error(elementName + " sound element is invalid or missing play method.");
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('nav.nav-matrix a.neon-link');
    console.log("Found " + navLinks.length + " navigation links."); // 見つかったリンクの数

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = link.getAttribute('href');
            console.log("Navigation link clicked. Href: " + href + ", Classes: " + link.className);

            // pendingクラスのリンクは何もしない（ページ遷移も止める）
            if (link.classList.contains('pending')) {
                event.preventDefault();
                console.log("Pending link clicked, sound and navigation prevented.");
                playSound(uiSound, "Navigation (pending)"); // pendingでも音を鳴らしてみる（テスト）
            } else {
                // pendingでない通常のリンク
                playSound(uiSound, "Navigation (active/normal)");
                // ページ遷移を妨げないように、ここでは event.preventDefault() は呼ばない
                // ただし、音が鳴り終わる前に遷移してしまう可能性はある
            }
        });
    });

    // --- Social Icon Links ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    console.log("Found " + socialIconLinks.length + " social icon links."); // 見つかったリンクの数

    socialIconLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = link.getAttribute('href');
            console.log("Social icon link clicked. Href: " + href);
            playSound(uiSound, "Social Icon");
        });
    });
});